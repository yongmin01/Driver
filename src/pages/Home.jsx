import React, { useState, useEffect } from "react";
import data from "../dummy.js";
import categoryConverter from "../utils/categoryConverter";

const { kakao } = window;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [inputCategory, setInputCategory] = useState();
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const kakaoMapRef = React.useRef(null); // 지도를 담을 공간 생성

  useEffect(() => {
    const container = kakaoMapRef.current; // 지도
    // 초기값 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          initMap(lat, lon);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // 기본 위치로 초기화
          initMap(33.450701, 126.570667);
        }
      );
    } else {
      // 기본 위치로 초기화
      initMap(33.450701, 126.570667);
    }

    const initMap = (lat, lon) => {
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      setMap(kakaoMap); // 화면에 지도 표시
    };
  }, []);

  // 검색
  useEffect(() => {
    if (map === null) return;
    if (!place) return;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${place}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
      }
    });
  }, [map, place]);

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  useEffect(() => {
    // 기존에 표시되고 있는 마커를 제거합니다
    removeMarker();
    // 영역을 재설정하기 위해 LatLngBounds 객체를 생성합니다
    const bounds = new kakao.maps.LatLngBounds();
    // 필터된 마커를 표시합니다
    filteredData.forEach((placeData) => {
      // 위치 구하기
      const placePosition = new kakao.maps.LatLng(
        placeData.coords[0],
        placeData.coords[1]
      );

      // 마커 추가
      addMarker(placePosition, placeData.name);
      // 영역 추가
      bounds.extend(placePosition);
    });

    // 검색 결과 기준으로 지도 범위를 재설정합니다
    if (!bounds.isEmpty()) {
      map.setBounds(bounds);
    }
  }, [filteredData, map]);

  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  }

  function addMarker(placePosition, placeName) {
    // 마커 이미지를 생성합니다
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    let marker = new kakao.maps.Marker({
      map,
      position: placePosition,
      image: markerImage,
      title: placeName,
    });

    setMarkers([...markers, marker]);
    marker.setMap(map);

    // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
    var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    // 마커에 마우스오버 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
      var content =
        '<div style="padding:10px;z-index:1;">' + marker.Gb + "</div>";
      infowindow.setContent(content);
      infowindow.open(map, marker);
    });

    // 마커에 마우스아웃 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseout", function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infowindow.close();
    });
  }

  // 필터 기능
  function filter() {
    // 전체인 경우
    if (category === "all") {
      setFilteredData([...data.places]);
      return;
    }
    // 필터링
    setFilteredData([
      ...data.places.filter((data) => data.category === category),
    ]);
  }

  return (
    <>
      <form
        className="inputForm"
        onSubmit={(e) => {
          e.preventDefault();
          filter();
        }}
      >
        <select onChange={(e) => setCategory(e.target.value)} name="category">
          <option value="all">ALL</option>
          <option value="place">연습장소</option>
          <option value="passenger">동승자</option>
          <option value="car">렌트 차량</option>
        </select>
        <input
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Search Place..."
        />
        <button type="submit">검색</button>
      </form>
      <div
        ref={kakaoMapRef}
        style={{
          width: "100vw",
          height: "600px",
        }}
      ></div>
      <div>
        <div>{categoryConverter(category)}로 분류한 결과</div>
        {filteredData.map((data) => (
          <div key={data.id}>{data.name}</div>
        ))}
      </div>
    </>
  );
}
