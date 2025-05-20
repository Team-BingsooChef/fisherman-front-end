import { Input, Text } from "@chakra-ui/react";
import { kMaxLength } from "buffer";

interface InputProps {
  value: string;
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
}

export const WhiteInput: React.FC<InputProps> = ({
  value,
  text,
  handleChange,
  placeholder,
  maxLength,
}) => {
  return (
    <>
      <Text mb="8px" color="#03526B" alignSelf="start" fontWeight="semibold">
        {text}
      </Text>
      <Input
        maxLength={maxLength}
        variant="filled"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        _placeholder={{ opacity: 1, color: "gray.500" }}
        size="sm"
        width={"100%"}
        height="60px"
        fontWeight="medium"
        borderRadius="16px"
        backgroundColor="#FFFEFE"
        mb="24px"
        _hover={{ backgroundColor: "#FFFEFE" }} // Keeps the background white on hover
        _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }} // Keeps the background white on focus
      />
    </>
  );
};
