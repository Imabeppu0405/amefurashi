import { Button } from "@chakra-ui/button";
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import { memo, VFC } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickSetting: () => void;
  onClickLogout: () => void;
}

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen, onClickHome, onClickSetting, onClickLogout } = props;
  return(
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} color="gray" bg="gray.100">
            <Button w="100%" onClick={onClickHome} >Home</Button>
            <Button w="100%" onClick={onClickSetting} >設定</Button>
            <Button w="100%" onClick={onClickLogout}>ログアウト</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
});