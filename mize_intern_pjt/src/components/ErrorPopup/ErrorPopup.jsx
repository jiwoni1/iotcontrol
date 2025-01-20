import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
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
  min-width: 300px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  z-index: 999; /* 팝업 뒤에 위치 */
`;

export default function ErrorPopup({ message, onClose }) {
  return (
    <>
      {/* 화면을 어둡게 하는 오버레이 */}
      <Overlay onClick={onClose} />
      {/* 팝업 컨테이너 */}
      <PopupContainer>
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </PopupContainer>
    </>
  );
}
