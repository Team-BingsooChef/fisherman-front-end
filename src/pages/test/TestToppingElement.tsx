// import { SmeltStatus } from "../../api/fishingspot/types";
// import { useModalStateStore } from "../../store/modal";
// import { useModalOpenStore } from "../../store/modal";
// import { Box, Image } from "@chakra-ui/react";
// import shark from "../../assets/fish/Shark.svg";
// type ToppingProps = {
//   topping: {
//     id: number;
//     smeltTypeId: number;
//     status: SmeltStatus;
//   };
//   localIndex: number;
// };

// export const TestToppingElement = ({ topping, localIndex }: ToppingProps) => {
//   const { setModalState } = useModalStateStore();
//   const { onOpen } = useModalOpenStore();

//   const groupClass = `group-${localIndex % 8}`;

//   const handleClick = () => {
//     localStorage.setItem("selectedToppingId", topping.id.toString());
//     localStorage.setItem(
//       "selectedToppingTypeId",
//       topping.smeltTypeId.toString()
//     );

//     switch (topping.status) {
//       case SmeltStatus.UNREAD:
//         setModalState("testOpenQuiz");
//         onOpen();
//         break;

//       case SmeltStatus.READ:
//         setModalState("testReadMessage");
//         onOpen();
//         break;
//       case SmeltStatus.SOLVED:
//         setModalState("testReadMessage");
//         onOpen();
//         break;
//       case SmeltStatus.DREW:
//         setModalState("testReadMessage");
//         onOpen();
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Box
//       className={`topping-box ${groupClass}`}
//       data-group={localIndex % 7}
//       textAlign="center"
//       onClick={handleClick}
//     >
//       <Image
//         src={shark}
//         width="90px"
//         height="90px"
//         css={{
//           "@media (min-height: 750px)": {
//             width: "110px",
//             height: "110px",
//           },
//           "@media (min-height: 900px)": {
//             width: "120px",
//             height: "120px",
//           },
//           "@media (min-height: 1100px)": {
//             width: "170px",
//             height: "170px",
//           },
//         }}
//         objectFit="contain"
//       />
//       {/* <Text>{topping.senderName}</Text> */}
//     </Box>
//   );
// };
