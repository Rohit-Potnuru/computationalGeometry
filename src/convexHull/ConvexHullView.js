import React, { useRef, useEffect, useState} from 'react';
import Point2D, { DrawPoints2D } from '../shapes/point2D';
import { generatePoints } from '../utils/points';
import GrahamScanAlgorithm from './algorithms/GrahamScan';


function ConvexHullView() {
    const canvasRef = useRef(null);
    const [numPoints, setNumPoints] = useState(10);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const sizes = {
            width: 700,
            height: 700
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set the size of the canvas
        canvas.width = sizes.width;
        canvas.height = sizes.height;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        const outerBoundary = 30;
        const dimensionBoundaries = [[0 + outerBoundary, sizes.width - outerBoundary], 
                                     [0 + outerBoundary, sizes.height - outerBoundary]];
        const points = generatePoints(numPoints, dimensionBoundaries);
        setPoints(points);

        DrawPoints2D(ctx, points);

    }, [numPoints]);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setNumPoints(value);
        }
    }

    const handleButtonClick = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const convexHullPoints = GrahamScanAlgorithm(points);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(convexHullPoints[0][0], convexHullPoints[0][1]);
        for (let i = 1; i < convexHullPoints.length; i++) {
            ctx.lineTo(convexHullPoints[i][0], convexHullPoints[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
        console.log(convexHullPoints);
    }


    return (
        <div className="ConvexHullView">
            <canvas ref={canvasRef} className="webgl"></canvas>
            <label>
                Number of Points:
                <input
                    type="number"
                    value={numPoints}
                    onChange={handleInputChange}
                    min="0"
                />
            </label>
            <button onClick={handleButtonClick}>Generate Convex Hull</button>
        </div>
    );
}

export default ConvexHullView;