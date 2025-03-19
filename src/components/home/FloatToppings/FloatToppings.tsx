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
  const { smeltsWithSender } = useFishingSpot(Number(fishingSpotId));

  return (
    <>
      {smeltsWithSender?.map((smelt) => (
        <ToppingElement
          key={smelt.id}
          topping={{
            ...smelt,
            status: smelt.status as SmeltStatus,
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
    senderName?: string;
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
      <Text>{topping.senderName}</Text>
    </Box>
  );
};

export const ToppingsPagination = () => {
  const { currentPage, totalPages, nextPage, prevPage } = useFishingSpot(1);

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
