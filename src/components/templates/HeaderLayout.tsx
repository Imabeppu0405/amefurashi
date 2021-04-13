import { ReactNode, VFC } from "react";
import { Header } from "../organisms/Header";

type Props = {
  children: ReactNode
};

export const HeaderLayout: VFC<Props> = (props) => {
  const { children } = props
  return (
    <>
      <Header />
      {children}
    </>
  );
};