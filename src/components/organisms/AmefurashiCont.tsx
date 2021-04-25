/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "@chakra-ui/image";
import { Box, Center, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import styled from "styled-components";
import { useDataSet } from "../../hooks/useDataSet";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import  ClearIcon  from "../../img/ClearIcon.png";
import  RainIcon  from "../../img/RainIcon.png";
import  CloudIcon from "../../img/CloudIcon.png";
import { AmefurashiImg } from "../molecules/AmefurashiImg";

type Props = {
  weather: string | undefined;
}

export const AmefurashiCont: VFC<Props> = (props) => {
  const { weather } = props;
  const { loginUser } = useLoginUser();
  const { saveData, saveLoad } = useDataSet();
  return (
    <>
    <Flex mt={{ base: 5, md: 10}} justify="space-between">
      <Box borderRadius="full" bg="white" w="85px" h="80px">
        <Center h="100%">
        {(() => {
          if (weather === "Rain" || weather === "Snow") {
            return <Image width="60%" src={RainIcon} />
          } else if (weather === "Clear") {
            return <Image width="60%" src={ClearIcon} />
          } else {
            return <Image width="60%" src={CloudIcon} />
          }
        })()}
        </Center>
      </Box>
      <div>
      <Box bg="white" color="brand.100" borderRadius={10} py={3} px={5} mb={2}>
        <Heading as="h5" fontSize="1.2rem" >{loginUser?.name}</Heading>
        <Divider />
        <Stack pt={1} spacing={.5}>
          <Flex justify="space-between">
            <Text>大きさ：</Text>
            <Text>{loginUser?.width}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>成長幅：</Text>
            <Text>{weather === "Rain" || weather === "Snow" ? 10 : 3}%</Text>
          </Flex>
        </Stack>
      </Box>
      <PrimaryButton onClick={saveData} loading={saveLoad}>成長を保存</PrimaryButton>
      </div>
    </Flex>
    <UmiushiCont>
      <AmefurashiImg />
    </UmiushiCont>
    <Center py={3}>
    </Center>
    </>
  )
}

const UmiushiCont = styled.div`
  position: relative;
  height: 500px;
  width: 100%;
`;