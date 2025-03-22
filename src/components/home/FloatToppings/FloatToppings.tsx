import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text, Image } from "@chakra-ui/react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";

import useFishingSpot from "../../../hook/fishingspot/useFishingSpot";
import { querySmeltsCategory } from "../../../api/smelts/apis";
import { SmeltStatus } from "../../../api/fishingspot/types";
import { SmeltsCategoryQueryResponseBody } from "../../../api/smelts/types";
import "./ToppingPosition.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDetermineRole } from "../../../hook/fishingspot/useDetermineRole";

export const Toppings = () => {
  const { fishingSpotId } = useParams();
  const { data } = useFishingSpot(Number(fishingSpotId));

  return (
    <>
      {data?.smelts?.map((smelt) => (
        <ToppingElement
          key={smelt.id}
          topping={{
            ...smelt,
          }}
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
};

const ToppingElement = ({ topping }: ToppingProps) => {
  const role = useDetermineRole();

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

  const groupClass = `group-${topping.id % 8}`;

  const handleClick = () => {
    if (role !== "owner") {
      return;
    } //chef면 클릭 막기
    localStorage.setItem("selectedToppingId", topping.id.toString());
    if (topping.status === "UNREAD") {
      setModalState("openQuiz");
      onOpen();
    } else {
      setModalState("readMessage");
      onOpen();
    }
  };

  return (
    <Box
      className={`topping-box ${groupClass}`}
      data-group={topping.id % 8}
      textAlign="center"
      onClick={handleClick}
      cursor={role === "owner" ? "pointer" : "not-allowed"}
    >
      <Image
        src={imgSrc}
        alt={matchingSmeltType?.name}
        boxSize="100px"
        objectFit="contain"
      />
      {/* <Text>{topping.senderName}</Text> */}
    </Box>
  );
};

export const ToppingsPagination = () => {
  const { fishingSpotId } = useParams();
  const { currentPage, totalPages, nextPage, prevPage } = useFishingSpot(
    Number(fishingSpotId)
  );

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
        {currentPage + 1} / {totalPages + 1}
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
