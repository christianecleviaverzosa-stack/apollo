import { LoginForm } from '@apollo/features/login';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation('components/login');
  return (
    <section
      className="flex-1 flex items-center justify-center"
      data-testid="login-page"
    >
      <div className="flex flex-col space-y-5 items-center md:border p-10 md:shadow-xl w-full max-w-sm rounded-lg">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <LoginForm />
      </div>
    </section>
  );
}
