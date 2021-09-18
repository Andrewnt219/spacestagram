import { isNullOrUndeinfed } from '@utils/validate-utils';
import { nanoid } from 'nanoid';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserAuth } from '..';

type UserAuthContext = UserAuth | null;
const UserAuthContext = createContext<UserAuthContext | undefined>(undefined);

const USER_ID_KEY = 'user_id';

type ProviderProps = {};
export const UserAuthProvier = ({
  children,
}: PropsWithChildren<ProviderProps>) => {
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem(USER_ID_KEY);

    if (isNullOrUndeinfed(storedUserId)) {
      setUserAuth(initUserAuth());
    } else {
      setUserAuth({ user_id: storedUserId });
    }
  }, []);

  return (
    <UserAuthContext.Provider value={userAuth}>
      {children}
    </UserAuthContext.Provider>
  );
};

const initUserAuth = (): UserAuth | null => {
  try {
    const user_id = nanoid(16);
    localStorage.setItem(USER_ID_KEY, user_id);
    return { user_id };
  } catch (error) {
    console.error('Fail to set user_id');
    return null;
  }
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error('UserAuthProvider not found');
  }

  return context;
};
