import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { COLOR } from "../../styles/color";
import fish_background from "../../assets/background/fish_background.svg";

export default function RootLayout() {
  const location = useLocation();

  const isDynamicRoute = /^\/\d+$/.test(location.pathname);

  const background =
    location.pathname === "/" || isDynamicRoute
      ? `url(${fish_background})`
      : [
          "/emailcheck",
          "/search",
          "/setting",
          "/seetoppinglist",
          "/fishdrawing",
          "/fishbag",
          "/sending",
        ].includes(location.pathname)
      ? COLOR.SERVE
      : COLOR.PRIMARY;

  return (
    <Wrapper>
      {location.pathname === "/" || isDynamicRoute ? (
        <ImgInsideWrapper backgroundColor={background}>
          <Outlet />
        </ImgInsideWrapper>
      ) : (
        <InsideWrapper backgroundColor={background}>
          <Outlet />
        </InsideWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
`;

const InsideWrapper = styled.div<{ backgroundColor: string }>`
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-size: cover;
  background-position: center;
`;

const ImgInsideWrapper = styled.div<{ backgroundColor: string }>`
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: ${({ backgroundColor }) => backgroundColor};
  background-size: cover;
  background-position: center;
`;
