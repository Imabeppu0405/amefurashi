import { useToast } from "@chakra-ui/toast"
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
  description?: string;
}

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback((props: Props) => {
    const { title, status, description } = props;
    toast({
      title,
      status,
      description,
      position: "top",
      duration: 2000,
      isClosable: true,

    })
  }, [toast])
  
  return { showMessage }
}