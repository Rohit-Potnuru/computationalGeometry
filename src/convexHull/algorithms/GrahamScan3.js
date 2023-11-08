import { cross } from "../../utils/Orientation";
import AlgorithmStep from "./common/AlgorithmStep";

const X = 0;
const Y = 1;

function GrahamScanAlgorithm3(points, options) {

    let {
        recordSteps = false
    } = options;

    if (points.length < 3) return points;

    // Find the pivot point, which is the point with the lowest y-coordinate
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    const pivot = getLeftMostPoint(points);
    points.sort((a, b) => cross(a, pivot, b));

    let hull = [pivot], temp;
    let hullSteps = [[]];   

    for(let i = 1; i < points.length; i++) {
        let hullStep = [];
        let removedPoints = [];
        while (hull.length >= 2 && 
            cross(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
            removedPoints.push(hull.pop());
        }

        if(recordSteps) {
            hullStep.push(new AlgorithmStep([...hull], "currHullPoints"));
            hullStep.push(new AlgorithmStep([hull[hull.length - 1], points[i]], "possibleHullPoints"));
            hullStep.push(new AlgorithmStep([...removedPoints, hull[hull.length - 1]], "removedHullPoints"));
            hullSteps.push(hullStep);
        }

        hull.push(points[i]);
    }
    hull.push(pivot);

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

export default GrahamScanAlgorithm3;