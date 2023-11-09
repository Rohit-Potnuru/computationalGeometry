import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComputationalGeometry from "./ComputationalGeometryView";
import Layout from "./Layout";
import ROUTE_COMPUTATION_GEOMETRY from "./RouteComputationGeometry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/computationalGeometry" element={<Layout />}>
          <Route index element={<ComputationalGeometry />} />
          
          {Object.keys(ROUTE_COMPUTATION_GEOMETRY).map((key) => (
            <Route 
              key={key} 
              path={key} 
              element={ROUTE_COMPUTATION_GEOMETRY[key]["component"]} 
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
