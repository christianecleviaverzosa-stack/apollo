import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Label, PasswordInput } from '@apollo/ui';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@apollo/constants';
import { useTranslation } from 'react-i18next';

const loginFormSchema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const { t } = useTranslation('components/login');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  // const { mutate } = useMutation<LoginResponse, any, LoginPayload>({
  //   mutationFn: login,
  // });

  const onSubmit = (data: LoginFormValues) => {
    console.log('form submitted values:', data);

    return navigate(RoutePath.Dashboard);
    // mutate(data, {
    //   onSuccess: () => {
    //     navigate(RoutePath.Dashboard);
    //   },
    // });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-3"
      id="login-form"
    >
      {/** Username */}
      <Label requiredIndicator>{t('login_form.fields.username.label')}</Label>
      <Input
        placeholder={t('login_form.fields.username.placeholder')}
        {...register('username')}
        error={errors.username?.message}
      />
      {/** Password */}
      <Label requiredIndicator>{t('login_form.fields.password.label')}</Label>
      <PasswordInput
        placeholder={t('login_form.fields.password.placeholder')}
        {...register('password')}
        error={errors.password?.message}
      />
      {/** Submit Button */}
      <Button type="submit" className="w-full">
        {t('login_button')}
      </Button>
    </form>
  );
};
