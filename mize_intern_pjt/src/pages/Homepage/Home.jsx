import { useState, useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";
// import { userIdState } from "../../recoil/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Styled from "./Home_style";
import Filter from "./Filter/Filter";
import Devices from "./Devices/Devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import loadinglottie from "../../assets/lottie/loadinglottie.json";
import Lottie from "lottie-react";

export default function Home() {
  const nav = useNavigate();
  const dropdownRef = useRef(null);
  // const userId = useRecoilValue(userIdState); // recoil 상태 읽기
  const [userId, setUserId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // 로그아웃 드롭다운
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [allDevices, setAllDevices] = useState([]); // 전체 디바이스
  const [filteredDevices, setFilteredDevices] = useState([]); // 필터링된 디바이스
  const [selectedFilter, setSelectedFilter] = useState({
    category: "Basic",
    room: "모든 기기",
  }); // 선택된 방 정보

  const title = "마이즈";

  // 카테고리와 방 이름 매핑
  const roomInfo = {
    Basic: ["모든 기기"], // 기본
    BjMAADSYeAEAAAteSQz__w: ["대회의실", "1번", "2번"], // 회의실(1번, 2번이 띄어쓰기로 되어있음; 1번 소회의실, 2번 소회의실)
    BjMAADSYeAEAAAwxNAz__w: [
      "김영훈대표",
      "김영철이사",
      "김혜진이사",
      "박인수본부장",
    ], // 임원실
    BjMAADSYeAEAAAwlEQz__w: [
      "집중실1",
      "집중실2",
      "스낵바",
      "서버실",
      "수면/샤워(남)",
      "수면/샤워(여)",
    ], // 공용 공간
  };

  const url = import.meta.env.VITE_API_GET_DATA;

  // API 요청
  const fetchDevices = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.message;
      console.log("response111", response);
      console.log("data", data);
      setAllDevices([...data]);
      // setFilteredDevices([...data]);
      // filter 테스트
      // 현재 필터 상태에 따라 필터링
      if (selectedFilter.category === "Basic") {
        setFilteredDevices([...data]); // 모든 기기
      } else {
        const filtered = data.filter((device) => {
          const roomName = device.name.split(" ")[0];
          return (
            device.agt === selectedFilter.category &&
            roomName === selectedFilter.room
          );
        });
        setFilteredDevices(filtered); // 필터링된 기기
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  // polling 방식
  useEffect(() => {
    fetchDevices(); // 처음에 호출

    const interval = setInterval(() => {
      fetchDevices(); // 5초마다 다시 호출
    }, 2000);

    return () => clearInterval(interval); // 컴포넌트가 사라질 때 interval 제거
  }, [selectedFilter]);

  // localStorage에서 userId 가져오기
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      try {
        // const parsedUserId = JSON.parse(storedUserId); // JSON 파싱
        // setUserId(parsedUserId);
      } catch (error) {
        console.error("Error parsing userId from localStorage:", error);
        setUserId(storedUserId); // 문자열 그대로 사용
      }
    }
  }, []);

  // 필터
  const handleFilterChange = (category, room) => {
    if (category === "Basic") {
      // 필터 선택 해제(모든 데이터 표시)
      setFilteredDevices(allDevices);
      setSelectedFilter({ category: "Basic", room: "모든 기기" });
      return;
    } else {
      const filtered = allDevices.filter((device) => {
        const roomName = device.name.split(" ")[0]; // name에서 방 이름 추출(띄어쓰기 전까지지)
        return device.agt === category && roomName === room; // 선택된 방과 일치하는 데이터만 필터링
      });
      setFilteredDevices(filtered);
      setSelectedFilter({ category, room });
    }
  };

  // 드롭다운 외부 클릭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // 내부 영역이 아닐 경우 실행
        setDropdownOpen(false);
      }
    };

    // 전역 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 이벤트 리스너 해제
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("userId"); // 사용자 ID 삭제
    nav("/"); // 로그인 페이지로 이동
  };

  // userId
  // console.log(localStorage.getItem("userId"));
  // const userIdTest = JSON.parse(localStorage.getItem("userId"));
  // console.log(userId.userIdTest); // 실제 userId 값 출력

  // 드롭다운 토글
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <Styled.HomeWrapper>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <div ref={dropdownRef}>
          <Styled.UserId onClick={toggleDropdown}>
            {/* {userId ? { userId } : "로그인이 필요합니다"} */}
            {dropdownOpen ? (
              <FontAwesomeIcon icon={faChevronUp} size="xs" color="black" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} size="xs" color="black" />
            )}
          </Styled.UserId>
          {/* 드롭다운 */}
          {dropdownOpen && (
            <Styled.DropdownMenu>
              <Styled.DropdownItem onClick={handleLogout}>
                로그아웃
              </Styled.DropdownItem>
            </Styled.DropdownMenu>
          )}
        </div>
      </Styled.Header>
      <Filter
        roomInfo={roomInfo}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      {/* 로딩 중일 때 로딩 표시 */}
      {loading ? (
        <Styled.LottieContainer>
          <Lottie animationData={loadinglottie} />
        </Styled.LottieContainer>
      ) : (
        <Devices devices={filteredDevices} />
      )}
    </Styled.HomeWrapper>
  );
}
