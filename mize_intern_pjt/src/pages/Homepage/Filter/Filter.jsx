import { useRef, useState, useEffect } from "react";
import * as Styled from "./Filter_style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { PALETTE } from "@/styles/colors";
import FilterModal from "../../../components/FilterModal/FilterModal";

export default function Filter({ selectedFilter, roomInfo, onFilterChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 선택된 item로 자동 스크롤
  const selectedRoomRef = useRef(null);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  // 다른 하위 방 클릭시 실행될 함수(selected 바꾸기)
  const handleRoomClick = (room) => {
    onFilterChange(selectedFilter.category, room);
  };

  // 선택된 항목으로 스크롤 이동
  useEffect(() => {
    if (selectedRoomRef.current) {
      selectedRoomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedFilter.room]);

  return (
    <Styled.Wrapper>
      <Styled.SubRoomList>
        {roomInfo[selectedFilter.category].map((room) => {
          return (
            <Styled.SubRoomItem
              key={room}
              $isSelected={selectedFilter.room === room} // 선택된 하위 방 표시
              onClick={() => handleRoomClick(room)}
              ref={selectedFilter.room === room ? selectedRoomRef : null} // 스크롤 이동
            >
              {room === "1번"
                ? "1번 소회의실"
                : room === "2번"
                ? "2번 소회의실"
                : room}
            </Styled.SubRoomItem>
          );
        })}
      </Styled.SubRoomList>
      <FontAwesomeIcon
        onClick={onOpenModal}
        icon={faBars}
        color={PALETTE.MAIN_BLACK}
        size="sm"
      />

      {/* FilterModal컴포넌트에 onClose props 전달 */}
      {isModalOpen && (
        <FilterModal
          roomInfo={roomInfo}
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
          onClose={onCloseModal}
        />
      )}
    </Styled.Wrapper>
  );
}
