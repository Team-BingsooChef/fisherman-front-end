import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SentSmeltsQueryResponseBody } from "../../../api/inventory/types";
import { useQuerySentSmelts } from "../../../hook/inventory/useQuerySentSmelts";
import { useSmeltsImg } from "../../../hook/smelts/useSmeltsImg";

export const SeeToppingsByMe = () => {
  const size = 10;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQuerySentSmelts(size);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      // 다음 페이지가 있고, 현재 데이터를 가져오는 중이 아닐 때만 다음 페이지를 호출합니다.
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Flex
      m="20px 0 10px 0"
      flexDir="column"
      w="calc(100% - 48px)"
      h="100%"
      align="center"
      justify="center"
      overflowY="auto"
    >
      <Box w="full" h="100%" bg="none" overflowY="auto">
        {data?.pages.map((page) =>
          page.smelts.map((topping) => (
            <ToppingByMeElement topping={topping} key={topping.id} />
          ))
        )}
        {isLoading && <Text>Loading more...</Text>}
        {!hasNextPage && data?.pages[0].smelts.length === 0 && (
          <Text
            textAlign="center"
            fontSize="14px"
            fontWeight="semibold"
            color="#67686d"
          >
            아직 보낸 빙어가 없어요! 친구에게 빙어를 보내보세요
          </Text>
        )}
      </Box>
    </Flex>
  );
};

const ToppingByMeElement = ({
  topping,
}: {
  topping: SentSmeltsQueryResponseBody["smelts"][number];
}) => {
  const { getImageUrl } = useSmeltsImg();
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "visit_by_me", {
        fishing_spot_id: topping.fishingSpotId,
      });
    }
    navigate(`/spot/${topping.fishingSpotId}`);
  };
  return (
    <Flex
      flexDir="column"
      w="full"
      justify="center"
      align="center"
      backgroundColor="#AFD5F4"
      h="auto"
      borderRadius="16px"
      mb="16px"
    >
      <Box w="full" p="0 20px 0 20px">
        <Text
          color="black"
          fontSize="16px"
          fontWeight="semibold"
          m="24px 0 10px 0"
        >
          {topping.fishermanNickname}에게
        </Text>
      </Box>
      <ModalInsideWhiteContainer height="160px">
        <Box
          w="full"
          h="full"
          backgroundColor="white"
          borderRadius="16px"
          p="20px"
          position="relative"
        >
          {/* 상대 낚시터로 navigate */}
          <Image
            src={getImageUrl(topping.smeltTypeId)}
            onClick={handleImageClick}
            alt="topping icon"
            position="absolute"
            top="-20px"
            right="0px"
            boxSize="50px"
            cursor="pointer"
            transition="transform 0.2s ease-in-out"
            _hover={{
              transform: "scale(1.2)",
            }}
          />

          <Text fontSize="16px" color="black" fontWeight="medium">
            {topping.letter.content}
          </Text>
        </Box>
      </ModalInsideWhiteContainer>
      {topping.status === "UNREAD" ? (
        <Text
          fontSize="14px"
          color="black"
          m="20px 0 20px 0"
          fontWeight="semibold"
        >
          아직 열어 보지 않았어요.
        </Text>
      ) : (
        <>
          {/* 답장이 있을 경우 */}
          {topping.letter.comment !== null && (
            <>
              <Box w="full" p="0 20px 0 20px">
                <Text
                  color="black"
                  fontSize="16px"
                  fontWeight="semibold"
                  m="20px 0 10px 0"
                >
                  답장
                </Text>
              </Box>
              <ModalInsideWhiteContainer height="60px" state="seemine">
                <Box
                  w="full"
                  h="full"
                  backgroundColor="white"
                  borderRadius="16px"
                  p="20px"
                  position="relative"
                >
                  <Text fontSize="16px" color="black" fontWeight="medium">
                    {/* 답장 내용을 표시 (예: "답장 내용입니다.") */}
                    {topping.letter.comment.content}
                  </Text>
                </Box>
              </ModalInsideWhiteContainer>
            </>
          )}
          <Text
            fontSize="14px"
            color="black"
            m="20px 0 20px 0"
            fontWeight="semibold"
          >
            이 편지는 {topping.wrongCount} 번 만에 열어봤어요!
          </Text>
        </>
      )}
    </Flex>
  );
};
