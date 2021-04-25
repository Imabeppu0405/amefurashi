import { ReactNode, VFC } from "react";
import { Header } from "../organisms/Header";

type Props = {
  children: ReactNode
};

export const HeaderLayout: VFC<Props> = (props) => {
  const { children } = props
  return (
    <div style={{ overflow: "hidden" }} >
      <Header />
      {children}
    </div>
  );
};