import { Button } from "@chakra-ui/button";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, onClick, disabled=false, loading=false} = props;
  return (
    <Button colorScheme="teal" size="md" w="120px" onClick={onClick} isLoading={loading} disabled={disabled || loading} >
      {children}
    </Button>
  );
});