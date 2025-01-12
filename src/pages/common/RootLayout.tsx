import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import { COLOR } from "../../styles/color";


export default function RootLayout() {
  const location = useLocation();

  // 경로에 따라 배경 이미지 선택


  let backgroundColor;
  if (["/emailcheck", "/search", "/setting", "/seetoppinglist"].includes(location.pathname)) {
    backgroundColor = COLOR.SERVE;
  } else {
    backgroundColor= COLOR.PRIMARY;
  }

  return (
    <Wrapper>
      <InsideWrapper backgroundColor={backgroundColor}>
        <Outlet />
      </InsideWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
