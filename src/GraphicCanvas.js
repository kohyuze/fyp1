import { useEffect, useRef, useState } from "react";
// import { useCanvas } from "./CanvasContext";

const GraphicCanvas = () => {
    // const {
    //     canvasRef,
    //     prepareCanvas,
    //     startDrawing,
    //     finishDrawing,
    //     draw,
    //   } = useCanvas();

    useEffect(() => {
    prepareCanvas();
    }, []);

    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.5;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight * 0.5}px`;

        const context = canvas.getContext("2d")
        // context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    );
}

export default GraphicCanvas;