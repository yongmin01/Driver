import { React, useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import data from "../dummy";
import pinA from "../images/pin A.png";
import pinB from "../images/pin B.png";
import pinC from "../images/pin C.png";
import placeImg from "../images/place.png";
import carImg from "../images/car.png";
import routeImg from "../images/route.png";
import passengerImg from "../images/passenger.png";
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
  padding: 18px 65px 18px 39px;
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
  const markers = useRef([]);
  const kakaoMapRef = useRef(null); // 지도를 담을 공간 생성
  const [resultList, setResultList] = useState(false);
  const [inMapPosition, setInMapPosition] = useState([]);
  const [bounds, setBounds] = useState(null);

  const initMap = (lat, lon) => {
    const container = kakaoMapRef.current; // 지도
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 5,
    };
    const kakaoMap = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    setMap(kakaoMap); // 화면에 지도 표시

    const bounds = new kakao.maps.LatLngBounds();
    setBounds(bounds);
    if (map === null) {
      return;
    } else {
      checkInMap();
    }
  };

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
  }, []);

  // 화면상 지도에 데이터가 포함되는지 확인
  function checkInMap() {
    const inMapData = [];
    data.places.forEach((place) => {
      const placePosition = new kakao.maps.LatLng(
        place.coords[0],
        place.coords[1]
      );
      if (
        map.getBounds().contain(placePosition) &&
        (place.category === category || category === "all")
      ) {
        inMapData.push([placePosition, place.name, place.category]);
      }
    });
    setInMapPosition([...inMapData]);
  }

  useEffect(() => {
    if (map === null) return;
    checkInMap();

    kakao.maps.event.addListener(map, "bounds_changed", function () {
      checkInMap();
    });
    return () => {
      kakao.maps.event.removeListener(map, "bounds_changed", function () {
        checkInMap();
      });
    };
  }, [map]);

  useEffect(() => {
    if (map === null) return;
    checkInMap();
  }, [category]);

  // inmapPosition이 변경될 때마다 마커 추가
  useEffect(() => {
    if (markers.current.length > 0) {
      removeMarker();
    }

    console.log("inMapData : ", inMapPosition, markers.current);
    if (inMapPosition.length > 0) {
      console.log("inmap", inMapPosition);
      inMapPosition.forEach((data) => {
        addMarker(data[0], data[1], data[2]);
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
      }
    });
  }, [map, searchKeyword]);

  // const imageSrc =
  //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

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
  function getElImage(category) {
    switch (category) {
      case "place":
        return placeImg;
      case "passenger":
        return passengerImg;
      case "car":
        return carImg;
      case "route":
        return routeImg;
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

    if (map === null) {
      return;
    }

    const marker = new kakao.maps.Marker({
      map,
      position: placePosition,
      image: markerImage,
      title: placeName + dataCategory,
    });

    markers.current.push(marker);
    marker.setMap(map);
  }
  function removeMarker() {
    for (var i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
      console.log("remove");
    }
    markers.current = [];
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
          {inMapPosition.map((data, index) => (
            <ListEl key={index}>
              <ListElImage src={getElImage(data[2])} />
              <ListElText>
                <ListElTitle>{data[1]}</ListElTitle>
                <ListElAddress>{data[2]}</ListElAddress>
              </ListElText>
            </ListEl>
          ))}
        </ResultList>
      ) : null}
    </>
  );
}
