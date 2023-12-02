import React, { useState } from "react";
import styled from "styled-components";
import data from "../dummy";

const Header_ = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
`;

export default function Header({ setPlace, setCategory, setFilteredData }) {
  const [searchClicked, setSearchClicked] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputCategory, setInputCategory] = useState("all");

  function filter() {
    // 전체인 경우
    if (inputCategory === "all") {
      setFilteredData([...data.places]);
      return;
    }
    // 필터링
    setFilteredData([
      ...data.places.filter((data) => data.category === inputCategory),
    ]);
  }
  return (
    <Header_>
      <i class="fa-solid fa-bars fa-lg" style={{ color: "#5D794C" }}></i>
      <img src="/images/logo.png" />
      {searchClicked ? (
        <form
          className="inputForm"
          onSubmit={(e) => {
            e.preventDefault();
            setPlace(inputText);
            setCategory(inputCategory);
            filter();
          }}
        >
          <select
            onChange={(e) => setInputCategory(e.target.value)}
            name="category"
          >
            <option value="all">ALL</option>
            <option value="place">연습장소</option>
            <option value="passenger">동승자</option>
            <option value="car">렌트 차량</option>
          </select>
          <input
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Search Place..."
          />
        </form>
      ) : null}
      <i
        class="fa-solid fa-magnifying-glass fa-lg"
        onClick={() => {
          setSearchClicked((prev) => !prev);
        }}
        style={{ color: "#5D794C" }}
      ></i>
    </Header_>
  );
}
