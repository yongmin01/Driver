import { React, useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import data from "../dummy";
import pinA from "../images/pin A.png";
import pinB from "../images/pin B.png";
import pinC from "../images/pin C.png";
import placeImg from "../images/place.png";
import carImg from "../images/car.png";
import passenger from "../images/passenger.png";
import categoryConverter from "../utils/categoryConverter";

const { kakao } = window;

const ResultList = styled.div`
  background: #fff;
  width: 100%;
  height: 33.33vh; /* 화면 하단 1/3까지만 올라오도록 설정 */
  margin: 0;
  padding: 0;
  left: 0;
  text-align: left;
  position: absolute;
  bottom: 0;
  z-index: 10;
`;

const ListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const ListEl = styled.div`
  display: flex;
  border-bottom: 5px solid grey;
  padding: 5px;
`;
const ListElImage = styled.img`
  margin: 3px;
`;

const ListElText = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListElTitle = styled.div`
  font-size: 14px;
  color: #333333;
`;
const ListElAddress = styled.div`
  font-size: 10px;
  color: #333333;
`;
export default function Map({ category, searchKeyword }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const kakaoMapRef = useRef(null); // 지도를 담을 공간 생성
  const [resultList, setResultList] = useState(false);
  const [inMapPosition, setInMapPosition] = useState([]);

  // 초기 지도 중심 설정
  useEffect(() => {
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
    const container = kakaoMapRef.current; // 지도
    const initMap = (lat, lon) => {
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 7,
      };
      const kakaoMap = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      setMap(kakaoMap); // 화면에 지도 표시
      // checkInMap();
      // inMapPosition.forEach((data) => {
      //   addMarker([data[0], data[1], data[2]]);
      // });
    };
  }, []);

  // 화면상 지도에 데이터가 포함되는지 확인
  function checkInMap() {
    const bounds = new kakao.maps.LatLngBounds();
    console.log("bounds : ", bounds);
    const inMapData = [];
    data.places.forEach((place) => {
      const placePosition = new kakao.maps.LatLng(
        place.coords[0],
        place.coords[1]
      );
      if (map.getBounds().contain(placePosition)) {
        inMapData.push([placePosition, place.name, place.category]);
        console.log("data pushed!");
      }
    });
    console.log("inMapData : ", inMapData);
    setInMapPosition(inMapData);
  }

  useEffect(() => {
    if (inMapPosition.length > 0) {
      console.log("inmap", inMapPosition);
      inMapPosition.forEach((data) => {
        addMarker([data[0], data[1], data[2]]);
      });
    }
    setResultList(true);
  }, [inMapPosition]);
  // 검색
  useEffect(() => {
    if (map === null) return;
    if (!searchKeyword) return;
    setResultList(true); // 모달창 띄우기
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${searchKeyword}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);

        console.log("검색 후 맵 : ", map);
      }
      // const bounds = new kakao.maps.LatLngBounds();
      // console.log("bounds : ", bounds);
      // const inMapData = [];
      // data.places.forEach((place) => {
      //   const placePosition = new kakao.maps.LatLng(
      //     place.coords[0],
      //     place.coords[1]
      //   );
      //   if (map.getBounds().contain(placePosition)) {
      //     inMapData.push([placePosition, place.name, place.category]);
      //     console.log("data pushed!");
      //   }
      // });
      // console.log("inMapData : ", inMapData);
      // setInMapPosition(inMapData);
    });
    checkInMap();
  }, [map, searchKeyword]);

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  useEffect(() => {
    console.log(category, "inMapPositionChanged! :", inMapPosition);
    // 기존에 표시되고 있는 마커를 제거합니다
    removeMarker();
    // 영역을 재설정하기 위해 LatLngBounds 객체를 생성합니다
    const bounds = new kakao.maps.LatLngBounds();

    // 필터된 마커를 표시합니다
    function filter() {
      let filterdData = [];
      // 전체인 경우
      if (category === "all") {
        filterdData = [...inMapPosition];
        return filterdData;
      } else if (category === "place") {
        filterdData = inMapPosition.filter((data) => data.category === "place");
        // filterdData = [...data];
        return filterdData;
      } else if (category === "route") {
        filterdData = inMapPosition.filter((data) => data.category === "route");
        // filterdData = [...data];
        return filterdData;
      } else if (category === "passenger") {
        filterdData = inMapPosition.filter(
          (data) => data.category === "passenger"
        );
        // filterdData = [...data];
        return filterdData;
      } else if (category === "car") {
        filterdData = inMapPosition.filter((data) => data.category === "car");
        // filterdData = [...data];
        return filterdData;
      }
    }
    console.log("필터링 후 데이터 : ", inMapPosition);
    filter().forEach((place) => {
      addMarker(place[0], place[1], place[2]);
    });

    // 검색 결과 기준으로 지도 범위를 재설정합니다
    if (!bounds.isEmpty() && map !== null) {
      // && map !== null 조건 확인하기
      console.log("bounds: ", bounds);
      console.log("map : ", map);
      console.log("AAAAAA");
      map.setBounds(bounds);
    }
  }, [category]);

  function getMarkerImageURL(category) {
    switch (category) {
      case "place":
        return pinA;
      case "route":
        return pinB;
      case "passenger":
        return pinB;
      case "car":
        return pinC;
      default:
        return "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    }
  }
  function addMarker(placePosition, placeName, dataCategory) {
    console.log("지도 : ", map);
    // 마커 이미지를 생성합니다
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImageURL = getMarkerImageURL(dataCategory); // 카테고리에 따른 이미지 URL 가져오기
    const markerImage = new kakao.maps.MarkerImage(markerImageURL, imageSize);

    console.log("Creating Markers");
    if (map === null) {
      console.log("!");
      return;
    }
    let marker = new kakao.maps.Marker({
      map,
      position: placePosition,
      markerImage,
      title: placeName + dataCategory,
    });

    setMarkers([...markers, marker]);
    marker.setMap(map);
    console.log("marker:", marker);

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
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  }
  return (
    <>
      <div
        ref={kakaoMapRef}
        style={{
          width: "100vw",
          height: "704px",
        }}
        onClick={() => {
          setResultList(false);
        }}
      ></div>
      {resultList ? (
        <ResultList>
          <ListHeader>{categoryConverter(category)}로 분류한 결과</ListHeader>
          {inMapPosition.forEach((data) => {
            if (data.category === category) {
              {
                console.log("kkk");
              }
              <ListEl key={data.id}>
                <img src={`{category}Img`} />
                {data.name}
              </ListEl>;
            }
          })}
          <ListEl>
            <ListElImage src={placeImg} />
            <ListElText>
              <ListElTitle>노들섬</ListElTitle>
              <ListElAddress>주소</ListElAddress>
            </ListElText>
          </ListEl>
        </ResultList>
      ) : null}
    </>
  );
}
