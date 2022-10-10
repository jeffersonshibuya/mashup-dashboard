// import { Auth } from '@qlik/sdk';
import { createContext, useContext, useState } from 'react';
import { Auth } from '@qlik/sdk';

import { User, UserAuthContextType } from '../types';
import { config } from '../utils/AuthConfig';

type Props = {
  children: React.ReactNode;
  userInfo: User;
};

const userAuthDefaultValues: UserAuthContextType = {
  user: {
    name: '',
    email: '',
  },
  handleSignOut: () => {},
};

export const UserAuthContext = createContext<UserAuthContextType>(
  userAuthDefaultValues
);

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export function UserAuthProvider({ children, userInfo }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _] = useState(userInfo);

  function handleSignOut() {
    const auth = new Auth(config);
    auth.deauthenticate();
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    handleSignOut,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}
