
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
}

export const AlertMessage: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <Alert status="error"　fontSize="xs" borderRadius="md" py={1} px={5} w="100%">
      <AlertIcon />
      {children}
    </Alert>
  )
});