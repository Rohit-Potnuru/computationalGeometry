import './SweepLineView.css';
import { useEffect, useRef, useState } from "react";
import { clearCanvas } from './draw/Canvas';
import Point from './shape/Point';
import LineSegment from './shape/LineSegment';
import InputCheckBox from '../utils/components/InputCheckBox';
import { Stack } from '@mui/material';
import InputSlider from '../utils/components/InputSlider';
import { generatePoints } from '../utils/points';

function SweepLineView() {
    const canvasRef = useRef(null);
    //Mouse Variables
    const [moveObjects, setMoveObjects] = useState(false);
    const [selectedCursorObjects, setSelectedCursorObjects] = useState([]);

    const [stepSlider, setStepSliders] = useState(0);
    const [stepSliderRange, setStepSliderRange] = useState([0, 100]);

    const [numPoints, setNumPoints] = useState(2);
    const [minNumPoints, maxNumPoints] = [2, 100];
    const [points, setPoints] = useState([
        new Point([40, 50]),
        new Point([50, 150])
    ]);
    
    const [lineSegments, setLineSegments] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

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

        const points = generatePoints(numPoints, dimensionBoundaries).map(point => new Point(point));
        setPoints(points);

        const lineSegments = [];
        for(let i = 0; i < numPoints; i += 2) {
            lineSegments.push(new LineSegment(points[i], points[i + 1]));
        }
        setLineSegments(lineSegments);

        clearCanvas(ctx, canvas);
        lineSegments.forEach((lineSegment) => lineSegment.render2D(ctx));
    }, [numPoints]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        clearCanvas(ctx, canvas);
        points.forEach((point) => point.render2D(ctx));
        lineSegments.forEach((lineSegment) => lineSegment.render2D(ctx));
    }, [points, lineSegments, selectedCursorObjects, moveObjects]);

    const handleMouseDown = (e) => {
        if(!moveObjects) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        let flag = true;
        setPoints(points.map(point => {
          let pos = point.getX();
          const distance = Math.sqrt((mouseX - pos[0]) ** 2 + (mouseY - pos[1]) ** 2);
          if(distance < point.getRadius() && flag) {
            flag = false;
            point.setDragging(true);
            setSelectedCursorObjects([...selectedCursorObjects, point]);
          }
          return point;
        }));
    };

    const handleMouseUp = () => {
        if(!moveObjects) return;
        selectedCursorObjects.forEach(Object => {
            Object.setDragging(false);
        });
        setSelectedCursorObjects([]);
    };
    
    const handleMouseMove = (e) => {
        if(!moveObjects) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        if(selectedCursorObjects.length > 0) {
            setSelectedCursorObjects(selectedCursorObjects.map(Object => {
                if(Object.isDragging()) {
                    Object.move([mouseX, mouseY]);
                }
                return Object;
            }));
        }
    };

    return (
        <div className="SweepLineView">
            <div className='sweepLineView'>
                <Stack spacing={2} direction="row">
                    <InputSlider name = "Steps"
                                inputSliderValue = {[stepSlider, setStepSliders]}
                                range = {stepSliderRange}
                                props = {{disabled : isProcessing,}}
                    />
                    <InputSlider name = "Number of Points"
                                inputSliderValue = {[numPoints, setNumPoints]}
                                range = {[minNumPoints, maxNumPoints]}
                                props = {{disabled : isProcessing, step : 2}}
                    />
                </Stack>
                <InputCheckBox name = "Move Objects"
                               InputCheckBoxValue = {[moveObjects, setMoveObjects]}
                               disabled = {isProcessing}
                />
            </div>
            <div className="sweepLineViewWebGl">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseOut={handleMouseUp}
                    />
            </div>
        </div>
    );
}

export default SweepLineView;