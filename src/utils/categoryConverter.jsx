const categoryConverter = (category) => {
  switch (category) {
    case "all":
      return "전체";
    case "place":
      return "연습 장소";
    case "passenger":
      return "동승자";
    case "car":
      return "렌트 차량";
    default:
      break;
  }
};

export default categoryConverter;
