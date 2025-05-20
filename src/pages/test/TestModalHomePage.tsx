// import styled from "@emotion/styled";
// import { ModalLayout } from "../../components/home/modal/ModalLayout";
// import { Menu } from "../../components/home/Menu";
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// import { CopyLink } from "../../components/home/HomeBottomButton";
// import { Text, Flex, IconButton, Box, Image } from "@chakra-ui/react";
// import fisherman_big from "../../assets/pictures/fisherman_small.svg";
// import { TestToppingElement } from "./TestToppingElement";
// import { mockFishingSpotFish } from "./mockFishingSpotFish";

// export default function TestModalHomePage() {
//   return (
//     <Wrapper>
//       <Menu />
//       <Text mt="10px" fontSize="l" fontWeight=" Bold" color="#03526B">
//         친구들에게 공유해 빙어를 추가해 보세요!
//       </Text>
//       <CopyLink />
//       <Box h="60px" />
//       <Flex
//         w="100%"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="flex-end"
//         h="100%"
//       >
//         <Image
//           src={fisherman_big}
//           alt="fisherman"
//           width={200}
//           height={200}
//           mb="-32px"
//           zIndex="1"
//           css={{
//             "@media (min-height: 768px)": {
//               width: "220px",
//               height: "220px",
//             },
//             "@media (min-height: 900px)": {
//               width: "250px",
//               height: "250px",
//             },
//             "@media (min-height: 1100px)": {
//               width: "320px",
//               height: "320px",
//             },
//           }}
//         />
//         <FishingspotContainer>
//           {mockFishingSpotFish?.smelts?.map((smelt, idx) => (
//             <TestToppingElement
//               key={smelt.id}
//               topping={{
//                 ...smelt,
//               }}
//               localIndex={idx}
//             />
//           ))}
//         </FishingspotContainer>
//       </Flex>
//       <Flex
//         mt="8px"
//         mb="8px"
//         justify="center"
//         alignItems="center"
//         css={{
//           "@media (min-height: 920px)": {
//             marginTop: "16px",
//           },
//         }}
//       >
//         <>
//           <IconButton
//             icon={<ChevronLeftIcon />}
//             variant="solid"
//             borderRadius="full"
//             aria-label="Previous Page"
//             mr="8px"
//           >
//             이전
//           </IconButton>
//           <Text>
//             {1} / {1}
//           </Text>
//           <IconButton
//             icon={<ChevronRightIcon />}
//             variant="solid"
//             borderRadius="full"
//             aria-label="Next Page"
//             ml="8px"
//           >
//             다음
//           </IconButton>
//         </>
//       </Flex>

//       <ModalLayout />
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: hidden;
// `;

// const FishingspotContainer = styled.div`
//   position: relative;
//   background-color: #78b8ec;
//   border-start-start-radius: 20px;
//   border-start-end-radius: 20px;
//   border-end-start-radius: 20px;
//   border-end-end-radius: 20px;
//   width: 100%;
//   height: 42dvh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media (min-height: 730px) {
//     height: 46dvh;
//   }
//   @media (min-height: 900px) {
//     height: 48dvh;
//   }
// `;
