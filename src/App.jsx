import "./App.css";
import "./css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Home, Header, ComicDetail, ListComic, ComicCategory, Search, Footer } from "./components/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <Header/>
    <a href="#" className={'go-top'}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 1 11 c 0 -0.265625 0.105469 -0.519531 0.292969 -0.707031 l 6 -6 c 0.390625 -0.390625 1.023437 -0.390625 1.414062 0 l 6 6 c 0.1875 0.1875 0.292969 0.441406 0.292969 0.707031 s -0.105469 0.519531 -0.292969 0.707031 c -0.390625 0.390625 -1.023437 0.390625 -1.414062 0 l -5.292969 -5.292969 l -5.292969 5.292969 c -0.390625 0.390625 -1.023437 0.390625 -1.414062 0 c -0.1875 -0.1875 -0.292969 -0.441406 -0.292969 -0.707031 z m 0 0" fill="#2e3436"></path> </g></svg></a>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/details/:slug" element={<ComicDetail/>}></Route>
      <Route path="/list/:slug" element={<ListComic/>}></Route>
      <Route path="/category/:slug" element={<ComicCategory/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
    </Routes>
    <Footer/>
  </BrowserRouter>;
}

export default App;
