import { useContext } from "react";
import { UserContext, UserContextType } from "../providers/UserProvider";

export const useLoginUser = (): UserContextType => useContext(UserContext);