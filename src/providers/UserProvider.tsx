import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { User } from "../types/UserType";

export type UserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = (props: {children : ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);
  return(
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </UserContext.Provider>
  )
}