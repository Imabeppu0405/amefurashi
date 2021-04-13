/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "@chakra-ui/image";
import { Box, Center, Container, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import  ClearIcon  from "../../img/ClearIcon.png";
import  RainIcon  from "../../img/RainIcon.png";
import  CloudIcon from "../../img/CloudIcon.png";
import { memo, useEffect, VFC } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useUserData } from "../../hooks/useUserData";
import { useWeatherGet } from "../../hooks/useWeatherGet";
import umiushi from "../../img/umiushi.png";
import { TaskCont } from "../organisms/TaskCont";
import { useDataSet } from "../../hooks/useDataSet";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";

export const Home: VFC = memo(() => {
  const { loginUser } = useLoginUser();
  const { saveData, saveLoad } = useDataSet();
  const { weather } = useWeatherGet();
  const { getUserData, homeLoad } = useUserData();
  useEffect(() => {
    getUserData();
  }, [])
  return(
    <Container mb={5}>
      {homeLoad ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) :  (
        <>
          <Flex pt={5} justify="space-between">
            <Box borderRadius="full" bg="white" w="80px" h="80px">
              <Center h="100%">
              {
                weather === "Rain" || "Snow" ? <Image width="60%" src={RainIcon} /> :
                  weather === "Clear" ? <Image width="60%" src={ClearIcon} /> :
                    <Image width="60%" src={CloudIcon} />

              }
              </Center>
            </Box>
            <Box bg="white" color="brand.100" borderRadius={10} py={3} px={5}>
              <Heading as="h5" fontSize="1.2rem" >あめふらし</Heading>
              <Divider />
              <Stack pt={1} spacing={.5}>
                <Flex justify="space-between">
                  <Text>大きさ：</Text>
                  <Text>{loginUser?.width}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>成長幅：</Text>
                  <Text>{weather === "Rain" || "Snow" ? 5 : 1}</Text>
                </Flex>
              </Stack>
            </Box>
          </Flex>
          <Center minH="500px" >
            <Image src={umiushi} w={`${loginUser?.width}px`}/>
          </Center>
          <Center py={3}>
            <PrimaryButton onClick={saveData} loading={saveLoad}>データ保存</PrimaryButton>
          </Center>
          <TaskCont />
        </>
      )}
    </Container>
  )
});