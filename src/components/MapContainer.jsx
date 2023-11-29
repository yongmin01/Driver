import React, { useState, useEffect } from "react";

const { kakao } = window;

export default function MapContainer({ placeName }) {
  const [targetPlace, setTargetPlace] = useState();
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setTargetPlace({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    geocoder.addressSearch(`${placeName}`, callback);

    // const ps = new kakao.maps.services.Places();

    // ps.keywordSearch(placeName, placesSearchCB);

    // function placesSearchCB(data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     let bounds = new kakao.maps.LatLngBounds();

    //     for (let i = 0; i < data.length; i++) {
    //       displayMarker(data[i]);
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }

    //     map.setBounds(bounds);
    //   }
    // }

    // function displayMarker(place) {
    //   let marker = new kakao.maps.Marker({
    //     map: map,
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });
    // }
  }, [placeName]);

  return (
    <div
      id="myMap"
      style={{
        width: "400px",
        height: "300px",
      }}
    ></div>
  );
}
