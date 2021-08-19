import React, { Component } from 'react';


class RatingResult extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state = {
            calcResult: {
                criticalFlowvelocity: 0,
                criticalFlowVelocityFactor: 0,
                fluidElasticParameter: 0,
                dampingConstant: 0,
                tubeNaturalFrequency: 0,
                shellSideSecArea: 0,
                shellSideMaseV: 0,
                equivalentDiameter: 0,
                reynoldsNumberShellSide: 0,
                nusseltnumbershellside: 0,
                shellSideFilmHeat: 0,
                logMeanTemDif: 0,
                tubeMetalSecAreaAllTube: 0,
                tubeSideFuildV: 0,
                tubeSideRN: 0,
                tubeSideNN: 0,
                shellsideFHC: 0,
                tubesidePressureDrop: 0,
                overallHeatTCCHE: 0,
                heatdutyHE: 0,
                cleanHeatTransferSA: 0,
                lengthCleanHE: 0,
                pressurDICFS: 0,
                pressurAW: 0,
                pressurEF: 0,
                shellSideTPD: 0,
                criplingLoad: 0,
                tubeMetalCrossSectionalArea: 0,
                tubeAxialStressMultipllier: 0,
                tubeFluidMPUL: 0,
                tubeFluidMDPUL: 0,
                hydrodynamicMPUL: 0,
                effectiveTubeMPUL: 0,
                totalFoolingResistance: 0,
                overallHTCFHE: 0,
                fooledHTSA: 0,
                oversurfaceDesign: 0,
                lengthFouledHE: 0,
                tubeSIdeFPD: 0,
                cleanlinessFactor: 0,
            }
        };
    }



    calculate = () => {
        //destructuring        
        const {
            shellIT,
            shellOT,
            shellMFR,
            shellSHC,
            shellDV,
            shellTC,
            shellD,
            shellFF,
            //shellPN, //not filled in form
            // Constant for tube
            tubeIT,
            tubeOT,
            tubeMFR,
            tubeSHC,
            tubeDV,
            tubeTC,
            tubeD,
            tubeFF,
            //tubePN, //not filled in form
            // Constant for Constraints and physical Dimensions
            tubeInnerD,
            tubeOuterD,
            tubePitch,
            numberTube,
            numberPasses,
            layoutAngle,
            shellInnerDiameter,
            baffleCut,
            centralBaffleSpacing,
            clearance,
            shellSideFluidDynamicViscocity,
            tubeMaterialThermalConductivity,
            // Constant for material design
            tubeUnsupportedLength,
            tubeYoungModule,
            tubeLongitudeStress,
            addedMassCoefficient,
            metalMassUnitLength,
        } = this.props.formData;
        // o is used to hold the calculated values before we setState at the end of the function
        let o = {}

        const difference = (a, b) => {
            return Math.abs(a - b);
        }


        o.shellPN = 5.43
        o.tubePN = 6.55

        const nt = shellInnerDiameter / tubePitch
        //shell side cross sectional area
        const as = nt * clearance * centralBaffleSpacing
        o.shellSideSecArea = as.toFixed(6);
        //mass velocity of shell side fluid
        const gs = shellMFR / as
        o.shellSideMaseV = gs.toFixed(6);
        //equivalent diameter
        const de = 4 * (Math.pow(tubePitch, 2) - (Math.PI * (Math.pow((tubeOuterD / 2), 2)))) / (Math.PI * tubeOuterD)
        o.equivalentDiameter = de.toFixed(6);
        // Reynolds number for shell-side fluid
        const res = (shellMFR / as) * (de / shellDV)
        o.reynoldsNumberShellSide = res.toFixed(6);
        const uw = shellSideFluidDynamicViscocity;

        var a1
        var a2
        var a3
        var a4
        if (layoutAngle === 30 && res < 10) {
            a1 = 1.400
            a2 = -0.667
            a3 = 1.450
            a4 = 0.519
        }
        else if (layoutAngle === 30 && res >= 10 && res < Math.pow(10, 2)) {
            a1 = 1.360
            a2 = -0.657
            a3 = 1.450
            a4 = 0.519
        }
        else if (layoutAngle === 30 && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
            a1 = 0.593
            a2 = -0.477
            a3 = 1.450
            a4 = 0.519
        }
        else if (layoutAngle === 30 && res >= Math.pow(10, 3)) {
            a1 = 0.321
            a2 = -0.388
            a3 = 1.450
            a4 = 0.519
        }
        else if (layoutAngle === 45 && res < 10) {
            a1 = 1.550
            a2 = -0.667
            a3 = 1.930
            a4 = 0.500
        }
        else if (layoutAngle === 45 && res >= 10 && res < Math.pow(10, 2)) {
            a1 = 0.498
            a2 = -0.656
            a3 = 1.930
            a4 = 0.500
        }
        else if (layoutAngle === 45 && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
            a1 = 0.730
            a2 = -0.500
            a3 = 1.930
            a4 = 0.500
        }
        else if (layoutAngle === 45 && res >= Math.pow(10, 3)) {
            a1 = 0.370
            a2 = -0.396
            a3 = 1.930
            a4 = 0.500
        }
        else if (layoutAngle === 90 && res < 10) {
            a1 = 0.970
            a2 = -0.667
            a3 = 1.187
            a4 = 0.370
        }
        else if (layoutAngle === 90 && res >= 10 && res < Math.pow(10, 2)) {
            a1 = 0.900
            a2 = -0.631
            a3 = 1.187
            a4 = 0.370
        }
        else if (layoutAngle === 90 && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
            a1 = 0.408
            a2 = -0.460
            a3 = 1.187
            a4 = 0.370
        }
        else if (layoutAngle === 90 && res >= Math.pow(10, 3) && res < Math.pow(10, 4)) {
            a1 = 0.107
            a2 = -0.266
            a3 = 1.187
            a4 = 0.370
        }
        else if (layoutAngle === 90 && res >= Math.pow(10, 4)) {
            a1 = 0.370
            a2 = -0.395
            a3 = 1.187
            a4 = 0.370
        }
        // else return (
        //     alert("Layout Angle: Only 30°, 45° and 90°!") //not needed anymore
        // )
        const a = a3 / (1 - (0.14) * Math.pow(res, a4));
        // nusselt number for shell side fluid
        const nus = 0.36 * (Math.pow(res, 0.55)) * (Math.pow(o.shellPN, 0.33)) * (Math.pow((shellDV / uw), 0.14));
        o.nusseltnumbershellside = nus.toFixed(6);
        const ji = a1 * Math.pow(1.33 / (tubePitch / tubeOuterD), a) * Math.pow(res, a2);
        const hs = ji * shellSHC * gs * Math.pow(shellTC / (shellSHC * shellDV), 2 / 3) * Math.pow(shellDV / shellSideFluidDynamicViscocity, 0.14);
        o.shellSideFilmHeat = hs.toFixed(6);
        const P = (tubeOT - tubeIT) / (shellIT - tubeIT);
        const R = (shellIT - shellOT) / (tubeOT - tubeIT);
        //Correction F
        const F = 1;
        o.correctionFactor = F.toFixed();
        // Tube side heat transfer coefficient
        // temperature difference
        const LMTD = (difference(shellIT, shellOT) - difference(tubeIT, tubeOT)) / (Math.log(difference(shellIT, shellOT) / difference(tubeIT, tubeOT))); //NaN becos tubeIT-tubeOT=0
        o.logMeanTemDif = LMTD.toFixed(4);

        const At = Math.PI / 4 * Math.pow(tubeInnerD, 2)
        // Tube metal cross sectional area
        const Atp = At * numberTube
        o.tubeMetalSecAreaAllTube = Atp.toFixed(6)
        // tube side fluid velocity
        const Ut = (tubeMFR) / (tubeD * Atp)
        o.tubeSideFuildV = Ut.toFixed(6)
        const Ret = (tubeD * Ut * tubeInnerD) / tubeDV
        o.tubeSideRN = Ret.toFixed(6)
        const ft = Math.pow(1.58 * Math.log(Ret) - 3.28, -2)
        const Nut = ((ft / 2) * Ret * o.tubePN) / (1.07 + (12.7 * Math.pow((ft / 2), 1 / 2)) * (Math.pow(o.tubePN, 2 / 3) - 1))
        o.tubeSideNN = Nut.toFixed(6)
        const hi = Nut * (tubeTC / tubeInnerD)
        o.shellsideFHC = hi.toFixed(4)
        const Uc = 1 / (1 / hs + ((1 / hi) * (tubeOuterD / tubeInnerD)) + (tubeOuterD / (2 * tubeMaterialThermalConductivity)) * Math.log(tubeOuterD / tubeInnerD))

        o.overallHeatTCCHE = Uc.toFixed(6)

        const Q = (shellMFR) * shellSHC * (shellIT - shellOT)
        o.heatdutyHE = Q.toFixed(6)
        const A = (Q / (Uc * 1 * LMTD))
        o.cleanHeatTransferSA = A.toFixed(6)
        const L = A / (numberTube * Math.PI * tubeOuterD)
        o.lengthCleanHE = L.toFixed(6)
        const Nb = (L / centralBaffleSpacing) - 1
        const fs = Math.exp(0.576 - (0.19 * Math.log(res)))
        // Tube Side Pressure Drop
        const deltaPt = (4 * ft * ((L * numberPasses) / tubeInnerD) + 4 * numberPasses) * ((tubeD * Math.pow(Ut, 2)) / 2)
        o.tubesidePressureDrop = deltaPt.toFixed(6)
        const Ntcc = (shellInnerDiameter / tubePitch) * (1 - (2 * baffleCut / 100))
        const Lbb = 0.012 + (0.05 * shellInnerDiameter)
        const Dctl = Number(shellInnerDiameter) - (Number(Lbb) + Number(tubeOuterD))
        const Ntcw = (0.8 / tubePitch) * (shellInnerDiameter * (baffleCut / 100) - (shellInnerDiameter - Dctl) / 2)
        const deltaPbi = 4 * fs * (Math.pow(gs, 2) / (2 * shellD)) * Math.pow(shellSideFluidDynamicViscocity / shellDV, 0.14) * Ntcc
        const Sm = centralBaffleSpacing * (Lbb + (Dctl / tubePitch) * (tubePitch - tubeOuterD))
        const Qds = 2 * Math.acos(1 - (2 * (baffleCut / 100))) * (180 / Math.PI)
        const Swg = (Math.PI / 4) * (Math.pow(shellInnerDiameter, 2)) * ((Qds / 360) - (Math.sin(Qds) / (2 * Math.PI)))
        const Qctl = 2 * Math.acos(shellInnerDiameter / Dctl * (1 - (2 * baffleCut / 100))) * (180 / Math.PI)
        const Fw = (Qctl / 360) - (Math.sin(Qctl) / (2 * Math.PI))
        const Swt = numberTube * Fw * (Math.PI / 4 * Math.pow(tubeOuterD, 2))
        const Sw = Swg - Swt
        const mw = (shellMFR) / (Math.sqrt((Sm * Sw)))
        const Rl = 0.4
        const Rb = 0.6
        const deltaPc = deltaPbi * (Nb - 1) * Rl * Rb
        o.pressurDICFS = deltaPc
        const deltaPw = Nb * ((2 + 0.6 * Ntcw) * ((Math.pow(mw, 2)) / (2 * shellD)) * (Math.pow(10, -3))) * Rl
        o.pressurAW = deltaPw
        const Rs = 2
        const deltaPe = deltaPbi * (1 + (Ntcw / Ntcc)) * Rb * Rs
        o.pressurEF = deltaPe

        // shell side Total Pressure Drop
        const deltaPs = Number(deltaPc) + Number(deltaPw) + Number(deltaPe)
        o.shellSideTPD = deltaPs
        //Flow-Induced Vibration Checks
        // Moment of Inertia
        const I = Math.PI / 64 * (Math.pow(tubeOuterD, 4) - Math.pow(tubeInnerD, 4))
        // Crippling Load Fcr
        const l = tubeUnsupportedLength
        const E = tubeYoungModule * Math.pow(10, 9)
        const Fcr = (Math.pow(Math.PI, 2) * (E) * I) / Math.pow(l, 2)
        o.criplingLoad = Fcr.toFixed(6)
        // Tube Metal Cross Sectional area At
        const Att = Math.PI / 4 * (Math.pow(tubeOuterD, 2) - Math.pow(tubeInnerD, 2))
        o.tubeMetalCrossSectionalArea = Att.toFixed(6)
        // Tube Axial Stress Multiplier (S)
        const St = tubeLongitudeStress * Math.pow(10, 6)
        const S = Math.pow(1 + ((St * Att) / Fcr), 0.5)
        o.tubeAxialStressMultipllier = S.toFixed(6)
        // Tube Fluid Mass Per Unit Length
        const mfi = 0.00545 * tubeD * Math.pow(tubeInnerD, 2)
        o.tubeFluidMPUL = mfi
        const mfo = 0.00545 * tubeD * Math.pow(tubeOuterD, 2)
        o.tubeFluidMDPUL = mfo
        const Hm = addedMassCoefficient * mfo
        o.hydrodynamicMPUL = Hm
        //const mt = tubeD * Ut * A * numberTube
        const mt = metalMassUnitLength

        // Effective Tube Mass Per Unit Length(mo)
        const mo = Number(mt) + Number(mfi) + Number(Hm)
        o.effectiveTubeMPUL = mo

        const C = 9.9

        // Tube Natural Frequency (fn)
        const fn = 10.838 * ((S * C) / Math.pow(l, 2)) * Math.pow(((E * I) / mo), 0.5)
        o.tubeNaturalFrequency = fn.toFixed(6)
        // Damping Constant (St)
        const Stt = 3.41 * (tubeOuterD / (mo * fn))
        o.dampingConstant = Stt.toFixed(6)
        // Fluid Elastic Parameter (x)
        const x = 144 * (mo * Stt / (tubeD * Math.pow(tubeOuterD, 2)))
        o.fluidElasticParameter = x.toFixed(6)
        // Critical Flow Velocity Factor (D)
        const D = 2.10 * Math.pow(x, 0.15)
        o.criticalFlowVelocityFactor = D.toFixed(6)
        // Critical Flow Velocity (Vc)
        const Vc = D * fn * tubeOuterD
        o.criticalFlowvelocity = Vc.toFixed(6)
        //Fouling
        const Rft = Number(tubeOuterD * tubeFF / tubeInnerD) + Number(shellFF)
        o.totalFoolingResistance = Rft

        const Uf = 1 / ((1 / Uc) + Rft)
        o.overallHTCFHE = Uf.toFixed(6)
        const Af = Q / (Uf * LMTD)
        o.fooledHTSA = Af.toFixed(6)
        const OS = Uc / Uf
        o.oversurfaceDesign = OS.toFixed(6)
        const Lf = Af / (numberTube * Math.PI * tubeOuterD)
        o.lengthFouledHE = Lf.toFixed(6)
        const deltaPtf = ((4 * ft * (Lf / tubeInnerD)) + (4 * numberPasses)) * (tubeD * Math.pow(Ut, 2) / 2)
        o.tubeSIdeFPD = deltaPtf.toFixed(6)
        const CF = Uf / Uc
        o.cleanlinessFactor = CF.toFixed(6)

        this.setState({ calcResult: o })
    }

    componentDidMount() {
        this.calculate();
    }

    render() {
        return (
            <div>
                <h1>Rating Results</h1>

                <div className='results-Container'>
                    <h2>Shell-side Thermal Analysis</h2>
                    {/* I use h5 tags to style the numbers differently */}
                    <div><p>Shell-side cross sectional area:</p> <h5>{this.state.calcResult.shellSideSecArea}m²</h5></div>
                    <div><p>Mass velocity of shell side:</p> <h5>{this.state.calcResult.shellSideMaseV}kg/m².s</h5></div>
                    <div><p>Equivalent diameter:</p> <h5>{this.state.calcResult.equivalentDiameter}m</h5></div>
                    <div><p>Reynolds number for shell-side fluid:</p> <h5>{this.state.calcResult.reynoldsNumberShellSide}</h5></div>
                    <div><p>Prandtl number for shell-side fluid:</p> <h5>{this.state.calcResult.shellPN}</h5></div>
                    <div><p>Nusselt Number for shell-side fluid:</p> <h5>{this.state.calcResult.nusseltnumbershellside}</h5></div>
                    <div><p>Shell-side heat transfer coefficient (Bell-Delware):</p> <h5>{this.state.calcResult.shellSideFilmHeat}W/m².K</h5></div>
                    <h2>Tube-side Thermal Analysis</h2>
                    <div><p>Log-mean temperature difference, LMTD:</p> <h5>{this.state.calcResult.logMeanTemDif}°C</h5></div>
                    <div><p>Total cross-sectional area for all tubes:</p> <h5>{this.state.calcResult.tubeMetalSecAreaAllTube}m²</h5></div>
                    <div><p>Tube-side fluid's velocity:</p> <h5>{this.state.calcResult.tubeSideFuildV}m/s</h5></div>
                    <div><p>Reynolds number for tube-side fluid:</p> <h5>{this.state.calcResult.tubeSideRN}</h5></div>
                    <div><p>Prandtl number for tube-side fluid:</p> <h5>{this.state.calcResult.tubePN}</h5></div>
                    <div><p>Nusselt number for tube-side fluid:</p> <h5>{this.state.calcResult.tubeSideNN}</h5></div>
                    <div><p>Tube-side heat transfer coefficient (Kern):</p> <h5>{this.state.calcResult.shellsideFHC}W/m².K</h5></div>
                    <h2>Tube Side Pressure Drop</h2>
                    <div><p>Overall heat transfer coefficient for heat exchanger (clean):</p> <h5>{this.state.calcResult.overallHeatTCCHE}W/m².K</h5></div>
                    <div><p>Heat duty of heat exchanger:</p> <h5>{this.state.calcResult.heatdutyHE}W</h5></div>
                    <div><p>Heat transfer surface area (clean):</p> <h5>{this.state.calcResult.cleanHeatTransferSA}m²</h5></div>
                    <div><p>Length of heat exchanger (clean):</p> <h5>{this.state.calcResult.lengthCleanHE}m</h5></div>
                    <div><p>Tube-side pressure drop:</p> <h5>{this.state.calcResult.tubesidePressureDrop}Pa</h5></div>
                    <h2>Shell Side Pressure Drop</h2>
                    <div><p>Pressure drop in the interior cross flow section, ∆Pc:</p> <h5>{this.state.calcResult.pressurDICFS}Pa</h5></div>
                    <div><p>Pressure drop in all windows, ∆Pw:</p> <h5>{this.state.calcResult.pressurAW}Pa</h5></div>
                    <div><p>Pressure drop due to entrance and exit flows, ∆Pe:</p> <h5>{this.state.calcResult.pressurEF}Pa</h5></div>
                    <div><p>Shell-side total pressure drop, ∆Ps:</p> <h5>{this.state.calcResult.shellSideTPD}Pa</h5></div>
                    <h2>Flow-Induced Vibration Check</h2>
                    <div><p>Crippling load:</p> <h5>{this.state.calcResult.criplingLoad}N</h5></div>
                    <div><p>Tube metal cross-sectional area:</p> <h5>{this.state.calcResult.tubeMetalCrossSectionalArea}m²</h5></div>
                    <div><p>Tube axial stress multiplier:</p> <h5>{this.state.calcResult.tubeAxialStressMultipllier}</h5></div>
                    <div><p>Tube fluid mass per unit length:</p> <h5>{this.state.calcResult.tubeFluidMPUL}kg/m</h5></div>
                    <div><p>Tube fluid mass displaced per unit length:</p> <h5>{this.state.calcResult.tubeFluidMDPUL}kg/m</h5></div>
                    <div><p>Hydrodynamic mass per unit length:</p> <h5>{this.state.calcResult.hydrodynamicMPUL}kg/m</h5></div>
                    <div><p>Effective tube mass per unit length:</p> <h5>{this.state.calcResult.effectiveTubeMPUL}kg/m</h5></div>
                    <div><p>Tube natural frequency:</p> <h5>{this.state.calcResult.tubeNaturalFrequency}Hz</h5></div>
                    <div><p>Damping constant:</p> <h5>{this.state.calcResult.dampingConstant}</h5></div>
                    <div><p>Fluid elastic parameter:</p> <h5>{this.state.calcResult.fluidElasticParameter}</h5></div>
                    <div><p>Critical flow velocity factor:</p> <h5>{this.state.calcResult.criticalFlowVelocityFactor}</h5></div>
                    <div><p>Critical flow velocity:</p> <h5>{this.state.calcResult.criticalFlowvelocity}m/s</h5></div>
                    <h2>Fouling Check</h2>
                    <div><p>Total fouling resistance:</p> <h5>{this.state.calcResult.totalFoolingResistance}</h5></div>
                    <div><p>Overall heat transfer coefficient for heat exchanger (fouled):</p> <h5>{this.state.calcResult.overallHTCFHE}W/m².K</h5></div>
                    <div><p>Heat transfer surface area (fouled):</p> <h5>{this.state.calcResult.fooledHTSA}m²</h5></div>
                    <div><p>Length of heat exchanger (fouled):</p> <h5>{this.state.calcResult.lengthFouledHE}m</h5></div>
                    <div><p>Surface overdesign:</p> <h5>{this.state.calcResult.oversurfaceDesign}</h5></div>
                    <div><p>Cleanliness factor:</p> <h5>{this.state.calcResult.cleanlinessFactor}</h5></div>
                    <div><p>Tube-side pressure drop (fouled), ∆Pf:</p> <h5>{this.state.calcResult.tubeSIdeFPD}Pa</h5></div>

                </div>

                <button className='calculate' onClick={this.props.handleNewCalc}>New Calculation</button>
                <button onClick={() => console.log(this.state)}>log state 2</button>
            </div>
        )
    }
}

export default RatingResult;