import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../components/Map";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <>
      <Header
        setCategory={setCategory}
        setSearchKeyword={setSearchKeyword}
      ></Header>
      <Map category={category} searchKeyword={searchKeyword}></Map>
      <Footer></Footer>
    </>
  );
}
