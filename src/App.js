import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConvexHullView from "./convexHull/ConvexHullView";
import Circle from "./convexHull/Circle";
import ConvexHullComponent from "./convexHull/ConvexHullComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConvexHullView />}>
          <Route index element={<ConvexHullView/>} />
          <Route path="sweepline" element={<Circle/>} />
          <Route path="artgalleryproblem" element={<ConvexHullComponent/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
