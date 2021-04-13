import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useCallback, VFC } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { MenuDrawer } from "../molecules/MenuDrawer";
import { MenuButton } from "../atoms/Button/MenuButton";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const Header: VFC = () => {
  const { logout } = useAuth();
  const onClickLogout = () => logout();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const histry = useHistory();
  const onClickHome = useCallback(() => histry.push("/home"), [histry]); 
  const onClickSetting = useCallback(() => histry.push("/home/setting"), [histry]); 
  return (
    <>
      <Flex as="nav" bg="brand.100" align="center" justify="space-between" padding={{ base: 2, md: 4}}>
        <Flex as="a" align="center" mr={8} _hover={{ cursor: "pointer"}} onClick={onClickHome}>
          <Heading as="h1" fontSize={{base: "md", md: "lg"}}>
            あめふらし
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
          <Link onClick={onClickLogout}>ログアウト</Link>
        </Flex>
        <MenuButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickSetting={onClickSetting} onClickLogout={onClickLogout} />
    </>
  );
};