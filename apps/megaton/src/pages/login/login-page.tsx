import { LoginForm } from '@apollo/features/login';

export default function LoginPage() {
  return (
    <section
      className="flex-1 flex items-center justify-center"
      data-testid="login-page"
    >
      <div className="flex flex-col space-y-5 items-center md:border p-10 md:shadow-xl w-full max-w-sm rounded-lg">
        <h1 className="text-2xl font-bold">Megaton Portal</h1>
        <LoginForm />
      </div>
    </section>
  );
}
