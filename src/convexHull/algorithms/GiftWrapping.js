import { cross } from "../../utils/Orientation";
import AlgorithmStep from "./common/AlgorithmStep";

const X = 0;
const Y = 1;

function GiftWrappingAlgorithm(points, options) {
    let {
        recordSteps = false
    } = options;

    if (points.length < 3) return points;

    // Find the pivot point, which is the point with the lowest y-coordinate
    let pointOnHull = getLeftMostPoint(points);

    // Build the convex hull
    let hull = [];
    let hullSteps = [[]];   
    let endPoint;
    do{
        hull.push(pointOnHull);
        endPoint = points[0];

        for(let i = 0; i < points.length; i++) {
            let hullStep = [];
            if(recordSteps) {
                hullStep.push(new AlgorithmStep([...hull], "currHullPoints"));
                hullStep.push(new AlgorithmStep([pointOnHull, endPoint], "possibleHullPoints"));
                hullStep.push(new AlgorithmStep([endPoint, points[i]], "compareHullPoints"));
                hullSteps.push(hullStep);
            }

            if((endPoint === pointOnHull) || cross(pointOnHull, endPoint, points[i]) > 0) {
                endPoint = points[i];
            }
        }
        pointOnHull = endPoint;
    } while(endPoint !== hull[0]) 

    hull.push(hull[0]);

    if(recordSteps) {
        hullSteps.push([new AlgorithmStep([...hull], "currHullPoints")]);
        return {
                hull: hull, 
                hullSteps: hullSteps
               };
    }
    return hull;
}

function getLeftMostPoint(points) {
    let pivot = points[0];
    for(let i = 1; i < points.length; i++) {
        if(pivot[X] > points[i][X] || pivot[X] == points[i][X] && pivot[Y] < points[i][Y])
            pivot = points[i];
    }
    return pivot
}  

export default GiftWrappingAlgorithm;