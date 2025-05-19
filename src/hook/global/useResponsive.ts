import { useMediaQuery } from "@chakra-ui/react";

export function useResponsive() {
  const [isMobile] = useMediaQuery("(max-width: 760px)");
  const [isTablet] = useMediaQuery("(min-width: 760px) and (max-width: 920px)");
  const [isDesktop] = useMediaQuery("(min-width: 920px)");
  const [isLargeDesktop] = useMediaQuery("(min-width: 1100px)");

  return { isMobile, isTablet, isDesktop, isLargeDesktop };
}
