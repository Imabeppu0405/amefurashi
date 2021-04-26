import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Container, Heading, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import { DefaultInput } from "../atoms/input/DefaultInput";
import { PassInput } from "../atoms/input/PassInput";

export const Register: VFC = memo(() => {
  const { signUp, loading} = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ address, setAddress ] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) =>  setAddress(e.target.value);
  const onClickSignUp = () => signUp(email, password, address);
  return(
    <Center h="100vh">
      <Box color="gray.500" bg="white" p={{ base: 4, md: 8 }} borderRadius="md" shadow="md">
        <Heading as="h1" mb={8} fontSize="1.5rem">
          ー登録情報ー
        </Heading>
        <form>
          <Stack spacing="24px">
            <DefaultInput onChange={onChangeEmail} type="email" placeholder="Your Email" label="Email" isRequired/>
            <PassInput onChange={onChangePass} isRequired />
            <FormControl w={{base: "250px", md: "350px"}}  isRequired>
              <FormLabel size="sm">郵便番号</FormLabel>
              <Input type="string" placeholder="郵便番号" onChange={onChangeAddress} />
              <FormHelperText fontSize="xs" textAlign="left">7桁の数字で入力。</FormHelperText>
            </FormControl>
            <Container centerContent>
              <PrimaryButton onClick={onClickSignUp} loading={loading} disabled={ email === "" || password.length <= 5 || address.length !== 7}>新規登録</PrimaryButton>
            </Container>
            <Center>
              <Link to="/" style={{ fontSize: ".8rem" }}>ログイン画面に戻る</Link>
            </Center>
          </Stack>
        </form>
      </Box>
    </Center>
  )
});