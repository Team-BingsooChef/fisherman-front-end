import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { COLOR } from "../../styles/color";

export default function RootLayout() {
  const location = useLocation();

  const background = [
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
      <InsideWrapper backgroundColor={background}>
        <Outlet />
      </InsideWrapper>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-size: cover;
  background-position: center;
  overflow-y: scroll;
`;
