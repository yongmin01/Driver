import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../components/Map";
export default function Home() {
  const [category, setCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <div>
      <Header
        setCategory={setCategory}
        setSearchKeyword={setSearchKeyword}
      ></Header>
      <Map category={category} searchKeyword={searchKeyword}></Map>
      <Footer></Footer>
    </div>
  );
}
