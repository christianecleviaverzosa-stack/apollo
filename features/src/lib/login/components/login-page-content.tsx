import { LoginForm } from './login-form';

export const LoginPageContent = () => {
  return (
    <div className="flex flex-col space-y-5 items-center md:border p-10 md:shadow-xl w-full max-w-sm">
       <h1 className="text-2xl font-bold">Megaton Portal</h1>
      <LoginForm />
    </div>
  );
};
