import "./ToppingPosition.css";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text, Image } from "@chakra-ui/react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";

import { querySmeltsCategory } from "../../../api/smelts/apis";
import { SmeltStatus } from "../../../api/fishingspot/types";
import { SmeltsCategoryQueryResponseBody } from "../../../api/smelts/types";
import { FishingSpotQueryResponseBody } from "../../../api/fishingspot/types";
import { useDetermineRole } from "../../../hook/fishingspot/useDetermineRole";
import { useEffect, useState } from "react";

import { useQueryQuiz } from "../../../hook/smelts/useQueryQuiz";
import { useDetermineRole } from "../../../hook/fishingspot/useDetermineRole";

export const Toppings = ({
  fishingSpotFishData,
}: {
  fishingSpotFishData: FishingSpotQueryResponseBody;
}) => {
  return (
    <>
      {fishingSpotFishData?.smelts?.map((smelt, idx) => (
        <ToppingElement
          key={smelt.id}
          topping={{
            ...smelt,
          }}
          localIndex={idx}
        />
      ))}
    </>
  );
};

type ToppingProps = {
  topping: {
    id: number;
    smeltTypeId: number;
    status: SmeltStatus;
  };
  localIndex: number;
};

const ToppingElement = ({ topping, localIndex }: ToppingProps) => {
  const role = useDetermineRole();
  const { data: quizData } = useQueryQuiz(topping.id);

  const { setModalState } = useModalStateStore();
  const { onOpen } = useModalOpenStore();

  const [smeltTypes, setSmeltTypes] = useState<
    SmeltsCategoryQueryResponseBody["smeltTypes"]
  >([]);

  useEffect(() => {
    const getSmeltsType = async () => {
      const res = await querySmeltsCategory();
      setSmeltTypes(res.smeltTypes);
    };

    getSmeltsType();
  }, []);

  const matchingSmeltType = smeltTypes.find(
    (smelt) => smelt.id === topping.smeltTypeId
  );

  const imgSrc =
    topping.status === "UNREAD"
      ? matchingSmeltType?.iceImageUrl
      : matchingSmeltType?.imageUrl;

  const groupClass = `group-${localIndex % 8}`;

  const handleClick = () => {
    if (role !== "owner") {
      return;
    } //chef면 클릭 막기
    localStorage.setItem("selectedToppingId", topping.id.toString());
    localStorage.setItem(
      "selectedToppingTypeId",
      topping.smeltTypeId.toString()
    );

    switch (topping.status) {
      case SmeltStatus.UNREAD:
        if (quizData?.quiz.isSolved === true) {
          setModalState("readMessage");
          onOpen();
        } else if (quizData?.quiz.isSolved === false) {
          setModalState("openQuiz");
          onOpen();
        } else {
          setModalState("readMessage");
          onOpen();
        }
        break;

      case SmeltStatus.READ:
        setModalState("readMessage");
        onOpen();
        break;
      case SmeltStatus.SOLVED:
        setModalState("readMessage");
        onOpen();
        break;
      case SmeltStatus.DREW:
        setModalState("readMessage");
        onOpen();
        break;
      default:
        break;
    }
  };

  return (
    <Box
      className={`topping-box ${groupClass}`}
      data-group={localIndex % 7}
      textAlign="center"
      onClick={handleClick}
      cursor={role === "owner" ? "pointer" : "not-allowed"}
    >
      <Image
        src={imgSrc}
        alt={matchingSmeltType?.name}
        width="90px"
        height="90px"
        css={{
          "@media (min-height: 750px)": {
            width: "110px",
            height: "110px",
          },
          "@media (min-height: 900px)": {
            width: "120px",
            height: "120px",
          },
          "@media (min-height: 1100px)": {
            width: "170px",
            height: "170px",
          },
        }}
        objectFit="contain"
      />
      {/* <Text>{topping.senderName}</Text> */}
    </Box>
  );
};

export const ToppingsPagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      nextPage();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      prevPage();
    }
  };

  return (
    <>
      <IconButton
        onClick={handlePreviousPage}
        icon={<ChevronLeftIcon />}
        disabled={currentPage === 0}
        variant="solid"
        borderRadius="full"
        aria-label="Previous Page"
        mr="8px"
      >
        이전
      </IconButton>
      <Text>
        {currentPage + 1} / {totalPages}
      </Text>
      <IconButton
        onClick={handleNextPage}
        icon={<ChevronRightIcon />}
        disabled={currentPage === totalPages - 1}
        variant="solid"
        borderRadius="full"
        aria-label="Next Page"
        ml="8px"
      >
        다음
      </IconButton>
    </>
  );
};
