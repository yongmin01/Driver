import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../components/Map";
export default function Home() {
  const [targetPlace, setTargetPlace] = useState(null);
  const [targetCategory, setTargetCategory] = useState("all");
  const [targetData, setTargetData] = useState([]);
  console.log(targetPlace, targetCategory, targetData);
  return (
    <div>
      <Header
        setPlace={setTargetPlace}
        setCategory={setTargetCategory}
        setFilteredData={setTargetData}
      ></Header>
      <Map
        place={targetPlace}
        category={targetCategory}
        data={targetData}
      ></Map>
      <Footer></Footer>
    </div>
  );
}
