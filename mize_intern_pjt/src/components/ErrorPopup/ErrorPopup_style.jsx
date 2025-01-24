import styled from "styled-components";
import { Noto_Sans_KR } from "../../styles/fonts";
import { PALETTE } from "../../styles/colors";

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* 다른 요소 위에 표시 */
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 70%;
  text-align: center;
  font-weight: ${Noto_Sans_KR.regular.weight};
  font-size: 0.95rem;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  z-index: 999; /* 팝업 뒤에 위치 */
`;

export const Button = styled.button`
  background-color: ${PALETTE.SUB_BLACK};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  color: ${PALETTE.MAIN_BLACK};
  font-weight: ${Noto_Sans_KR.regular.weight};
  font-size: 0.95rem;
  font-family: "Noto Sans KR", sans-serif;
`;

export const ButtonText = styled.p``;
