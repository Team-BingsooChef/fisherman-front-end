import { Menu } from "../Menu";
import { FishingSpot } from "../Bingsoo";
import { ToppingsPagination } from "../FloatToppings";
import { AddToppingButton, CopyLink } from "../HomeBottomButton";
import { Text, Flex, IconButton,Box } from "@chakra-ui/react";
import { House } from "lucide-react";

export const OwnerView = () => {
    return ( 
              <>
           <Menu />
           <Text mt="10px" fontSize='xl'>빙어를 잡아보자</Text>
           <CopyLink />
           <Box  h='220' />
           <Flex mb="10px" justify="center" alignItems="center" >
           <ToppingsPagination/>
           </Flex>
           <FishingSpot />
           {/* <Bingsoo viewType="owner" /> viewType 넣어서 topping 클릭 여부*/}
         </>
    )
};

export const ChefView = () => {
    const nickname = "희연이";
    return ( 
        <>
        <Flex w="100%" ml="12px" mt="8px">
        <IconButton icon={<House size={28}/>} variant="ghost" aria-label="goMine" color="#777C89"/>
        </Flex>
        <Text mt="10px">사랑하는 {nickname}의 호수를 채워주세요</Text>
        <AddToppingButton />
        <Box  h='220' />
        <Flex mt="4px" justify="center" alignItems="center" >
        <ToppingsPagination />
        </Flex>
        <FishingSpot />
       
        {/* <Bingsoo viewType="owner" /> viewType 넣어서 topping 클릭 여부*/}
    </>
    )
};

