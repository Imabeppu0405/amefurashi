import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { memo, VFC } from "react";

type Props = {
  todoText: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddInput: VFC<Props>= memo((props) => {
  const { todoText, onClick, onChange } = props;
  return (
    <InputGroup >
      <Input color="gray.700" bg="white" type="text" placeholder="TODOを入力" onChange={onChange} value={todoText} w="80%"/>
      <InputRightElement width="4rem">
        <Button color="white" colorScheme="blackAlpha" h="100%" w="70%" size="xs" onClick={onClick}  >
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});