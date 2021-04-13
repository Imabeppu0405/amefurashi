import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Heading, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AlertMessage } from "../atoms/AlertMessage";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import { EmailInput } from "../atoms/input/EmailInput";
import { PassInput } from "../atoms/input/PassInput";

export const Register: VFC = memo(() => {
  const { signUp, loading, errorMessage } = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ address, setAddress ] = useState("")
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) =>  setAddress(e.target.value);
  const onClickSignUp = () => signUp(email, password, address);
  return(
    <>
      <Container w="80%" my={20} py={10} centerContent>
        <Box color="gray.500" bg="white" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" mb={8} fontSize="1.5rem">
            ー登録情報ー
          </Heading>
          <form>
            <Stack spacing="24px">
            <EmailInput onChange={onChangeEmail}/>
            <PassInput onChange={onChangePass}/>
            <FormControl isRequired>
              <FormLabel size="sm">郵便番号</FormLabel>
              <Input type="string" placeholder="郵便番号" onChange={onChangeAddress} />
              <FormHelperText fontSize="xs" textAlign="left">7桁の数字で入力。</FormHelperText>
            </FormControl>
            <Container centerContent>
              <PrimaryButton onClick={onClickSignUp} loading={loading} >新規登録</PrimaryButton>
            </Container>
            {errorMessage && <AlertMessage>新規登録に失敗しました</AlertMessage>}
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  )
});