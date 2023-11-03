import React, { useRef, useEffect, useState} from 'react';
import Point2D, { DrawPoints2D } from '../shapes/point2D';
import { generatePoints } from '../utils/points';
import GrahamScanAlgorithm from './algorithms/GrahamScan';
import DrawHull from './draw/DrawHull';
import './ConvexHullView.css';
import GiftWrapping from './algorithms/GiftWrapping';
import { clearCanvas } from './draw/canvas';


function ConvexHullView() {
    const canvasRef = useRef(null);
    const [numPoints, setNumPoints] = useState(10);
    const [points, setPoints] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('GrahamScan');

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
        clearCanvas(ctx, canvas);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        const outerBoundary = 30;
        const dimensionBoundaries = [[0 + outerBoundary, sizes.width - outerBoundary], 
                                     [0 + outerBoundary, sizes.height - outerBoundary]];
        const points = generatePoints(numPoints, dimensionBoundaries);
        setPoints(points);

        DrawPoints2D(ctx, points);

    }, [numPoints, selectedAlgorithm]);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setNumPoints(value);
        }
    }

    const handleSelectChange = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

    const handleButtonClick = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let convexHullPoints = [];
        if(selectedAlgorithm == "GrahamScan") {
            convexHullPoints = await GrahamScanAlgorithm(ctx, canvas, points);
        }
        else if(selectedAlgorithm == "GiftWrapping") {
            convexHullPoints = await GiftWrapping(ctx, canvas, points);
        }
        
        DrawHull(ctx, convexHullPoints);
        console.log(convexHullPoints);
    }


    return (
        <div className="ConvexHullView">
            <div className="convexHullWebGl">
            <canvas ref={canvasRef} ></canvas>
            </div>
            <div className='convexHullInputs'>
                <label>
                    Number of Points:
                    <input
                        type="number"
                        value={numPoints}
                        onChange={handleInputChange}
                        min="0"
                    />
                </label>
                <select
                    id="convexHullAlgorithms"
                    name="convexHullAlgorithms"
                    value={selectedAlgorithm}
                    onChange={handleSelectChange}
                >
                    <option value="GrahamScan">Graham Scan</option>
                    <option value="GiftWrapping">Jarvis March Gift Wrapping</option>
                    <option value="Chan's">Chan Algorithm</option>
                </select>
                <button onClick={handleButtonClick}>Generate Convex Hull</button>
            </div>
        </div>
    );
}

export default ConvexHullView;