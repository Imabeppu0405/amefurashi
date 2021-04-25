/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Container, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { memo, useEffect, VFC } from "react";
import { useUserData } from "../../hooks/useUserData";
import { TaskCont } from "../organisms/TaskCont";
import { AmefurashiCont } from "../organisms/AmefurashiCont";

export const Home: VFC= memo(() => {
  const { getUserData, homeLoad, weather } = useUserData();
  useEffect(() => {
    getUserData();
  }, [])
  return(
    <div>
      {homeLoad ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) :  (
        <Flex wrap="wrap" justify="space-around" >
          <Container w={{ base: "100%", md: "60%" }}>
            <AmefurashiCont weather={weather}/>
          </Container>
          <Container w={{ base: "100%", md: "40%" }} centerContent>
            <TaskCont weather={weather}/>
          </Container>
        </Flex>
      )}
    </div>
  )
});