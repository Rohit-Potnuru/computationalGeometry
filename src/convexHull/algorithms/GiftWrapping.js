import { DrawPoints2D } from "../../shapes/point2D";
import DrawHull from "../draw/DrawHull";
import { clearCanvas } from "../draw/canvas";

async function GiftWrapping(ctx, canvas, points, speed = 1) {
    if (points.length < 3) return null;
    let n = points.length;
    speed = 1000;

    // Find the pivot point, which is the point with the lowest y-coordinate
    let pivot = points[0];
    for(let i = 1; i < points.length; i++) {
        if(pivot[0] == points[i][0] && pivot[1] < points[i][1])
            pivot = points[i];
        else if(pivot[0] > points[i][0])
            pivot = points[i];
    }

    // Build the convex hull
    const hull = [pivot];
    let curr = -1;
    while(curr != pivot && hull.length < points.length) {
        curr = hull[hull.length - 1];
        for(let i = 0; i < points.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            clearCanvas(ctx, canvas);
            DrawPoints2D(ctx, points);
            DrawHull(ctx, hull, 'red');
            DrawHull(ctx, [curr, points[i]], 'yellow');
            if(validateOrientations(points, curr, points[i])) {
                // curr = points[i];
                hull.push(points[i]);
                break;
            }
        }
        curr = hull[hull.length - 1];
    }
    return hull;
}

//check for left point
function validateOrientations(points, a, o) {
    for(let j = 0; j < points.length; j++) {
        if(cross(o, a, points[j]) < 0)
            return false;
    }
    return true;
}

// Helper function to calculate the cross product of three points
function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

export default GiftWrapping;