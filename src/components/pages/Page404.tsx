import { Box, Center, Divider, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";

export const Page404: VFC = memo(() => {
  return(
    <Center>
      <Box mt={5} >
        <Text fontSize="6xl">404</Text>
        <Divider />
        <Text fontSize="xl">存在しないページです。</Text>
      </Box>
    </Center>
  )
});