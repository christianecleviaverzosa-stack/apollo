import { LoginPageContent } from '@apollo/features';

export default function LoginPage() {
  return (
    <section
      className="flex-1 flex items-center justify-center"
      data-testid="login-page"
    >
      <LoginPageContent />
    </section>
  );
}
