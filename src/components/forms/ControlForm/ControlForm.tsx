import React, { useState } from 'react';
import { Form as AntdForm, Avatar } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '../../common/Form/Form';
import { FormItem } from 'components/common/Form/Form.styles';
import { AddUserFormModal } from './AddUserFormModal';
import { Input } from '../../common/inputs/Input/Input';
import { Button } from '../../common/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import * as S from './ControlForm.styles';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface UserType {
  name: string;
  age: string;
}

export const ControlForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onFinish = async (values = {}) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(values);
      }, 1000);
    });
  };

  return (
    <AntdForm.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          const { controlForm } = forms;
          const users = controlForm.getFieldValue('users') || [];
          controlForm.setFieldsValue({ users: [...users, values] });
          setVisible(false);
        }
      }}
    >
      <Form
        {...layout}
        name="controlForm"
        onFinish={onFinish}
        footer={(loading) => (
          <FormItem>
            <Button htmlType="submit" type="primary" loading={loading}>
              {t('common.submit')}
            </Button>
            <S.AddUserButton type="default" htmlType="button" onClick={showUserModal}>
              {t('forms.controlFormLabels.addUser')}
            </S.AddUserButton>
          </FormItem>
        )}
      >
        <FormItem
          name="group"
          label={t('forms.controlFormLabels.groupName')}
          rules={[{ required: true, message: t('forms.controlFormLabels.groupNameError') }]}
        >
          <Input />
        </FormItem>
        <S.UserList
          label={t('forms.controlFormLabels.userList')}
          // eslint-disable-next-line
          shouldUpdate={(prevValues: any, curValues: any) => prevValues.users !== curValues.users}
        >
          {({ getFieldValue }) => {
            const users: UserType[] = getFieldValue('users') || [];
            return users.length ? (
              <S.List>
                {users.map((user, index) => (
                  <S.ListItem key={index}>
                    <Avatar icon={<UserOutlined />} />
                    <S.User>
                      {user.name} - {user.age}
                    </S.User>
                  </S.ListItem>
                ))}
              </S.List>
            ) : (
              <S.Text>
                ( <SmileOutlined /> {t('forms.controlFormLabels.noUser')} )
              </S.Text>
            );
          }}
        </S.UserList>
      </Form>
      <AddUserFormModal visible={visible} onCancel={hideUserModal} />
    </AntdForm.Provider>
  );
};
