import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ChangeEvent, memo, VFC } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: VFC<Props> = memo((props) => {
  const { onChange } = props;
  return (
    <FormControl w="250px" isRequired >
      <FormLabel size="sm">Email</FormLabel>
      <Input bg="white" type="email" placeholder="Your Email" onChange={onChange} />
    </FormControl>
  );
});