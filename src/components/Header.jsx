import React, { useState } from "react";
import styled from "styled-components";
import data from "../dummy";
import logo from "../images/logo.png";
const Header_ = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
`;
const HeaderInput = styled.input`
  width: 280px;
  height: 44px;
  background-color: #f4f8f2;
`;

export default function Header({ setCategory, setSearchKeyword }) {
  const [searchClicked, setSearchClicked] = useState(false);
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setSearchKeyword(e.target.value);
    }
  };
  return (
    <Header_>
      {searchClicked ? (
        <>
          <select onChange={(e) => setCategory(e.target.value)} name="category">
            <option value="all">ALL</option>
            <option value="place">연습장소</option>
            <option value="passenger">동승자</option>
            <option value="car">렌트 차량</option>
          </select>
          <HeaderInput placeholder="Search Place..." onKeyDown={handleSubmit} />
          <i
            className="fa-solid fa-x"
            onClick={(e) => setSearchClicked(false)}
          ></i>
        </>
      ) : (
        <>
          <i
            className="fa-solid fa-bars fa-lg"
            style={{ color: "#5D794C" }}
          ></i>
          <img src={logo} alt="driver logo" />
          <i
            className="fa-solid fa-magnifying-glass fa-lg"
            onClick={() => {
              setSearchClicked((prev) => !prev);
            }}
            style={{ color: "#5D794C" }}
          ></i>{" "}
        </>
      )}
    </Header_>
  );
}
