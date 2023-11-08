import { DrawPoints2D } from "../draw/DrawPoints2D";
import { cross } from "../../utils/Orientation";
import DrawHull from "../draw/DrawHull";
import { clearCanvas } from "../draw/Canvas";

async function GrahamScanAlgorithm(ctx, canvas, points, options) {

    let {
        colors = ['yellow', 'red'],
        speed = -1
    } = options;

    if (points.length < 3) return points;
    let pN = points.length;
    if(speed === -1)
     speed = pN < 200? pN < 50? 400:20 : 0;
    // Sort points lexicographically
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    // Find the pivot point, which is the point with the lowest y-coordinate
    const pivot = points[0];

    points.sort((a, b) => cross(a, pivot, b));

    let hull = [pivot], temp;
    for(let i = 1; i < pN; i++) {
        temp = [];
        while (hull.length >= 2 && 
            cross(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
            temp.push(hull.pop());
        }

        await new Promise(resolve => setTimeout(resolve, speed));
        clearCanvas(ctx, canvas);
        DrawPoints2D(ctx, points);
        DrawHull(ctx, hull, 
                    { strokeStyle : colors[1],
                      lineWidth : 4,
                    });
        DrawHull(ctx, [hull[hull.length - 1], points[i]], 
                    {   strokeStyle : colors[0], 
                        dotted: true
                    });
        console.log(temp);
        if(hull.length >= 1)
        DrawHull(ctx, [...temp, hull[hull.length - 1]], 
            {   strokeStyle : 'green', 
                dotted: true
            });

        hull.push(points[i]);
    }
    hull.push(pivot);
    return hull;
}

export default GrahamScanAlgorithm;