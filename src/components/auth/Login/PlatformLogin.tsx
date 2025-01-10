import { Flex, Button } from "@chakra-ui/react"

export const PlatformLogin = () => {
    return (
        <Flex w="full" flexDir="column" align="center" gap="30px">
        <Button leftIcon={<ChevronLeft size={28} />} variant="ghost" aria-label="goBack" color={TEXTCOLOR.HEADER_BLACK} position="absolute"/>
        </Flex>
    )
}