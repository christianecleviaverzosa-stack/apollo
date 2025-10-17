import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Label } from '@apollo/ui';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@apollo/constants';

const loginFormSchema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('form data:', data);
    navigate(RoutePath.Dashboard);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-3"
      id="login-form"
    >
      {/** Username */}
      <Label requiredIndicator>Username</Label>
      <Input
        placeholder="Enter your username"
        {...register('username')}
        error={errors.username?.message}
      />
      {/** Password */}
      <Label requiredIndicator>Password</Label>
      <Input
        placeholder="Enter your password"
        {...register('password')}
        error={errors.password?.message}
      />
      {/** Submit Button */}
      <Button className="w-full">Login</Button>
    </form>
  );
};
