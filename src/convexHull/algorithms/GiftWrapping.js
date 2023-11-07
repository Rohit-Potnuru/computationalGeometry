import { DrawPoints2D } from "../../shapes/point2D";
import DrawHull from "../draw/DrawHull";
import { cross } from "../../utils/Orientation";
import { clearCanvas } from "../draw/canvas";

const X = 0;
const Y = 1;

async function GiftWrappingAlgorithm(ctx, canvas, points, options) {

    let {
        colors = ['yellow', 'red'],
        speed = -1
    } = options;

    if (points.length < 3) return points;
    let pN = points.length;
    if(speed === -1)
        speed = pN < 200? pN < 50? 40:5 : 0;

    // Find the pivot point, which is the point with the lowest y-coordinate
    let pointOnHull = getLeftmostPoint(points);

    // Build the convex hull
    let hull = [];
    let endPoint = points[0];
    do{
        hull.push(pointOnHull);
        endPoint = points[0];

        for(let j = 0; j < pN; j++) {
            await DrawFrame(ctx, canvas, points, hull, colors, speed);
            DrawHull(ctx, [pointOnHull, points[j]], {...options, strokeStyle : colors[0]});

            if((endPoint === pointOnHull) || cross(pointOnHull, endPoint, points[j]) > 0) {
                endPoint = points[j];
            }
        }
        pointOnHull = endPoint;

        await DrawFrame(ctx, canvas, points, hull, options);
    } while(endPoint !== hull[0]) 
    hull.push(hull[0]);
    return hull;
}

async function DrawFrame(ctx, canvas, points, hull, options) {
    let {
        colors = ['yellow', 'red'],
        speed = -1
    } = options;

    await new Promise(resolve => setTimeout(resolve, speed));
    clearCanvas(ctx, canvas);
    DrawPoints2D(ctx, points);
    DrawHull(ctx, hull, { strokeStyle : colors[1]});
}

function getLeftmostPoint(points) {
    let pivot = points[0];
    for(let i = 1; i < points.length; i++) {
        if(pivot[X] > points[i][X] || pivot[X] == points[i][X] && pivot[Y] < points[i][Y])
            pivot = points[i];
    }
    return pivot
}  

export default GiftWrappingAlgorithm;