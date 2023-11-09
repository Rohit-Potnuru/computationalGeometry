import ConvexHullView from "./convexHull/ConvexHullView";
import SweepLineView from "./sweepLine/SweepLineView";

const ROUTE_COMPUTATION_GEOMETRY = {
    "convexhull" :  {
                        "component" : <ConvexHullView />,
                        "name" : "Convex Hull"
                    },
    "sweepline" :  {
                        "component" : <SweepLineView />,
                        "name" : "Sweep Line"
                    },
}

export default ROUTE_COMPUTATION_GEOMETRY;