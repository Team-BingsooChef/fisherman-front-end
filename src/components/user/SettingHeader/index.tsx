import { Text, IconButton, Flex } from "@chakra-ui/react";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetFishingSpotId } from "../../../hook/fishingspot/useGetFishingSpotId";
interface SettingHeaderProps {
  text: string;
}

export const SettingHeader = ({ text }: SettingHeaderProps) => {
  const navigate = useNavigate();
  const { data: fishingSpotData } = useGetFishingSpotId();

  const goHome = () => {
    navigate(`/${fishingSpotData?.fishingSpotId}`);
  };
  return (
    <Flex justify="space-between" align="center" w="100%" mt="20px">
      <Text color="#13353B" fontSize="32px" fontWeight="Bold">
        {text}
      </Text>
      <IconButton
        icon={<House size={28} />}
        variant="ghost"
        aria-label="goMine"
        color="black"
        onClick={goHome}
      />
    </Flex>
  );
};
