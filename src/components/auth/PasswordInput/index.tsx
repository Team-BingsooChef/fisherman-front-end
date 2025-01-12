import { Input, Text } from "@chakra-ui/react";

interface InputProps {
  value: string;
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  text,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <Text mb="8px" color="#03526B" fontWeight="semibold" alignSelf="start">
        {text}
      </Text>
      <Input
        variant="filled"
        type="password"
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
        mb="12px"
        _hover={{ backgroundColor: "#FFFEFE" }} // Keeps the background white on hover
        _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }} // Keeps the background white on focus
      />
    </>
  );
};
