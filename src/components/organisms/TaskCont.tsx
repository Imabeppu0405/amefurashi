import { IconButton } from "@chakra-ui/button";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Container, Divider, Flex, Heading, HStack, ListItem, Spacer, Stack, UnorderedList } from "@chakra-ui/layout";
import { ChangeEvent, useState, VFC } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useMessage } from "../../hooks/useMessage";
import { AddInput } from "../atoms/input/AddInput";

type Props = {
  weather: string | undefined;
}

export const TaskCont: VFC<Props> = (props) => {
  const { weather } = props;
  const { loginUser ,setLoginUser } = useLoginUser();
  const { showMessage } = useMessage();
  const [ todoText, setTodoText ] = useState("");
  const [ todos, setTodos ] = useState<string[]>([]);
  const onChangeTodoText = (e: ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    setTodoText("");
    let error = false;
    todos.forEach((todo) => {
      if (todoText === todo) {
        return error = true;
      };
    })
    if (error) {
      showMessage({ title: "同じタスクは追加できません", status: "error" })
      return;
    };
    const newTodos = [...todos, todoText];
    setTodos(newTodos);
    if (loginUser?.width !== undefined) {
      const newData = {
        name: loginUser.name,
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
    showMessage({ title: "タスクを削除しました", status: "error" });
    if (loginUser?.width !== undefined) {
      const newData = {
        name: loginUser.name,
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
    if (loginUser?.width !== undefined) {
      const widthNum = Math.floor( loginUser?.width / 100 );
      weather === "Rain" || weather ===  "Snow" ? widthPlus = widthNum * 10 : widthPlus = widthNum * 3 
      showMessage({ title: `あめふらしが成長！　+${widthPlus}`, status: "success" });
      const newData = {
        name: loginUser.name,
        width: loginUser?.width + widthPlus,
        address: loginUser.address,
        tasks: newTodos
      }
      setLoginUser(newData);
    }
  };

  return (
    <Box w="95%" bg="brand.100" borderRadius="lg" pt={5} pb={30} my={{ base: 5, md: 20}} >
      <Container centerContent>
        <Heading fontSize="1.5rem" mb={1}>タスク献立</Heading>
        <Divider mb={4} />
        <AddInput todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd} />
        <Spacer />
        <Box w="99%" minH={{ base: "300px", md: "400px"}} bg="brand.400" borderRadius="lg" mt={5}>
          <Container textAlign="left" py={5}>
            <UnorderedList >
              <Stack spacing="10px">
                {loginUser?.tasks !== undefined && loginUser?.tasks.map((todo, index) => {
                  return (
                    <ListItem key={todo}>
                      <Flex justify="space-between" alignItems="center" >
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
  );
}