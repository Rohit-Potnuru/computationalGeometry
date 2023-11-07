import './ConvexHullView.css';
import React, { useRef, useEffect, useState} from 'react';
import { generatePoints } from '../utils/points';
import { DrawPoints2D } from '../shapes/point2D';
import { clearCanvas } from './draw/canvas';
import DrawHull from './draw/DrawHull';
import InputSlider from '../utils/components/InputSlider';
import MultipleSelect from '../utils/components/InputSelect';
import ConvexHullAlgorithms from './algorithms/ConvexHullAlgorithms';
import { Stack } from '@mui/system';


function ConvexHullView() {
    const canvasRef = useRef(null);
    const [stepSlider, setStepSliders] = useState(0);
    const [numPoints, setNumPoints] = useState(100);
    const [minNumPoints, maxNumPoints] = [3, 2500];
    const [points, setPoints] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Chan's Algorithm");
    const [isProcessing, setIsProcessing] = useState(false);
    const [mValue, setMValue] = useState(3);
    const [mValueVisible, setMValueVisible] = useState(true);

    let max = 100;
    let min = 0;
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

        const outerBoundary = 30;
        const dimensionBoundaries = [[0 + outerBoundary, sizes.width - outerBoundary], 
                                     [0 + outerBoundary, sizes.height - outerBoundary]];
        const points = generatePoints(numPoints, dimensionBoundaries);
        setPoints(points);

        clearCanvas(ctx, canvas);
        DrawPoints2D(ctx, points);

    }, [numPoints, selectedAlgorithm]);

    const handleButtonClick = async () => {
        setIsProcessing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let convexHullPoints = [];
        try {
            let options = {};
            if(selectedAlgorithm === "Chan's Algorithm")
                options = {mValue: mValue};
            if(selectedAlgorithm in ConvexHullAlgorithms)
                convexHullPoints = await ConvexHullAlgorithms[selectedAlgorithm](ctx, canvas, points, options);
            
            DrawPoints2D(ctx, points);
            DrawHull(ctx, convexHullPoints, {lineWidth : 4});
            console.log("Algorithm Finished");
            console.log(convexHullPoints);
        }
        catch (error) {
            console.error("An error occurred while generating the convex hull:", error);
        }
        setIsProcessing(false);
    }

    return (
        <div className="ConvexHullView">
            <div className='convexHullInputs'>
                <Stack spacing={2} direction="row">
                    <InputSlider name = "Steps"
                                inputSliderValue = {[stepSlider, setStepSliders]}
                                range = {[min, max]}
                                // sideNameFlag = {true}
                                disabled = {isProcessing}
                    />
                    <InputSlider name = "Number of Points"
                                inputSliderValue = {[numPoints, setNumPoints]}
                                range = {[minNumPoints, maxNumPoints]}
                                disabled = {isProcessing}
                    />
                </Stack>
                <MultipleSelect name = "Convex Hull Algorithm"
                                sValue = {[selectedAlgorithm, setSelectedAlgorithm]}
                                sMenu = {Object.keys(ConvexHullAlgorithms)}
                />
                {(selectedAlgorithm === "Chan's Algorithm") && 
                    <InputSlider name = "m Value"
                        inputSliderValue = {[mValue, setMValue]}
                        range = {[2, 2500]}
                        sideNameFlag = {true}
                        disabled = {isProcessing}
                    />
                }
                
                <button 
                    onClick={handleButtonClick}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Animate Convex Hull"}
                </button>
            </div>
            
            <div className="convexHullWebGl">
                <canvas ref={canvasRef} ></canvas>
            </div>
        </div>
    );
}

export default ConvexHullView;