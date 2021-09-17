import React from 'react';


class WCResult extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state = {
            logMeanTemDif: 0,
            corMeanTemDif: 0,
            heatdutyHE: 0,
            overallHTCFHE: 0,
            fooledHTSA: 0,
            tubePitch: 0,
            shellInnerDiameter: 0,
            tubeMetalSecAreaAllTube: 0,
        };
    }



    calculate = () => {
        //destructuring        
        const {
            // constants for shell
            shellIT,
            shellOT,
            shellMFR,
            shellD,
            shellSHC,
            shellKV,
            shellTC,
            // Constant for tube
            tubeIT,
            tubeOT,
            tubeMFR,
            tubeD,
            tubeSHC,
            tubeKV,
            tubeTC,
            //Constraints and Physical Dimensions
            tubeOuterD,
            tubeLOconstant,
            numberTube,
            centralBaffleSpacing,
            clearance,
            numberPasses,
            //Fouling Attributes
            overSurfaceDesign,
            overallHeatTCCHE,
        } = this.props;
        // o is used to hold the calculated values before we setState at the end of the function
        let o = {}

        const difference = (a, b) => {
            return Math.abs(a - b);
        }

        
        
        //Determining the heat duty
        const Q = (shellMFR) * shellSHC * (shellIT - shellOT)
        o.heatdutyHE = Q.toFixed(4)

        // LMTD
        const LMTD = (difference(shellIT, shellOT) - difference(tubeIT, tubeOT)) / (Math.log(difference(shellIT, shellOT) / difference(tubeIT, tubeOT)))
        o.logMeanTemDif = LMTD.toFixed(4)
        // Temperature efficiency factor F
        const N = 1 // number of heat exchangers in series
        const P = (tubeOT-tubeIT) / (shellIT-tubeIT);
        const R = (shellIT-shellOT) / (tubeOT-tubeIT);
        const temp = (R*P-1)/(P-1)
        const Pz = (1-temp**(1/N))/(R-temp**(1/N))
        const corFactor = (Math.pow(R**2+1, 0.5)/(R-1)) * (Math.log((1-Pz)/(1-R*Pz))/(Math.log(((2/Pz)-1-R+Math.pow(R**2+1, 0.5)))/(Math.log((2/Pz)-1-R-Math.pow(R**2+1, 0.5)))))
        o.F = corFactor
        // CMTD
        o.CMTD = o.corFactor * LMTD;

        // Estimated overall heat transfer coefficient
        const U = 716 //use this for now

        //Required heat exchanger area
        o.HXarea = Q/(U*o.CMTD);
        
        console.log(o)
        //save everything
        //this is wrong. all the values in o is also NaN
        this.setState({o})
    }

    

    //     const Uf = overallHeatTCCHE / ((overSurfaceDesign / 100) + 1)
    //     o.overallHTCFHE = Uf.toFixed(4)
    //     const Af = Q / (Uf * LMTD)
    //     o.fooledHTSA = Af.toFixed(4)
    //     const Lf = Af / (numberTube * Math.PI * tubeOuterD)
    //     o.lengthFouledHE = Lf.toFixed(4)
    //     var ctp
    //     if (numberPasses === '1') {
    //         ctp = 0.93
    //     }
    //     else if (numberPasses === '2') {
    //         ctp = 0.90
    //     }
    //     else if (numberPasses === '3') {
    //         ctp = 0.85
    //     }
    //     var CL
    //     if (tubeLOconstant === '45') {
    //         CL = 1.0
    //     }
    //     else if (tubeLOconstant === '90') {
    //         CL = 1.0
    //     }
    //     else if (tubeLOconstant === '30') {
    //         CL = 0.87
    //     }
    //     else if (tubeLOconstant === '60') {
    //         CL = 0.87
    //     }
    //     const tP = Number(clearance) + Number(tubeOuterD)
    //     o.tubePitch = tP


    //     const PR = tP / tubeOuterD
    //     const Ao = Math.PI * tubeOuterD * numberTube * Lf
    //     const Ds = (0.637) * (Math.pow(CL / ctp, 0.5)) * (Math.pow((Ao * PR * PR * tubeOuterD) / Lf, 0.5))
    //     o.shellInnerDiameter = Ds.toFixed(4)
    //     const As = (Ds / tP) * clearance * centralBaffleSpacing
    //     o.tubeMetalSecAreaAllTube = As.toFixed(4)

    //     this.setState({ calcResult: o })
    // }

    componentDidMount() {
        this.calculate();
    }

    render() {
        return (
            <div>
                <h1>Sizing Results</h1>

                {/* <div className='results-Container'>
                    <h2>Preliminary Analysis</h2> */}
                    {/* I use h5 tags to style the numbers differently */}
                    {/* <div><p>Log-mean temperature difference, LMTD: </p> <h5>{this.state.calcResult.logMeanTemDif}°C</h5></div>
                    <div><p>Heat duty of heat exchanger: </p> <h5>{this.state.calcResult.heatdutyHE}W</h5></div>
                    <div><p>Tube pitch: </p> <h5>{this.state.calcResult.tubePitch}m</h5></div>
                    <div><p>Shell inner diameter: </p> <h5>{this.state.calcResult.shellInnerDiameter}m</h5></div>
                    
                    <h2>New Fouling Conditions due to Constraints</h2>
                    <div><p>Overall heat transfer coefficient for heat exchanger (fouled): </p> <h5>{this.state.calcResult.overallHTCFHE}W/m².K</h5></div>
                    <div><p>Heat transfer surface area (fouled): </p> <h5>{this.state.calcResult.fooledHTSA}m²</h5></div>
                    <div><p>Length of heat exchanger (fouled): </p> <h5>{this.state.calcResult.lengthFouledHE}m</h5></div>
                    <div><p>Total cross-sectional area for all tubes: </p> <h5>{this.state.calcResult.tubeMetalSecAreaAllTube}m²</h5></div>
                </div>

                <button className='calculate' onClick={this.props.handleNewCalc}>New Calculation</button>*/}
                <button onClick={() => console.log(this.state)}>log state 2</button> 
            </div>
        )
    }
}

export default WCResult;