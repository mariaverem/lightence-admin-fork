/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { Form as AntForm, FormInstance, FormProps as AntFormProps } from 'antd';
import { ButtonsGroup } from './ButtonsGroup/ButtonsGroup';
import { useTranslation } from 'react-i18next';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { notificationController } from 'controllers/notificationController';

export interface FormProps extends AntFormProps {
  className?: string;
  trigger?: React.ReactNode;
  form?: FormInstance;
  footer?: (loading: boolean, onCancel: () => void) => React.ReactNode;
  onCancel?: () => void;
  onFinish?: (values: any) => Promise<any>;
  onFinishFailed?: <T>(error: ValidateErrorEntity<[]>) => Promise<T>;
  name: string;
}

export const Form: React.FC<FormProps> = ({
  className,
  trigger,
  form,
  footer,
  onCancel,
  onFinish,
  onFinishFailed,
  name,
  children,
  ...props
}) => {
  const [isFieldsChange, setFieldsChange] = useState(false);
  const [formDefault] = AntForm.useForm();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const onFieldsChange = useCallback(() => {
    setFieldsChange(true);
  }, [setFieldsChange]);

  const onCancelDefault = useCallback(() => {
    onCancel && onCancel();

    setFieldsChange(false);
    (form || formDefault).resetFields();
  }, [onCancel, setFieldsChange, form, formDefault]);

  const setFinished = useCallback(() => {
    setFieldsChange(false);
    setLoading(false);
    notificationController.success({ message: t('common.success') });
  }, [setFieldsChange, setLoading, t]);

  const onFinishDefault = useCallback(
    (values) => {
      setLoading(true);

      if (onFinish) {
        onFinish(values).then(() => setFinished());
      }
    },
    [onFinish, setLoading, setFinished],
  );

  const showErrorsDefault = useCallback(
    (error) => {
      setLoading(false);

      notificationController.error({
        message: t('common.error'),
        description: error.errorFields[0].errors,
      });
    },
    [t],
  );

  const onFinishFailedDefault = useCallback(
    (error) => {
      setLoading(true);

      onFinishFailed
        ? onFinishFailed(error).then(() => notificationController.info({ message: t('common.formError') }))
        : showErrorsDefault(error);
    },
    [onFinishFailed, showErrorsDefault, t],
  );

  useEffect(() => {
    trigger && setFieldsChange(true);
  }, [trigger]);

  return (
    <AntForm
      className={className}
      form={form || formDefault}
      name={name}
      layout="vertical"
      onFinish={onFinishDefault}
      onFinishFailed={onFinishFailedDefault}
      onFieldsChange={onFieldsChange}
      {...props}
    >
      {children}
      {isFieldsChange &&
        (footer ? footer(loading, onCancelDefault) : <ButtonsGroup loading={loading} onCancel={onCancelDefault} />)}
    </AntForm>
  );
};
