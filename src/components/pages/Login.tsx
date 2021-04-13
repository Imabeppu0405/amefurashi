import { Box, Container, Flex, Stack } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import heroImg from "../../img/heroTitle.png"
import { AlertMessage } from "../atoms/AlertMessage";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import { EmailInput } from "../atoms/input/EmailInput";
import { PassInput } from "../atoms/input/PassInput";


export const Login: VFC = memo(() => {
  const { login, loading, errorMessage } = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onClickLogin = () => login(email, password);
  return(
    <SContainer>
      <SHeroCont>
        <SHeroTitleCont>
          <SHeroTitle src={heroImg} alt="あめふらし"/>
          <SHeroText>
            雨がちょっと楽しみになる<br/>
            育成型Todoアプリ
          </SHeroText>
            <Flex align="center" justify="center">
              <Box color="gray.500" bg="white" p={4} borderRadius="md" shadow="md" >
                <Stack spacing="10px">
                  <EmailInput onChange={onChangeEmail}/>
                  <PassInput onChange={onChangePass}/>
                  <Container centerContent pt={3}>
                    <PrimaryButton onClick={onClickLogin} loading={loading} disabled={ email === "" || password === ""}>
                          ログイン
                    </PrimaryButton>
                  </Container>
                  <Flex align="center" justify="center">
                    <Stack spacing="10px">
                      {errorMessage && <AlertMessage>ログインに失敗しました</AlertMessage>}
                      <Link to="/register" style={{ fontSize: ".8rem" }}>新規登録はこちら</Link>
                    </Stack>
                  </Flex>
                </Stack>
              </Box>
            </Flex>
        </SHeroTitleCont>
      </SHeroCont>
    </SContainer>
  )
});

const SContainer = styled.div`

`

const SHeroCont = styled.div`
  margin-bottom: 50px;
`

const SHeroTitleCont = styled.div`
  margin-top: 200px;
`

const SHeroTitle = styled.img`
  display: block;
  margin: auto;
  width: 270px;
`

const SHeroText = styled.p`
  font-size: 1.2rem;
  line-height: 30px;
  margin-bottom: 60px;
`