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
                ShellSideFilmHeat: 0,
                logMeanTemDif: 0,
                tubeMetalSecAreaAllTube: 0,
                tubeSideFuildV: 0,
                tubeSideRn: 0,
                tubeSideNN: 0,
                shellsideFHC: 0,
                tubesidePressureDrop: 0,
                overallHeatTCCHE: 0,
                heatdutyHE: 0,
                cleanHeatTransferSA: 0,
                LengthCleanHE: 0,
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
                LengthFooledHE: 0,
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
            //ShellPN, //not filled in form
            // Constant for tube
            tubeIT,
            tubeOT,
            tubeMFR,
            tubeSHC,
            tubeDV,
            tubeTC,
            tubeD,
            tubeFF,
            //TubePN, //not filled in form
            // Constant for Constraints and physical Dimensions
            innerD,
            outerD,
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




        const shellPN = 5.43
        const tubePN = 6.55

        const nt = shellInnerDiameter / tubePitch
        //shell side cross sectional area
        const as = nt * clearance * centralBaffleSpacing
        this.setState({ calcResult: {...this.state.calcResult, shellSideSecArea: '369'}})//as.toFixed(6)
        // //mass velocity of shell side fluid
        // const gs = shellMFR / as
        // setShellSideMaseV(gs.toFixed(6))
        // //equivalent diameter
        // const de = 4 * (Math.pow(tubePitch, 2) - (Math.PI * (Math.pow((tubeOuterD / 2), 2)))) / (Math.PI * tubeOuterD)
        // setEquivalentDiameter(de.toFixed(6))
        // // Reynolds number for shell-side fluid
        // const res = (shellMFR / as) * (de / shellDV)
        // setreynoldsNumberShellSide(res.toFixed(6))
        // const uw = shellSideFluidDynamicViscocity;

        // var a1
        // var a2
        // var a3
        // var a4
        // if (LayoutAngle === '30' && res < 10) {
        //     a1 = 1.400
        //     a2 = -0.667
        //     a3 = 1.450
        //     a4 = 0.519
        // }
        // else if (LayoutAngle === '30' && res >= 10 && res < Math.pow(10, 2)) {
        //     a1 = 1.360
        //     a2 = -0.657
        //     a3 = 1.450
        //     a4 = 0.519
        // }
        // else if (LayoutAngle === '30' && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
        //     a1 = 0.593
        //     a2 = -0.477
        //     a3 = 1.450
        //     a4 = 0.519
        // }
        // else if (LayoutAngle === '30' && res >= Math.pow(10, 3)) {
        //     a1 = 0.321
        //     a2 = -0.388
        //     a3 = 1.450
        //     a4 = 0.519
        // }
        // else if (LayoutAngle === '45' && res < 10) {
        //     a1 = 1.550
        //     a2 = -0.667
        //     a3 = 1.930
        //     a4 = 0.500
        // }
        // else if (LayoutAngle === '45' && res >= 10 && res < Math.pow(10, 2)) {
        //     a1 = 0.498
        //     a2 = -0.656
        //     a3 = 1.930
        //     a4 = 0.500
        // }
        // else if (LayoutAngle === '45' && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
        //     a1 = 0.730
        //     a2 = -0.500
        //     a3 = 1.930
        //     a4 = 0.500
        // }
        // else if (LayoutAngle === '45' && res >= Math.pow(10, 3)) {
        //     a1 = 0.370
        //     a2 = -0.396
        //     a3 = 1.930
        //     a4 = 0.500
        // }
        // else if (LayoutAngle === '90' && res < 10) {
        //     a1 = 0.970
        //     a2 = -0.667
        //     a3 = 1.187
        //     a4 = 0.370
        // }
        // else if (LayoutAngle === '90' && res >= 10 && res < Math.pow(10, 2)) {
        //     a1 = 0.900
        //     a2 = -0.631
        //     a3 = 1.187
        //     a4 = 0.370
        // }
        // else if (LayoutAngle === '90' && res >= Math.pow(10, 2) && res < Math.pow(10, 3)) {
        //     a1 = 0.408
        //     a2 = -0.460
        //     a3 = 1.187
        //     a4 = 0.370
        // }
        // else if (LayoutAngle === '90' && res >= Math.pow(10, 3) && res < Math.pow(10, 4)) {
        //     a1 = 0.107
        //     a2 = -0.266
        //     a3 = 1.187
        //     a4 = 0.370
        // }
        // else if (LayoutAngle === '90' && res >= Math.pow(10, 4)) {
        //     a1 = 0.370
        //     a2 = -0.395
        //     a3 = 1.187
        //     a4 = 0.370
        // }
        // else return (
        //     alert("Layout Angle: Only 30°, 45° and 90°!")
        // )

        // const a = a3 / (1 - (0.14) * Math.pow(res, a4))
        // // nusselt number for shell side fluid
        // const nus = 0.36 * (Math.pow(res, 0.55)) * (Math.pow(SPN, 0.33)) * (Math.pow((shellDV / uw), 0.14))
        // setNusseltnumbershellside(nus.toFixed(6))

        // const ji = a1 * Math.pow(1.33 / (tubePitch / tubeOuterD), a) * Math.pow(res, a2)
        // const hs = ji * shellSHC * gs * Math.pow(shellTC / (shellSHC * shellDV), 2 / 3) * Math.pow(shellDV / shellSideFluidDynamicViscocity, 0.14)
        // setShellSideFilmHeat(hs.toFixed(6))
        // const P = (tubeOT - tubeIT) / (shellIT - tubeIT)
        // const R = (shellIT - shellOT) / (tubeOT - tubeIT)
        // //Correction F
        // const F = 1
        // setCorrectionFactor(F.toFixed())

        // // Tube side heat transfer coefficient
        // // temperature difference
        // const LMTD = (difference(shellIT, shellOT) - difference(tubeIT, tubeOT)) / (Math.log(difference(shellIT, shellOT) / difference(tubeIT, tubeOT)))
        // setLogMeanTemDif(LMTD.toFixed(4))

        // const At = Math.PI / 4 * Math.pow(tubeInnerD, 2)
        // // Tube metal cross sectional area
        // const Atp = At * numberTube
        // setTubeMetalSecAreaAllTube(Atp.toFixed(6))
        // // tube side fluid velocity
        // const Ut = (tubeMFR) / (tubeD * Atp)
        // setTubeSideFuildV(Ut.toFixed(6))
        // const Ret = (tubeD * Ut * tubeInnerD) / tubeDV
        // setTubeSideRN(Ret.toFixed(6))
        // const ft = Math.pow(1.58 * Math.log(Ret) - 3.28, -2)
        // const Nut = ((ft / 2) * Ret * tubePN) / (1.07 + (12.7 * Math.pow((ft / 2), 1 / 2)) * (Math.pow(TPN, 2 / 3) - 1))
        // setTubeSideNN(Nut.toFixed(6))
        // const hi = Nut * (tubeTC / tubeInnerD)
        // setshellsideFHC(hi.toFixed(4))
        // const Uc = 1 / (1 / hs + ((1 / hi) * (tubeOuterD / tubeInnerD)) + (tubeOuterD / (2 * tubeMaterialThermalConductivity)) * Math.log(tubeOuterD / tubeInnerD))

        // setOverallHeatTCCHE(Uc.toFixed(6))

        // const Q = (shellMFR) * shellSHC * (shellIT - shellOT)
        // setHeatdutyHE(Q.toFixed(6))
        // const A = (Q / (Uc * 1 * LMTD))
        // setCleanHeatTransferSA(A.toFixed(6))
        // const L = A / (numberTube * Math.PI * tubeOuterD)
        // setLengthCleanHE(L.toFixed(6))
        // const Nb = (L / centralBaffleSpacing) - 1
        // const fs = Math.exp(0.576 - (0.19 * Math.log(res)))
        // // Tube Side Pressure Drop
        // const deltaPt = (4 * ft * ((L * numberPasses) / tubeInnerD) + 4 * numberPasses) * ((tubeD * Math.pow(Ut, 2)) / 2)
        // setTubesidePressureDrop(deltaPt.toFixed(6))
        // const Ntcc = (shellInnerDiameter / tubePitch) * (1 - (2 * baffleCut / 100))
        // const Lbb = 0.012 + (0.05 * shellInnerDiameter)
        // const Dctl = Number(shellInnerDiameter) - (Number(Lbb) + Number(tubeOuterD))
        // const Ntcw = (0.8 / tubePitch) * (shellInnerDiameter * (baffleCut / 100) - (shellInnerDiameter - Dctl) / 2)
        // const deltaPbi = 4 * fs * (Math.pow(gs, 2) / (2 * shellD)) * Math.pow(shellSideFluidDynamicViscocity / shellDV, 0.14) * Ntcc
        // const Sm = centralBaffleSpacing * (Lbb + (Dctl / tubePitch) * (tubePitch - tubeOuterD))
        // const Qds = 2 * Math.acos(1 - (2 * (baffleCut / 100))) * (180 / Math.PI)
        // const Swg = (Math.PI / 4) * (Math.pow(shellInnerDiameter, 2)) * ((Qds / 360) - (Math.sin(Qds) / (2 * Math.PI)))
        // const Qctl = 2 * Math.acos(shellInnerDiameter / Dctl * (1 - (2 * baffleCut / 100))) * (180 / Math.PI)
        // const Fw = (Qctl / 360) - (Math.sin(Qctl) / (2 * Math.PI))
        // const Swt = numberTube * Fw * (Math.PI / 4 * Math.pow(tubeOuterD, 2))
        // const Sw = Swg - Swt
        // const mw = (shellMFR) / (Math.sqrt((Sm * Sw)))
        // const Rl = 0.4
        // const Rb = 0.6
        // const deltaPc = deltaPbi * (Nb - 1) * Rl * Rb
        // setPressurDICFS(deltaPc)
        // const deltaPw = Nb * ((2 + 0.6 * Ntcw) * ((Math.pow(mw, 2)) / (2 * shellD)) * (Math.pow(10, -3))) * Rl
        // setPressurAW(deltaPw)
        // const Rs = 2
        // const deltaPe = deltaPbi * (1 + (Ntcw / Ntcc)) * Rb * Rs
        // setPressurEF(deltaPe)

        // // shell side Total Pressure Drop
        // const deltaPs = Number(deltaPc) + Number(deltaPw) + Number(deltaPe)
        // setShellSideTPD(deltaPs)
        // //Flow-Induced Vibration Checks
        // // Moment of Inertia
        // const I = Math.PI / 64 * (Math.pow(tubeOuterD, 4) - Math.pow(tubeInnerD, 4))
        // // Crippling Load Fcr
        // const l = tubeUnsupportedLength
        // const E = tubeYoungModule * Math.pow(10, 9)
        // const Fcr = (Math.pow(Math.PI, 2) * (E) * I) / Math.pow(l, 2)
        // setCriplingLoad(Fcr.toFixed(6))
        // // Tube Metal Cross Sectional area At
        // const Att = Math.PI / 4 * (Math.pow(tubeOuterD, 2) - Math.pow(tubeInnerD, 2))
        // setTubeMetalCrossSectionalArea(Att.toFixed(6))
        // // Tube Axial Stress Multiplier (S)
        // const St = tubeLongitudeStress * Math.pow(10, 6)
        // const S = Math.pow(1 + ((St * Att) / Fcr), 0.5)
        // setTubeAxialStressMultipllier(S.toFixed(6))
        // // Tube Fluid Mass Per Unit Length
        // const mfi = 0.00545 * tubeD * Math.pow(tubeInnerD, 2)
        // settubeFluidMPUL(mfi)
        // const mfo = 0.00545 * tubeD * Math.pow(tubeOuterD, 2)
        // settubeFluidMDPUL(mfo)
        // const Hm = addedMassCoefficient * mfo
        // sethydrodynamicMPUL(Hm)
        // //const mt = tubeD * Ut * A * numberTube
        // const mt = metalMassUnitLenght

        // // Effective Tube Mass Per Unit Length(mo)
        // const mo = Number(mt) + Number(mfi) + Number(Hm)
        // seteffectiveTubeMPUL(mo)

        // const C = 9.9

        // // Tube Natural Frequency (fn)
        // const fn = 10.838 * ((S * C) / Math.pow(l, 2)) * Math.pow(((E * I) / mo), 0.5)
        // setTubeNaturalFrequency(fn.toFixed(6))
        // // Damping Constant (St)
        // const Stt = 3.41 * (tubeOuterD / (mo * fn))
        // setDampingConstant(Stt.toFixed(6))
        // // Fluid Elastic Parameter (x)
        // const x = 144 * (mo * Stt / (tubeD * Math.pow(tubeOuterD, 2)))
        // setFluidElasticParameter(x.toFixed(6))
        // // Critical Flow Velocity Factor (D)
        // const D = 2.10 * Math.pow(x, 0.15)
        // setcriticalFlowVelocityFactor(D.toFixed(6))
        // // Critical Flow Velocity (Vc)
        // const Vc = D * fn * tubeOuterD
        // setcriticalFlowvelocity(Vc.toFixed(6))
        // //Fouling
        // const Rft = Number(tubeOuterD * tubeFF / tubeInnerD) + Number(shellFF)
        // setTotalFoolingResistance(Rft)

        // const Uf = 1 / ((1 / Uc) + Rft)
        // setOverallHTCFHE(Uf.toFixed(6))
        // const Af = Q / (Uf * LMTD)
        // setFooledHTSA(Af.toFixed(6))
        // const OS = Uc / Uf
        // setOversurfaceDesign(OS.toFixed(6))
        // const Lf = Af / (numberTube * Math.PI * tubeOuterD)
        // setLengthFooledHE(Lf.toFixed(6))
        // const deltaPtf = ((4 * ft * (Lf / tubeInnerD)) + (4 * numberPasses)) * (tubeD * Math.pow(Ut, 2) / 2)
        // setTubeSIdeFPD(deltaPtf.toFixed(6))
        // const CF = Uf / Uc
        // setCleanlinessFactor(CF.toFixed(6))
        // setScreen("Result")
    }

    componentDidMount() {
        this.calculate();
    }

    render() {
        return (
            <div>
                <h1>Results muthafaka {this.state.calcResult.shellSideSecArea}</h1>
                <button className='calculate' onClick={this.props.handleNewCalc}>New Calculation</button>
                <button onClick={() => console.log(this.state)}>log state 2</button>
            </div>
        )
    }
}

export default RatingResult;