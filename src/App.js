import { React, useState, useEffect } from "react";
import GlobalStyle from "./GlobalStyle";
import Home from "./pages/Home";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
function App() {
  const searchFin = atom({
    key: "searchFin", // unique ID (with respect to other atoms/selectors)
    default: "false", // default value (aka initial value)
  });
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Home />
    </RecoilRoot>
  );
}

export default App;
