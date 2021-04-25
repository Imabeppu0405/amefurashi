import { Box, Center, Container, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/layout";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/Button/PrimaryButton";
import { DefaultInput } from "../atoms/input/DefaultInput";
import { PassInput } from "../atoms/input/PassInput";

import heroImg from "../../img/heroTitle.png";
import  HowTo1  from "../../img/HowTo1.png";
import  HowTo2  from "../../img/HowTo2.png";
import  HowTo3  from "../../img/HowTo3.png";
import { Image } from "@chakra-ui/image";

export const Login: VFC = memo(() => {
  const { login, loading} = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onClickLogin = () => login(email, password);
  return(
    <div>
      <Center h="100vh">
        <Box>
          <Image src={heroImg} alt="あめふらし" w={{ base: "270px",  md: "400px" }}/>
          <Text fontSize={{ base: "1rem", md: "1.3rem"}} mb={{ base: "40px", md: "60px"}}  letterSpacing={{ base: 2, md: 4}} >
            雨がちょっと楽しみになる<br/>
            育成型Todoアプリ
          </Text>
            <Flex align="center" justify="center">
              <Box color="gray.500" bg="white" p={{ base: 4, md: 8 }} borderRadius="md" shadow="md" >
                <Stack spacing={{ base: "14px", md: "24px" }}>
                  <DefaultInput onChange={onChangeEmail} type="email" placeholder="Your Email" label="Email"/>
                  <PassInput onChange={onChangePass}/>
                  <Container centerContent pt={3}>
                    <PrimaryButton onClick={onClickLogin} loading={loading} disabled={ email === "" || password === ""}>
                      ログイン
                    </PrimaryButton>
                  </Container>
                  <Center>
                    <Link to="/register" style={{ fontSize: ".8rem" }}>新規登録はこちら</Link>
                  </Center>
                </Stack>
              </Box>
            </Flex>
        </Box>
      </Center>
      <Box bg="white" h={{ base: "300px", md: "300px" }}> 
        <Center h="100%">
          <Stack>
            <Text color="brand.300"　fontSize="1.3rem" letterSpacing={2} fontWeight="bold">「雨の日が楽しみになる」</Text>
            <Text color="brand.100" letterSpacing={1}>をコンセプトにした育成型Todoアプリ</Text>
            <Divider/>
            <Spacer/>
            <Text color="brand.100" letterSpacing={2}>ちょっと憂鬱な雨の日に</Text>
            <Text color="brand.100" letterSpacing={1}>あめふらしを育てる楽しみを届けます</Text>
          </Stack>
        </Center>
      </Box>
      <Box w="100%" bg="brand.200" pt={10}>
        <Heading mb={2}>How To</Heading>
        <Divider mb={4} mx="auto" w="50%" />
        <Center>
        <Flex wrap="wrap" w="80%" justify="space-around">
          <Box w={{ base: "80%", md: "30%" }} my={{ base: 5, md: 10}}>
            <Image src={HowTo1} w="100%"/>
          </Box>  
          <Box w={{ base: "80%", md: "30%" }} my={{ base: 5, md: 10}}>
            <Image src={HowTo2} w="100%"/>
          </Box>  
          <Box w={{ base: "80%", md: "30%" }} my={{ base: 5, md: 10}}>
            <Image src={HowTo3} w="100%"/>
          </Box>  
        </Flex>
        </Center>
      </Box>
    </div>
  )
});