import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ChangeEvent, memo, useState, VFC } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

export const PassInput: VFC<Props> = memo((props) => {
  const { onChange, isRequired } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show)
  return (
    <FormControl w={{base: "250px", md: "350px"}} isRequired={isRequired}>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input bg="white" pr="4rem" type={show ? "text" : "password"} placeholder="Your Password" onChange={onChange}/>
        <InputRightElement width="4.5rem">
          <Button color="white" colorScheme="blackAlpha" h="1.75rem" size="xs" onClick={handleClick}  >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText fontSize="xs" textAlign="left">6桁以上で入力。</FormHelperText>
    </FormControl>
  );
});