import { IconButton } from "@chakra-ui/button";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Container, Flex, Heading, HStack, ListItem, Spacer, Stack, UnorderedList } from "@chakra-ui/layout";
import { ChangeEvent, useState, VFC } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useWeatherGet } from "../../hooks/useWeatherGet";
import { AddInput } from "../atoms/input/AddInput";

export const TaskCont: VFC = () => {
  const { weather } = useWeatherGet();
  const { loginUser ,setLoginUser } = useLoginUser();
  const [ todoText, setTodoText ] = useState<string>("");
  const [ todos, setTodos ] = useState<string[]>([]);
  const onChangeTodoText = (e: ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...todos, todoText];
    setTodos(newTodos);
    setTodoText("");
    if (loginUser?.width !== undefined) {
      const newData = {
        width: loginUser?.width,
        address: loginUser.address,
        tasks: newTodos
      }
      setLoginUser(newData);
    }
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (loginUser?.width !== undefined) {
      const newData = {
        width: loginUser?.width,
        address: loginUser.address,
        tasks: newTodos
      }
      setLoginUser(newData);
    }
  };
  
  const onClickComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    let widthPlus = 0;
    weather === "Rain" || "Snow" ? widthPlus = 5 : widthPlus = 1 
    if (loginUser?.width !== undefined) {
      const newData = {
        width: loginUser?.width + widthPlus,
        address: loginUser.address,
        tasks: newTodos
      }
      setLoginUser(newData);
    }
  };

  return (
    <Center>
        <Box w="95%" bg="brand.100" borderRadius="lg" pt={5} pb={30} >
          <Container centerContent>
            <Heading fontSize="1.5rem" mb={3}>タスク一覧</Heading>
            <AddInput todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd} />
            <Spacer />
            <Box w="99%" minH="300px" bg="brand.400" borderRadius="lg" mt={5}>
              <Container textAlign="left" py={5}>
                <UnorderedList >
                  <Stack spacing="10px">
                    {loginUser?.tasks !== undefined && loginUser?.tasks.map((todo, index) => {
                      return (
                        <ListItem key={todo}>
                          <Flex justify="space-between"　alignItems="center" >
                            <Box as="p">{todo}</Box>
                            <HStack spacing="5px">
                              <IconButton  onClick={() => onClickComplete(index)}  colorScheme="green" aria-label="Task Complete" icon={<CheckIcon />} size="md" />
                              <IconButton onClick={() => onClickDelete(index)} colorScheme="red" aria-label="Task Delete" icon={<DeleteIcon />} size="md"/>
                            </HStack>
                          </Flex>
                        </ListItem>
                      );
                    })}
                  </Stack>
                </UnorderedList>
              </Container>
            </Box>
          </Container>
        </Box>
      </Center>
  );
}