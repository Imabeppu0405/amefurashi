/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Center, Divider, Heading, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useDataSet } from "../../hooks/useDataSet";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useUserData } from "../../hooks/useUserData";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import { DefaultInput } from "../atoms/input/DefaultInput";
import { AmefurashiImg } from "../molecules/AmefurashiImg";

export const Setting: VFC = memo(() => {
  const { getUserSettingData, homeLoad } = useUserData();
  const { saveSettingData, saveLoad } = useDataSet();
  const { loginUser } = useLoginUser();
  const [ name, setName ] = useState("");
  const [ address, setAddress ] = useState("");
  useEffect(() => {
    getUserSettingData();
  }, [])
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  return(
    <>
    { homeLoad ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Center h="90vh">
        <Box h="80%">
          <Box position="relative" w="100%" h="30%">
            <AmefurashiImg />
          </Box>
          <Box　bg="white" p={{ base: 5, md: 10 }} color="brand.400" borderRadius="md" shadow="md">
            <Heading　fontSize="1.5rem" mb={1}>設定と変更</Heading>
            <Divider mb={4}/>
            <Stack spacing="24px">
              <DefaultInput onChange={onChangeName} type="string" placeholder="新しい名前" label={`現在の名前：${loginUser?.name}`} />
              <DefaultInput onChange={onChangeAddress} type="string" placeholder="新しい郵便番号" label={`現在の郵便番号：${loginUser?.address}`} />
              <Center >
                <PrimaryButton onClick={() => saveSettingData(name, address)} loading={saveLoad} disabled={ name === "" && address === ""}>変更を保存</PrimaryButton>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    )}
    </>
  )
});