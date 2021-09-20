import { useEffect, useRef } from "react";

import E from './Resources/E.png'
import A_1 from './Resources/A_1.png'
import L_1 from './Resources/L_1B.png'

const Tab1 = (props) => {

    const currentTab = props.tab



    useEffect(() => {
        prepareCanvas();
    }, [currentTab]); 
    //it reloads every time currentTab is changed
    //empty array here means useEffect only runs once on Mount. 

    const canvasRef = useRef(null);
    // const contextRef = useRef(null);

    
    const prepareCanvas = () => {
        const head = document.querySelector(".head")
        const shell = document.querySelector(".shell")
        const rear = document.querySelector(".rear")
        const canvas = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const shellWidth = canvas.width/2
        const headrearWidth = canvas.width/8
        const imgHeight = canvas.height/1.5
        
        const tab1 = () => {
            c.drawImage(head, canvas.width/2-shellWidth/2-headrearWidth, canvas.height/2-imgHeight/2, headrearWidth, imgHeight)
            c.drawImage(shell, canvas.width/2-shellWidth/2, canvas.height/2-imgHeight/2, shellWidth, imgHeight)
            c.drawImage(rear, canvas.width/2+shellWidth/2, canvas.height/2-imgHeight/2, headrearWidth, imgHeight)
        }

        const tab2 = () => {
            c.beginPath();
            c.arc(canvas.width/2, canvas.height/2, imgHeight/2, 0, 2 * Math.PI);
            c.stroke();
        }

        const c = canvas.getContext("2d")
        // c.strokeRect(canvas.width/2-50, canvas.height/2-50, 100, 100);

        // switch (currentTab){
        //     case "tab-1": 
        //         tab1();
        //         break;
        //     case "tab-2": 
        //         tab2();
        //         break;
        // }
        tab1();
    };

    return (
        <div id='Tab1'>
            <canvas ref={canvasRef}/>
            <img src={A_1} alt="A head" className='head' />
            <img src={E} alt="E Shell" className='shell' />
            <img src={L_1} alt="L Rear" className='rear' />
        </div>
    );
}

export default Tab1;