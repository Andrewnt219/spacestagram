import { Toast } from '@shopify/polaris';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
type Context = {
  show: Dispatch<SetStateAction<string>>;
};
const Context = createContext<Context | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
};
/** Trigger error toast */
const ErrorToastProvider = ({ children }: ProviderProps) => {
  const [message, setMessage] = useState('');
  const isVisible = message.trim().length > 0;

  const handleDismiss = () => setMessage('');

  const value = useMemo(() => ({ show: setMessage }), []);

  return (
    <Context.Provider value={value}>
      {children}
      {isVisible && <Toast content={message} onDismiss={handleDismiss} error />}
    </Context.Provider>
  );
};

const useErrorToast = (): Context => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('Must be use within ErrorToastProvider');
  }

  return context;
};

export { ErrorToastProvider, useErrorToast };
