import { LoginPageContent } from '@apollo/features';
import { Button } from '@apollo/ui/button';

export default function LoginPage() {
  return (
    <section
      className="flex-1 flex items-center justify-center"
      data-testid="login-page"
    >
      <LoginPageContent />
      <Button>test</Button>
    </section>
  );
}
