import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConvexHullView from "./convexHull/ConvexHullView";
import ComputationalGeometry from "./ComputationalGeometryView";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/computationalGeometry" element={<Layout />}>
          <Route index element={<ComputationalGeometry />} />
          <Route path="convexhull" element={<ConvexHullView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
