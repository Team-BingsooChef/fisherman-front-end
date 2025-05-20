// import { WhiteLeftHeader } from "../../components/common/Header";
// import { Flex, Text, Button, Textarea } from "@chakra-ui/react";
// import { MultipleQuizSection } from "../../components/chef/MultipleQuizSection";
// import { useState } from "react";
// import styled from "@emotion/styled";

// export const TestMultipleCreatePage = () => {
//   const [question, setQuestion] = useState("");
//   return (
//     <Wrapper>
//       <WhiteLeftHeader text="빙어 보내기" />
//       <Flex gap="15px" m="14px 0 30px 0">
//         <div
//           style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
//         ></div>
//         <div
//           style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
//         ></div>
//         <div
//           style={{ width: "60px", height: "1px", backgroundColor: "black" }}
//         ></div>
//       </Flex>

//       <Text
//         fontSize="16px"
//         fontWeight="bold"
//         mb="14px"
//         w="full"
//         textAlign="left"
//       >
//         퀴즈 추가 (선택)
//       </Text>

//       <Text
//         fontSize="16px"
//         fontWeight="bold"
//         mb="6px"
//         w="full"
//         textAlign="left"
//       >
//         유형
//       </Text>
//       <Flex gap="12px">
//         <Button
//           bg="#D9D9D9"
//           color="black"
//           fontSize="20px"
//           fontWeight="semiBold"
//           borderRadius="16px"
//           h="52px"
//           w="160px"
//           _hover={{ bg: "#B5B5B5" }}
//         >
//           OX
//         </Button>
//         <Button
//           bg="#D9D9D9"
//           color="black"
//           fontSize="20px"
//           fontWeight="semiBold"
//           borderRadius="16px"
//           h="52px"
//           w="160px"
//           _hover={{ bg: "#B5B5B5" }}
//         >
//           객관식
//         </Button>
//       </Flex>

//       <>
//         <Text
//           fontSize="16px"
//           fontWeight="bold"
//           mt="11px"
//           mb="6px"
//           w="full"
//           textAlign="left"
//         >
//           질문
//         </Text>
//         <Textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value.slice(0, 30))}
//           w="full"
//           h="70px"
//           bg="white"
//           border={1}
//           borderColor="gray.500"
//           borderRadius="8px"
//           placeholder="퀴즈의 질문을 작성해 주세요."
//         />
//         <Text w="full" fontSize="12px" color="black" textAlign="right">
//           {0}/{30}
//         </Text>
//         <MultipleQuizSection />
//       </>

//       <Flex gap="23px" mt="20px" mb="20px">
//         <Button
//           bg="#D9D9D9"
//           color="black"
//           fontSize="20px"
//           fontWeight="semiBold"
//           borderRadius="16px"
//           h="45px"
//           w="140px"
//           _hover={{ bg: "#D9D9D9" }}
//         >
//           뒤로가기
//         </Button>
//         <Button
//           bg="#03526B"
//           color="white"
//           fontSize="20px"
//           fontWeight="semiBold"
//           borderRadius="16px"
//           h="45px"
//           w="140px"
//           _hover={{ bg: "#03526B" }}
//         >
//           완료
//         </Button>
//       </Flex>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   width: calc(100% - 40px);
//   height: 100dvh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
// `;
