import { DrawPoints2D } from "../../shapes/point2D";
import { cross } from "../../utils/Orientation";
import DrawHull from "../draw/DrawHull";
import { clearCanvas } from "../draw/canvas";

async function GrahamScanAlgorithm2(ctx, canvas, points, colors = ['yellow', 'red'], speed = -1) {
    if (points.length < 3) return points;
    let pN = points.length;
    if(speed === -1)
     speed = pN < 200? pN < 50? 400:20 : 0;
    // Sort points lexicographically
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    // Find the pivot point, which is the point with the lowest y-coordinate
    const pivot = points[0];

    // Build the convex hull
    const uhull = [pivot, points[1]];
    for (let i = 2; i < pN; i++) {
        while (uhull.length >= 2 && 
            cross(uhull[uhull.length - 2], uhull[uhull.length - 1], points[i]) <= 0) {
            uhull.pop();
        }
        uhull.push(points[i]);

        await new Promise(resolve => setTimeout(resolve, speed));
        clearCanvas(ctx, canvas);
        DrawPoints2D(ctx, points);
        DrawHull(ctx, uhull, { strokeStyle : colors[0]}
        );
    }

    const lhull = [pivot, points[1]];
    for (let i = 2; i < pN; i++) {
        while (lhull.length >= 2 && cross(lhull[lhull.length - 2], lhull[lhull.length - 1], points[i]) >= 0) {
            lhull.pop();
        }
        lhull.push(points[i]);

        await new Promise(resolve => setTimeout(resolve, speed));
        clearCanvas(ctx, canvas);
        DrawPoints2D(ctx, points);
        DrawHull(ctx, lhull, { strokeStyle : colors[0]});
        DrawHull(ctx, uhull, { strokeStyle : colors[1]});
    }

    return [...uhull, ...lhull.reverse()];
}

export default GrahamScanAlgorithm2;