import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../dummy";
import styled from "styled-components";
import greenLightImg from "../images/greenLight.png";
import placePrev from "../images/placePrev.png";

const DetailBody = styled.div`
  overflow-x: hidden;
`;
const DetailStyled = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px 24px;
`;
const DataStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
`;
const ImageStyled = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: max-content;
`;
const PlaceImg = styled.img`
  width: 132px;
  height: 139px;
  margin-right: 7px;
`;
const PlaceInfo = styled.div`
  margin-top: 16px;
`;
const LightImg = styled.img`
  width: 80px;
  height: 30px;
  margin-right: 14px;
`;
const TotalReviewStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  text-align: center;
  margin-bottom: 16px;
`;
const TotalReviewComment = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  height: 30px;
  align-items: center;
`;
const Review = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-top: 1px solid #5d794c;
`;
const EachReview = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: column;
`;
const ElUser = styled.div`
  display: flex;
  flex-direction: column;
  width: 76px;
  margin-right: 18px;
  align-items: center;
`;
const ReviewEl = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 13px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Comment = styled.div`
  width: 240px;
  height: 38px;
  font-size: 12px;
`;
const Level = styled.div`
  width: 240px;
  height: 20px;
  font-size: 12px;
`;
const UserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 8px;
  border: 0.4px solid #5b8243;
  border-radius: 10px;
  width: 76px;
  height: 20px;
  text-align: center;

  margin-top: 12px;
`;
const DetailPageHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #5b8243;
  padding: 17px 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export default function Detail() {
  let param = useParams();
  console.log(param, "hi");

  return (
    <DetailBody>
      <DetailPageHeader>
        <Link to="/">
          <i
            className="fa-solid fa-chevron-left"
            style={{ color: "#5B8243" }}
          />
        </Link>
        <Link to="/">
          <i className="fa-solid fa-x" style={{ color: "#5B8243" }} />
        </Link>
      </DetailPageHeader>
      <DetailStyled>
        <DataStyled>
          <ImageStyled>
            <PlaceImg src={placePrev} alt="이미지 준비중" />
            <PlaceImg src={placePrev} alt="이미지 준비중" />
            <PlaceImg src={placePrev} alt="이미지 준비중" />
          </ImageStyled>
          <PlaceInfo>
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              {data.places[param.id - 1].name}
            </div>
            <div
              style={{
                fontSize: "14px",
                marginTop: "2px",
                marginBottom: "8px",
              }}
            >
              {data.places[param.id - 1].address}
            </div>
            <i className="fa-solid fa-star" style={{ color: "#FDDC3C" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#FDDC3C" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#FDDC3C" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#FDDC3C" }}></i>
            (4.0)
          </PlaceInfo>
        </DataStyled>
        <Review>
          <TotalReviewStyled>
            <LightImg src={greenLightImg} />
            <TotalReviewComment>
              "52"명이{" "}
              <div style={{ color: "#57BE17", marginLeft: "3px" }}>
                쉬운 코스
              </div>
              라고 평가했어요!
            </TotalReviewComment>
          </TotalReviewStyled>
          <div style={{ fontSize: "14px", fontWeight: 500 }}>리뷰</div>
          <EachReview>
            <ReviewEl>
              <ElUser>
                <i className="fa-solid fa-user"></i>
                <UserName>운전 2년차</UserName>
              </ElUser>
              <Content>
                <Comment>
                  저번주 일요일에 갔다왔는데 나름 잘 하고 왔어요 초보자도
                  운전하기 좋은 코스였습니당!^_^{" "}
                </Comment>
                <Level>
                  쉬운코스 |{" "}
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                </Level>
              </Content>
            </ReviewEl>
            <ReviewEl>
              <ElUser>
                <i class="fa-solid fa-user"></i>
                <UserName>운전 2년차</UserName>
              </ElUser>
              <Content>
                <Comment>
                  저번주 일요일에 갔다왔는데 나름 잘 하고 왔어요 초보자도
                  운전하기 좋은 코스였습니당!^_^{" "}
                </Comment>
                <Level>
                  쉬운코스 |{" "}
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FDDC3C" }}
                  ></i>
                </Level>
              </Content>
            </ReviewEl>
          </EachReview>
        </Review>
      </DetailStyled>
    </DetailBody>
  );
}
