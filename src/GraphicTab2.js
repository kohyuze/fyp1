import { useEffect, useRef } from "react";

const Tab2 = () => {
    const tubeNo = 500
    const tubeDiameter = 0.03
    const shellDiameter = 1.3
    const tubes = [];
    const tubeConfig = "square" //triangular, rotated square

    const canvasRef = useRef(null);
    // const tubeWidth = tubeDiameter/shellDiameter * 20 +"vw";
    // const tubeHeight = tubeDiameter/shellDiameter * 20 +"vw";

    // for (let i = 0; i < tubeNo; i++) {
    //   tubes.push(<div className="tube" ></div>)
    // }
    // const tube = document.getElementsByClassName('tube');
    // console.log(tube)
    // for (const i of tube){
    //     i.style.setProperty('width', tubeWidth);
    //     i.style.setProperty('height', tubeHeight);
    //     i.style.setProperty('background-color', 'red');
    // }
    // tube.style.setProperty('width', tubeWidth);
    // tube.style.setProperty('height', tubeHeight);
    // tube.style.setProperty('background-color', 'red');

    useEffect(() => {
        prepareCanvas();
    }, []);

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        const shellImgDiameter = canvas.height / 1.1
        const c = canvas.getContext("2d")
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2, shellImgDiameter / 2, 0, 2 * Math.PI);
        c.stroke();

        const tubeImgDiameter = (tubeDiameter / shellDiameter) * shellImgDiameter

        //each tube occupy a square space, how much space can each square have?
        //method inspired by the die in wafer problem, see https://math.stackexchange.com/questions/3007527/how-many-squares-fit-in-a-circle
        const shellImgArea = Math.PI * (shellImgDiameter ** 2) / 4;
        const B = (Math.PI*shellImgDiameter)/(Math.sqrt(2)*tubeNo);
        const C = ((-1)*shellImgArea)/(tubeNo)
        let tubeImgSpacing = (-B + (B**2 - 4*C)**0.5)/2
        console.log(tubeImgSpacing)

        //express the diameter in terms of tube
        const tubeStayWithinDiameter = shellImgDiameter - tubeImgSpacing 
        const noTubeCenterRow = tubeStayWithinDiameter / tubeImgSpacing * 1.05 //give it abit of margin
        tubeImgSpacing = (tubeStayWithinDiameter / Math.floor(noTubeCenterRow) )//reset tubeImgSpacing so that the rows are evenly spread out

        const xleft = canvas.width / 2 - tubeStayWithinDiameter / 2
        const ycenter = canvas.height / 2
        const xcenter = canvas.width / 2

        //this function checks if tube is within the circle before drawing
        const CheckTubePosition = (x, y) => {
            const distFromCenter = Math.sqrt((x-xcenter)**2 + (y-ycenter)**2)
            if (distFromCenter<=tubeStayWithinDiameter/2){ return true }
            else {return false}
        }


        let tubeDrawn = 0
        let currentRow = 1
        while (tubeDrawn < tubeNo && currentRow < tubeNo) {
            if (currentRow == 1) {
                //draw center row
                for (let i = 0; i <= noTubeCenterRow; i++) {
                    const x = xleft + (i * tubeImgSpacing)
                    const y =  ycenter
                    if (!CheckTubePosition(x, y) && x<xcenter) {continue}
                    else if (!CheckTubePosition(x, y) && x>xcenter) {break}
                    else if (tubeDrawn>=tubeNo) {break}
                    else{
                        c.beginPath();
                        c.arc(x, y, tubeImgDiameter / 2, 0, 2 * Math.PI);
                        c.stroke();
                        tubeDrawn++
                    }
                    // console.log(tubeDrawn, i)
                }
                console.log(tubeDrawn, currentRow)
                currentRow++
            }
            else if (currentRow % 2 == 0) {
                for (let i = 0; i <= noTubeCenterRow; i++) {
                    //move up draw another row above
                    const x = xleft + (i * tubeImgSpacing)
                    const y =  ycenter + ((currentRow/2) * tubeImgSpacing)
                    if (!CheckTubePosition(x, y) && x<xcenter) {continue}
                    else if (!CheckTubePosition(x, y) && x>xcenter) {break}
                    else if (tubeDrawn>=tubeNo) {break}
                    else{
                        c.beginPath();
                        c.arc(x, y, tubeImgDiameter / 2, 0, 2 * Math.PI);
                        c.stroke();
                        tubeDrawn++
                    }
                }
                console.log(tubeDrawn, currentRow)
                currentRow++
                
            }
            else if (currentRow % 2 == 1) {
                for (let i = 0; i <= noTubeCenterRow; i++) {
                    //draw row below
                    const x = xleft + (i * tubeImgSpacing)
                    const y =  ycenter - ((currentRow/2 - 0.5) * tubeImgSpacing)
                    if (!CheckTubePosition(x, y) && x<xcenter) {continue}
                    else if (!CheckTubePosition(x, y) && x>xcenter) {break}
                    else if (tubeDrawn>=tubeNo) {break}
                    else{
                        c.beginPath();
                        c.arc(x, y, tubeImgDiameter / 2, 0, 2 * Math.PI);
                        c.stroke();
                        tubeDrawn++
                    }
                }
                console.log(tubeDrawn, currentRow)
                currentRow++
                
            }  
        }
        // c.beginPath();
        // c.arc(xcenter, ycenter, tubeHeight/2, 0, 2 * Math.PI);
        // c.stroke();
    }

    return (
        <div id='Tab2'>
            <canvas ref={canvasRef} />
            {/* <div className="big_circle">
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div>
                <div className="tube-row">{tubes}</div> 
                
            </div>
            <div className="shellDiameter">
                <p>Shell Diameter: {shellDiameter}m</p>
                <p>No. of tubes: {tubeNo}m</p>
            </div> */}
        </div>
    );

}
export default Tab2;