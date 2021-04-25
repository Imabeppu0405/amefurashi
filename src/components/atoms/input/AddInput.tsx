import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { ChangeEvent, memo, VFC } from "react";

type Props = {
  todoText: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AddInput: VFC<Props>= memo((props) => {
  const { todoText, onClick, onChange } = props;
  return (
    <InputGroup >
      <Flex w="100%">
          <Input color="gray.700" bg="white" type="text" placeholder="TODOを入力" onChange={onChange} value={todoText} w="80%"/>
        <InputRightElement width="20%">
          <Button color="white" colorScheme="blackAlpha" h="100%" w={{ base: "70%" }} size="xs" onClick={onClick}  >
            Add
          </Button>
        </InputRightElement>
      </Flex>
    </InputGroup>
  );
});