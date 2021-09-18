import { UserAuthProvier } from '@modules/user-auth';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider i18n={enTranslations}>
        <UserAuthProvier>
          <Component {...pageProps} />
        </UserAuthProvier>
      </AppProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
