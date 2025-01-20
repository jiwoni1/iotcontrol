import { useState, useEffect } from "react";
import * as Styled from "./Home_style";
import Filter from "./Filter/Filter";
import Devices from "./Devices/Devices";
import axios from "axios";

export default function Home() {
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
    BjMAADSYeAEAAAteSQz__w: ["대회의실", "1번", "2번"], // 회의실(1번, 2번이 띄어쓰기로 되어있음 ㅠㅠ 1번 소회의실, 2번 소회의실)
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
  const api = "https://localhost:3002/api";
  const apimobile = "https://192.168.0.90:3002/api";

  // 환경에 따라 API URL 설정
  const apiproxy = import.meta.env.VITE_API_URL;

  // API 요청
  const fetchDevices = async () => {
    try {
      const response = await axios.get(apimobile);
      const data = response.data;
      console.log("response111", response);
      console.log("data", data);
      setAllDevices(data);
      setFilteredDevices(data);
      console.log("allDevices", allDevices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // // API 연결 전 테스트
  // useEffect(() => {
  //   setAllDevices(data);
  //   setFilteredDevices(data);
  //   setLoading(false);
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
        const roomName = device.message.name.split(" ")[0]; // name에서 방 이름 추출(띄어쓰기 전까지지)
        return device.message.agt === category && roomName === room; // 선택된 방과 일치하는 데이터만 필터링
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
      </Styled.Header>
      <Filter
        roomInfo={roomInfo}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      {/* 로딩 중일 때 로딩 표시 */}
      {loading ? <div>로딩중</div> : <Devices devices={filteredDevices} />}
      {/* <Devices devices={filteredDevices} /> */}
    </Styled.HomeWrapper>
  );
}
