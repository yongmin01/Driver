import React, { useState } from "react";
import MapContainer from "./MapContainer";

export default function SearchPlace({ currentCategory, currentPlace }) {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("all");

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };
  console.log(place);
  console.log(category);
  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <select name="category" onChange={handleCategory}>
          <option value="all">ALL</option>
          <option value="place">연습장소</option>
          <option value="passenger">동승자</option>
          <option value="car">렌트 차량</option>
        </select>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      {/* <MapContainer settedCateogory={category} placeName={place} /> */}
    </>
  );
}
