import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text, Image } from "@chakra-ui/react";
import { toppingData } from "../../../__mocks__/topping/data";
import { toppingTypesData } from "../../../__mocks__/toppingtypes/data";
import { usePaginationStore } from "../../../store/home";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import "./ToppingPosition.css";

export const Toppings = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);

  return (
    <>
      {toppingData[currentPage]?.toppings.map((topping) => (
        <ToppingElement key={topping.toppingId} topping={topping} />
      ))}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToppingElement = ({ topping }: { topping: any }) => {
  const { setModalState } = useModalStateStore();
  const { onOpen } = useModalOpenStore();

  const matchingToppingType = toppingTypesData.find(
    (type) => type.toppingTypeId === topping.toppingTypeId
  );
  const imgSrc = topping.isHidden
    ? matchingToppingType?.frozenImg
    : matchingToppingType?.defrostedImg;

  const groupClass = `group-${topping.toppingId % 8}`;

  const handleClick = () => {
    localStorage.setItem("selectedToppingId", topping.toppingId);
    if (topping.isHidden) {
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
      data-group={topping.toppingId % 8}
      textAlign="center"
      onClick={handleClick}
      cursor="pointer"
    >
      <Image
        src={imgSrc}
        alt={matchingToppingType?.toppingTypeName}
        boxSize="100px"
        objectFit="contain"
      />
      <Text>{topping.chefName}</Text>
    </Box>
  );
};

export const ToppingsPagination = () => {
  const { currentPage, setCurrentPage, totalPages } = usePaginationStore();

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
