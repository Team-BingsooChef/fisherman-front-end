// import { useState, useEffect } from "react";
// import { Flex, Box, Text, Image, IconButton, Textarea } from "@chakra-ui/react";
// import { XIcon } from "lucide-react";

// import { useModalHeight } from "../../hook/useModalHeight";
// import { useModalOpenStore, useModalStateStore } from "../../store/modal";

// import { NavyEllipseButton } from "../../components/common/CustomedButton";
// import { ModalInsideWhiteContainer } from "../../components/home/modal/ModalCustomedElement";
// import { mockSmeltsLetterQueryResponse } from "./mockSmeltsLetterQueryResponse";

// import shark from "../../assets/fish/Shark.svg";

// export const TestReadMessage = () => {
//   const { setModalState } = useModalStateStore();
//   const { onClose } = useModalOpenStore();

//   const [isReplied] = useState<boolean>(true);
//   // data가 변경될 때마다 isReplied 상태 업데이트

//   const [replyDraft, setReplyDraft] = useState(""); // 답장 작성란 입력값 관리
//   const [isReplying, setIsReplying] = useState(false); // 답장 작성 중인지 상태 관리
//   const maxReplyLength = 30;

//   // 모달 높이 설정 (디바이스 및 isReplying 상태에 따라 다르게 설정)
//   const [windowHeight, setInitWindowHeight] = useState(window.innerHeight);

//   useEffect(() => {
//     setInitWindowHeight(window.innerHeight);
//   }, []);
//   let modalHeight = "500px";

//   if (window.innerWidth < 600) {
//     // 모바일
//     if (windowHeight < 600) {
//       if (isReplied) {
//         modalHeight = "420px";
//       } else if (isReplying) {
//         modalHeight = "500px";
//       } else {
//         modalHeight = "360px";
//       }
//     } else if (windowHeight < 730) {
//       if (isReplied) {
//         modalHeight = "470px";
//       } else if (isReplying) {
//         modalHeight = "556px";
//       } else {
//         modalHeight = "410px";
//       }
//     } else if (windowHeight < 850) {
//       if (isReplied) {
//         modalHeight = "480px";
//       } else if (isReplying) {
//         modalHeight = "560px";
//       } else {
//         modalHeight = "430px";
//       }
//     } else {
//       if (isReplied) {
//         modalHeight = "490px";
//       } else if (isReplying) {
//         modalHeight = "560px";
//       } else {
//         modalHeight = "440px";
//       }
//     }
//   } else {
//     // 태블릿/PC
//     if (windowHeight < 750) {
//       if (isReplied) {
//         modalHeight = "460px";
//       } else if (isReplying) {
//         modalHeight = "560px";
//       } else {
//         modalHeight = "400px";
//       }
//     } else if (windowHeight < 820) {
//       if (isReplied) {
//         modalHeight = "480px";
//       } else if (isReplying) {
//         modalHeight = "580px";
//       } else {
//         modalHeight = "420px";
//       }
//     } else {
//       if (isReplied) {
//         modalHeight = "500px";
//       } else if (isReplying) {
//         modalHeight = "620px";
//       } else {
//         modalHeight = "480px";
//       }
//     }
//   }

//   useModalHeight(modalHeight);

//   const clickClose = () => {
//     setModalState("");
//     onClose();
//   };

//   const handleReplySubmit = () => {
//     setIsReplying(false);
//     setReplyDraft("");
//   };

//   return (
//     <Flex w="100%" h="100%" flexDir="column" align="center" position="relative">
//       <IconButton
//         aria-label="close"
//         icon={<XIcon onClick={clickClose} />}
//         position="absolute"
//         top="10px"
//         right="10px"
//       />
//       <Image src={shark} boxSize="80px" position="absolute" top="-40px" />
//       <Text
//         width=" calc(100% - 40px)"
//         fontSize="16px"
//         fontWeight="regular"
//         textAlign="left"
//         mt="60px"
//         mb="10px"
//       >
//         {mockSmeltsLetterQueryResponse?.letter.senderName}가 보낸 편지
//       </Text>
//       <Flex w="100%" h="44%" justify="center">
//         <ModalInsideWhiteContainer height="250px">
//           <Text
//             p="10px"
//             fontSize="16px"
//             fontWeight="regular"
//             css={{
//               "@media (max-width: 600px)": {
//                 fontSize: "14px",
//               },
//             }}
//           >
//             {mockSmeltsLetterQueryResponse?.letter.content}
//           </Text>
//         </ModalInsideWhiteContainer>
//       </Flex>

//       {/* 답장 여부에 따른 UI 변경 */}
//       {isReplied ? (
//         <Box
//           w="calc(100% - 40px)"
//           mt="55px"
//           css={{
//             "@media (max-width: 600px)": {
//               marginTop: "50px",
//             },
//           }}
//         >
//           <Text
//             width=" calc(100% - 40px)"
//             fontSize="16px"
//             fontWeight="regular"
//             textAlign="left"
//             mb="10px"
//           >
//             답장
//           </Text>
//           <Box w="full" bg="white" p="10px" h="70px" borderRadius="16px">
//             <Text
//               fontSize="16px"
//               fontWeight="regular"
//               borderRadius="md"
//               css={{
//                 "@media (max-width: 600px)": {
//                   fontSize: "14px",
//                 },
//               }}
//             >
//               {mockSmeltsLetterQueryResponse?.letter.comment?.content}
//             </Text>
//           </Box>
//         </Box>
//       ) : (
//         <Box
//           w="calc(100% - 40px)"
//           display="flex"
//           flexDir="column"
//           alignItems="center"
//         >
//           {!isReplying && (
//             <Box w="50%" mt="80px">
//               <NavyEllipseButton onClick={() => setIsReplying(true)}>
//                 답장 남기기
//               </NavyEllipseButton>
//             </Box>
//           )}
//           {isReplying && (
//             <>
//               <Text
//                 width=" calc(100% - 40px)"
//                 fontSize="16px"
//                 fontWeight="regular"
//                 textAlign="left"
//                 mb="10px"
//                 mt="10px"
//                 css={{
//                   "@media (max-width: 600px)": {
//                     marginTop: "20px",
//                   },
//                 }}
//               >
//                 답장
//               </Text>

//               <Textarea
//                 width="full"
//                 bg="white"
//                 placeholder="답장을 작성하세요..."
//                 value={replyDraft}
//                 onChange={(e) => setReplyDraft(e.target.value)}
//                 mb="10px"
//               />
//               <Text w="full" textAlign="right" fontSize="12px" color="black">
//                 {replyDraft.length}/{maxReplyLength}
//               </Text>
//               <Box w="calc(100% - 200px)">
//                 <NavyEllipseButton onClick={handleReplySubmit}>
//                   저장
//                 </NavyEllipseButton>
//               </Box>
//             </>
//           )}
//         </Box>
//       )}
//     </Flex>
//   );
// };
