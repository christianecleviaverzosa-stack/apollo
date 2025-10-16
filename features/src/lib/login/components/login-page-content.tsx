import { LoginForm } from './login-form';

export const LoginPageContent = () => {
  return (
    <div className="flex flex-col space-y-5 items-center md:border p-10 md:shadow-xl w-full max-w-sm">
      <div className="flex items-center flex-col space-y-2">
        {/**  Brand Logo */}
        <div className="h-20 w-20 bg-gray-100" />
        {/** Title */}
        <h1 className="text-2xl font-bold">Megaton Portal</h1>
      </div>
      <LoginForm />
    </div>
  );
};
