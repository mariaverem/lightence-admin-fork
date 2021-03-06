import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormItem } from 'components/common/Form/Form.styles';
import { InputPassword } from 'components/common/inputs/InputPassword/InputPassword';

export const CurrentPasswordItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FormItem
      name="password"
      label={t('profile.nav.securitySettings.currentPassword')}
      rules={[
        {
          required: true,
          message: t('profile.nav.securitySettings.requiredPassword'),
        },
      ]}
    >
      <InputPassword />
    </FormItem>
  );
};
