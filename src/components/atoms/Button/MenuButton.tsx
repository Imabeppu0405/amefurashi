import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { memo, VFC } from "react";

type Props = {
  onOpen: () => void;
}

export const MenuButton: VFC<Props> = memo((props) => {
  const { onOpen } = props;
  return(
    <IconButton aria-label="メニューボタン" pr={0} icon={<HamburgerIcon />} size="md" variant="unstyled" display={{ base: "block", md: "none"}} onClick={onOpen} />
  )
});