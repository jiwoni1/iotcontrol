import React, { useState, useEffect } from "react";
import * as Styled from "./FilterModal_style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function FilterModal({
  roomInfo,
  selectedFilter,
  onFilterChange,
  onClose,
}) {
  const [isClosing, setIsClosing] = useState(false); // 모달창 슬라이드 애니메이션
  const [selectedCategory, setSelectedCategory] = useState(
    selectedFilter.category || null
  ); // 현재 선택된 방 카테고리
  const [selectedRoom, setSelectedRoom] = useState(selectedFilter.room || null); // 현재 선택된 방

  const categoryLabels = {
    BjMAADSYeAEAAAteSQz__w: "회의실",
    BjMAADSYeAEAAAwxNAz__w: "임원실",
    BjMAADSYeAEAAAwlEQz__w: "공용 공간",
  };

  const handleModalClose = () => {
    setIsClosing(true); // 슬라이드 아웃 애니메이션 시작

    // 애니메이션이 완료되면 모달 제거(애니메이션 시간과 동일 0.3초초)
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // 카테고리 선택
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 방 선택
  const handleRoomClick = (room) => {
    const currentCategory = selectedCategory; // 현재 카테고리를 로컬 변수에 저장
    setSelectedRoom(room);
    onFilterChange(currentCategory, room); // 로컬 변수를 사용하여 전달(비동기 고려)
    onClose(); // 모달 닫기
  };
  console.log("선ㅌ택된 방", selectedCategory);

  return (
    <>
      {/* 모달 밖 영역 */}
      <Styled.BlurContainer onClick={handleModalClose} $isClosing={isClosing} />
      <Styled.Wrapper $isClosing={isClosing}>
        <Styled.Header>
          방 선택
          <FontAwesomeIcon icon={faX} onClick={onClose} />
        </Styled.Header>
        <Styled.RoomCategoryContainer>
          <Styled.RoomCategory>
            {/* 카테고리 선택 */}
            {Object.keys(roomInfo).map((category) => (
              <Styled.RoomName
                key={category}
                $isSelected={selectedCategory === category} // 현재 선택된 방인지 확인
                onClick={() => handleCategoryClick(category)} // 선택된 방 업데이트
              >
                {categoryLabels[category] || "기본"}
              </Styled.RoomName>
            ))}
          </Styled.RoomCategory>
          {/* 방 선택 */}
          <Styled.SubRoomCategory>
            {roomInfo[selectedCategory].map((room) => (
              <Styled.SubRoomName
                key={room}
                $isSelected={selectedRoom === room}
                onClick={() => handleRoomClick(room)} // 하위 방 선택
              >
                {/* 좀 하드코딩.. */}
                {room === "1번"
                  ? "1번 소회의실"
                  : room === "2번"
                  ? "2번 소회의실"
                  : room}
              </Styled.SubRoomName>
            ))}
          </Styled.SubRoomCategory>
        </Styled.RoomCategoryContainer>
      </Styled.Wrapper>
    </>
  );
}
