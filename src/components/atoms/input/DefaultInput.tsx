import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ChangeEvent, memo, VFC } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "email" | "string";
  placeholder: string;
  isRequired?: boolean;
  label: string;
}

export const DefaultInput: VFC<Props> = memo((props) => {
  const { onChange , type, placeholder, isRequired, label} = props;
  return (
    <FormControl w={{base: "250px", md: "350px"}} isRequired={isRequired} >
      <FormLabel size="sm">{label}</FormLabel>
      <Input bg="white" type={type} placeholder={placeholder} onChange={onChange} />
    </FormControl>
  );
});