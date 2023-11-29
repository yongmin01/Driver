import React, { useState, useEffect } from "react";
import { data } from "../dummy";

// 컴포넌트 분리 실패..
// import MapContainer from "../components/MapContainer";
// import SearchPlace from "../components/SearchPlace";

const { kakao } = window;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [inputCategory, setInputCategory] = useState();
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${place}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
      }
    });

    filteredData.forEach((placeData) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(
          placeData.places.coords[0],
          placeData.places.coords[1]
        ),
      });
      marker.setMap(map);
    });
  }, [place]);

  function filter() {
    if (category == "place" && place == "상도동") {
      setFilteredData(data.places.filter((data) => data.category == "place"));
      console.log(filteredData);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(e.target[1].value);
    setCategory(e.target[0].value);
    filter();
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <select name="category">
          <option value="all">ALL</option>
          <option value="place">연습장소</option>
          <option value="passenger">동승자</option>
          <option value="car">렌트 차량</option>
        </select>
        <input placeholder="Search Place..." />
        <button type="submit">검색</button>
      </form>
      <div
        id="myMap"
        style={{
          width: "100vw",
          height: "600px",
        }}
      ></div>
    </>
  );
}
