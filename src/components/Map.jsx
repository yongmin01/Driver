import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import data from "../dummy";
import pinA from "../images/pin A.png";
import pinB from "../images/pin B.png";
import pinC from "../images/pin C.png";
import placeImg from "../images/place.png";
import carImg from "../images/car.png";
import routeImg from "../images/route.png";
import passengerImg from "../images/passenger.png";
import { Link, useNavigate } from "react-router-dom";

const { kakao } = window;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 100%;
  height: 33.33vh; /* 화면 하단 1/3까지만 올라오도록 설정 */
  margin-top: 30px;
  padding: 0;
  left: 0;
  text-align: left;
  position: absolute;
  bottom: 0;
  z-index: 10;
`;

const ListEl = styled(Link)`
  display: flex;
  width: 358px;
  height: 54.5px;
  border-bottom: 1px solid grey;
  padding: 18px 65px 18px 23px;
`;
const ListElImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 23px;
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
  // const [bounds, setBounds] = useState(null);

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
          // 상도동 위치
          // const lat = 37.4963538;
          // const lon = 126.9572222;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        inMapData.push([
          placePosition,
          place.name,
          place.category,
          place.id,
          place.address,
        ]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (map === null) return;
    checkInMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // inmapPosition이 변경될 때마다 마커 추가
  useEffect(() => {
    if (markers.current.length > 0) {
      removeMarker();
    }

    if (inMapPosition.length > 0) {
      inMapPosition.forEach((data) => {
        addMarker(data[0], data[1], data[2], data[3]);
      });
      if (searchKeyword !== "") {
        setResultList(true);
      }
    }
  }, [inMapPosition]);

  // 검색
  useEffect(() => {
    if (map === null) return;
    if (!searchKeyword) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${searchKeyword}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, searchKeyword]);

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
  const navigate = useNavigate();

  function addMarker(placePosition, placeName, dataCategory, dataId) {
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
      clickable: true,
    });

    markers.current.push(marker);
    marker.setMap(map);
    // 마커 hover시 마커 위에 표시할 인포윈도우를 생성합니다
    let iwContent = `<div>${placeName}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // iwRemoveable = true;
    // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    // let infowindow = new kakao.maps.InfoWindow({
    //   content: iwContent,
    //   // removable: iwRemoveable,
    // });

    // 마커에 mouseover 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, "mouseover", function () {
    //   // 마커 위에 인포윈도우를 표시합니다
    //   infowindow.open(map, marker);
    // });

    // // 마커에 마우스아웃 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, "mouseout", function () {
    //   // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    //   infowindow.close();
    // });

    // 마커에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      console.log("goto detil!");
      navigate(`/detail/${dataId}`);
    });
  }
  function removeMarker() {
    for (var i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
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
          {/* <ListHeader>{categoryConverter(category)}로 분류한 결과</ListHeader> */}
          {inMapPosition.map((data, index) => (
            <ListEl key={index} to={`/detail/${data[3]}`}>
              <ListElImage src={getElImage(data[2])} />
              <ListElText>
                <ListElTitle>{data[1]}</ListElTitle>
                <ListElAddress>{data[4]}</ListElAddress>
              </ListElText>
            </ListEl>
          ))}
        </ResultList>
      ) : null}
    </>
  );
}
