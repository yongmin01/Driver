import { React } from "react";
import styled from "styled-components";

const Footer_ = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 80px;
`;
const FooterCurrent_ = styled.div`
  background-color: #f4f8f2;
  width: 130px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Footer() {
  return (
    <Footer_>
      <i className="fa-solid fa-globe fa-lg" style={{ color: "#5D794C" }}></i>
      <FooterCurrent_>
        <i className="fa-solid fa-house fa-lg"></i>
      </FooterCurrent_>
      <i className="fa-solid fa-user fa-lg" style={{ color: "#5D794C" }}></i>
    </Footer_>
  );
}
