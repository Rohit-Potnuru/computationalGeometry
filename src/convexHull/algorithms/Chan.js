import { DrawPoints2D } from "../draw/DrawPoints2D";
import DrawHull from "../draw/DrawHull";
import { cross } from "../../utils/Orientation";
import { clearCanvas } from "../draw/Canvas";
import GrahamScanAlgorithm from "./GrahamScan";

const X = 0;
const Y = 1;

async function ChanAlgorithm(ctx, canvas, points, options) {

    const {
        colors = ['yellow', 'red'],
        speed = -1,
        mValue = 3
    } = options;

    if (points.length < 3) return null;
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let n = points.length;
    let m = mValue;
    let K = Math.ceil(n/m);
    console.log(n, K);

    //Grouping m points into K subsets
    let Q = [];
    for(let i = 0; i < K; i++) {
        Q.push(points.slice(i * m, Math.min(n, (i + 1) * m)));
    }
    console.log("Generate Grouping");
    console.log(Q);
    let C = [];
    for(let i = 0; i < K; i++) {
        let Ci = await GrahamScanAlgorithm(ctx, canvas, Q[i], {speed : 0});
        C.push(Ci);
    }
    console.log("Convex Hull generated for each subset");
    console.log(C);

    clearCanvas(ctx, canvas);
    DrawPoints2D(ctx, points);
    DrawHulls(ctx, canvas, C, colors);

    let pointOnHull = getLeftmostPoint(points);
    console.log("Left Most Point", pointOnHull);
    let hull = [];
    let i = 0;
    let endPoint = pointOnHull;

    do{
        hull[i] = pointOnHull;
        endPoint = getminPointHull(C[0], pointOnHull);

        for(let j = 0; j < C.length; j++) {
            let CendPoint = getminPointHull(C[j], pointOnHull);
            await DrawFrame(ctx, canvas, points, hull, {...options, C:C});
            DrawHull(ctx, [hull[i], CendPoint], { strokeStyle : colors[0]});
            if((endPoint === pointOnHull) || cross(hull[i], endPoint, CendPoint) > 0) {
                endPoint = CendPoint;
            }
        }
        i++;
        pointOnHull = endPoint;

        await DrawFrame(ctx, canvas, points, hull, {...options, C:C});
        DrawHull(ctx, hull, { strokeStyle : colors[1]});
    } while(endPoint !== hull[0] && i <= m) 
    if(endPoint === hull[0])
        hull.push(hull[0]);
    return hull;
}

async function DrawFrame(ctx, canvas, points, hull, options) {
    let {
        colors = ['yellow', 'red'],
        speed = -1,
        C = []
    } = options;

    await new Promise(resolve => setTimeout(resolve, speed));
    clearCanvas(ctx, canvas);
    DrawPoints2D(ctx, points);
    DrawHull(ctx, hull, { strokeStyle : colors[1]});
    DrawHulls(ctx, canvas, C, colors);
}

function getminPointHull(hull, point) {
    let  pointOnHull = point;
    let endPoint = hull[0];
    for(let j = 0; j < hull.length; j++) {
        if((endPoint === pointOnHull) || cross(pointOnHull, endPoint, hull[j]) > 0) {
            endPoint = hull[j];
        }
    }
    return endPoint;
}

function getLeftmostPoint(points) {
    let pivot = points[0];
    for(let i = 1; i < points.length; i++) {
        if(pivot[X] > points[i][X] || pivot[X] == points[i][X] && pivot[Y] < points[i][Y])
            pivot = points[i];
    }
    return pivot
}  

function DrawHulls(ctx, canvas, hulls, colors) {
    for(let i = 0; i < hulls.length; i++) {
        DrawHull(ctx, hulls[i], { strokeStyle : getRandomColor()});
    }
}

function getRandomColor() {
    let color = '#'+Math.floor(Math.random()*16777215).toString(16);
    // Ensure generated color is not red or shades close to red
    while(color.startsWith('#ff')) {
        color = '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    return color;
}
 
export default ChanAlgorithm;