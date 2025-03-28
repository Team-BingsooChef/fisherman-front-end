import styled from "@emotion/styled";
import { FaGithub } from "react-icons/fa";
import {
  Box,
  Text,
  Container,
  Heading,
  SimpleGrid,
  Avatar,
  Flex,
  IconButton,
  Button,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChevronLeft } from "lucide-react";
import { TEAM_DATA } from "../../__mocks__/TEAM_DATA";
import fisherman_small from "../../assets/pictures/fisherman_small.svg";
import { useNavigate } from "react-router-dom";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function AboutUsPage() {
  const navigate = useNavigate();
  const { data: fishingSpotData } = useGetFishingSpotId();
  return (
    <Wrapper>
      <Box w="calc(100% - 60px)">
        <Flex
          w="100%"
          h="70px"
          align="center"
          backgroundColor="#afd5f4"
          position="relative"
        >
          <IconButton
            icon={<ChevronLeft size={28} />}
            variant="ghost"
            aria-label="goBack"
            color="#03526B"
            position="absolute"
            onClick={() => {
              navigate(`/${fishingSpotData?.fishingSpotId}`);
            }}
          />
          <Text color="#03526B" fontSize="20px" fontWeight="Bold" ml="40px">
            포피셔 소개
          </Text>
        </Flex>
      </Box>

      {/* 팀 소개 */}
      <Container maxW="6xl">
        <Flex align="center">
          <img src={fisherman_small} alt="Fisherman Logo" width="100" />
          <Heading textAlign="center" color="#03526B">
            포 피셔
          </Heading>
        </Flex>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} p={4}>
          {TEAM_DATA.map((member) => (
            <Box
              key={member.name}
              bg="white"
              borderRadius="lg"
              p={4}
              boxShadow="md"
            >
              <Box display="flex" justifyContent="center">
                <Avatar src={member.avatar} size="xl" mb={3} />
              </Box>
              <Text fontWeight="bold">{member.name}</Text>
              <Text fontSize="sm" color="gray.600">
                {member.role}
              </Text>
              <Flex mt={2} gap={2} justify="center">
                <IconButton
                  aria-label="GitHub"
                  icon={<FaGithub />}
                  size="sm"
                  onClick={() => window.open(member.github)}
                />
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      <Flex direction="column" align="center" py={6}>
        <Text mb={4} color="#03526B" fontSize="2xl" fontWeight="bold">
          {" "}
          Contact Us
        </Text>
        <Box bg="white" p={6} borderRadius="xl" mx={4} mb={8}>
          <Text fontWeight="bold" fontSize="lg" mb={1}>
            Fisherman
          </Text>
          <Text color="gray.600" mb={3}>
            포 피셔 레포지터리
          </Text>
          <Flex gap={2} mb={4}>
            <Button
              as="a"
              href={"https://github.com/Team-BingsooChef/fisherman-front-end"}
              target="_blank"
              leftIcon={<Icon as={FaGithub} />}
              size="sm"
              colorScheme="blue"
              variant="outline"
            >
              view FE
            </Button>
            <Button
              as="a"
              href={"https://github.com/Team-BingsooChef/fisherman-api-server"}
              target="_blank"
              leftIcon={<Icon as={FaGithub} />}
              size="sm"
              colorScheme="blue"
              variant="outline"
            >
              view BE
            </Button>
          </Flex>
        </Box>
        <Flex flexDir="column" align="center" gap={2} mb={4}>
          <Icon as={EmailIcon} aria-label="email" />
          <Text fontWeight="bold" mb={2}>
            bingsoochef2@gmail.com
          </Text>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #afd5f4;
  overflow-y: auto;
`;
