import styled from "styled-components";
import { Noto_Sans_KR } from "../../styles/fonts";
import { PALETTE } from "../../styles/colors";

export const HomeWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh; // 일단 보류
  padding: 7% 5%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10%;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: ${Noto_Sans_KR.bold.weight};
  color: ${PALETTE.MAIN_BLACK};
`;

export const UserId = styled.div`
  font-size: 0.9rem;
  font-weight: ${Noto_Sans_KR.medium.weight};
  color: ${PALETTE.MAIN_BLACK};
  margin: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LottieContainer = styled.div`
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 60px; // UserId 아래로 띄우기
  right: 10px; // 우측 정렬
  /* background-color: white; */
  border: 1px solid ${PALETTE.SUB_BLACK};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 8px 13px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  font-size: 0.8rem;
  font-weight: ${Noto_Sans_KR.medium.weight};
  color: ${PALETTE.MAIN_BLACK};
`;
