import { useState, useEffect } from "react";
import { userIdState } from "../../recoil/atoms/userAtom";
import * as Styled from "./Home_style";
import Filter from "./Filter/Filter";
import Devices from "./Devices/Devices";
import axios from "axios";
import { useRecoilValue } from "recoil";

export default function Home() {
  const userId = useRecoilValue(userIdState); // recoil 상태 읽긴
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

  // const apiproxy = "/api/devices"; // API URL 설정
  // const url = import.meta.env.VITE_API_ALL;
  const url = import.meta.env.VITE_API_ALL_MOBILE;

  // 환경에 따라 API URL 설정

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
    }, 5000);

    return () => clearInterval(interval); // 컴포넌트가 사라질 때 interval 제거
  }, [selectedFilter]);

  // useEffect(() => {
  //   fetchDevices(); // 처음에 호출
  // }, []);

  // 필터
  const handleFilterChange = (category, room) => {
    if (category === "Basic") {
      // 필터 선택 해제(모든 데이터 표시)
      setFilteredDevices(allDevices);
      //test
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
    // setSelectedFilter({ category, room });
  };

  return (
    <Styled.HomeWrapper>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <Styled.UserId>
          {userId ? "안녕하세요 {userId}" : "로그인이 필요합니다"}
        </Styled.UserId>
      </Styled.Header>
      <Filter
        roomInfo={roomInfo}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      {/* 로딩 중일 때 로딩 표시 */}
      {loading ? <div>로딩중</div> : <Devices devices={filteredDevices} />}
    </Styled.HomeWrapper>
  );
}
