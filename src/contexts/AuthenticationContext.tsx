import { createContext, ReactNode, useState } from "react";

export interface AuthenticationContextInterface {
  user?: User;
  setUser: (user: User) => void;
  removeUser: VoidFunction;
}

export const AuthenticationContext =
  createContext<AuthenticationContextInterface>({
    setUser: () => undefined,
    removeUser: () => undefined,
  });

export const AuthenticationProvider = (props: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | undefined>(undefined);

  const setUser = (userData: User) => {
    setUserState(userData);
  };

  const removeUser = () => {
    setUserState(undefined);
  };

  return (
    <AuthenticationContext.Provider value={{ user, setUser, removeUser }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
