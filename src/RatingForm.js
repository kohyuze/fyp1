import React, { Component} from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';


const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            {/* <label htmlFor={props.id || props.name}>{label}</label> */}
            <div className="form">
                <input className="input" {...field} {...props} />
                <p className="units">{props.unit}</p>
                {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
            </div>

        </>
    );
};


class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state = { formData: {} };
    }
    render() {
        const formData = this.props.formData;
        return (
            <div className='ratingContainer' >
                <h1 className='pageHeader'>Rating Analysis</h1>
                {/* the error message sucks, pls fix in future */}
                <Formik
                    initialValues={{ ShellIT: '', ShellOT: '', ShellMFR: '' }}
                    validationSchema={
                        Yup.object({
                            ShellIT: Yup.number().required('Required'),
                            ShellOT: Yup.number().required('Required'),
                            ShellMFR: Yup.number().required('Required'),
                            ShellSHC: Yup.number().required('Required'),
                            ShellDV: Yup.number().required('Required'),
                            ShellTC: Yup.number().required('Required'),
                            ShellD: Yup.number().required('Required'),
                            ShellFF: Yup.number().required('Required'),
                            TubeIT: Yup.number().required('Required'),
                            TubeOT: Yup.number().required('Required'),
                            TubeMFR: Yup.number().required('Required'),
                            TubeSHC: Yup.number().required('Required'),
                            TubeDV: Yup.number().required('Required'),
                            TubeTC: Yup.number().required('Required'),
                            TubeD: Yup.number().required('Required'),
                            TubeFF: Yup.number().required('Required'),
                            TubeInnerD: Yup.number().required('Required'),
                            OuterD: Yup.number().required('Required'),
                            TubePitch: Yup.number().required('Required'),
                            NumberTube: Yup.number().required('Required'),
                            NumberPasses: Yup.number().required('Required'),
                            LayoutAngle: Yup.number().required('Required'),
                            ShellInnerDiameter: Yup.number().required('Required'),
                            BaffleCut: Yup.number().required('Required'),
                            CentralBaffleSpacing: Yup.number().required('Required'),
                            Clearance: Yup.number().required('Required'),
                            ShellSideFluidDynamicViscocity: Yup.number().required('Required'),
                            TubeMaterialThermalConductivity: Yup.number().required('Required'),
                            TubeUnsupportedLength: Yup.number().required('Required'),
                            TubeYoungModule: Yup.number().required('Required'),
                            TubeLongitudeStress: Yup.number().required('Required'),
                            AddedMassCoefficient: Yup.number().required('Required'),
                            MetalMassUnitLength: Yup.number().required('Required'),

                        })
                    }
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.onFormChange(values);
                        setSubmitting(false);
                    }}
                >
                    <Form>
                        <h2 className='categoryHeader'>Shell Side Fluid</h2>
                        <MyTextInput
                            label="Inlet Temperature" //text infront of box
                            name="ShellIT" //name inside the JSON object
                            type="text"
                            placeholder="Inlet Temperature" //placeholder text inside box
                            unit="°C"
                        />
                        <MyTextInput
                            label="Outlet Temperature"
                            name="ShellOT"
                            type="text"
                            placeholder="Outlet Temperature"
                            unit="°C"
                        />
                        <MyTextInput
                            label="Mass Flow Rate"
                            name="ShellMFR"
                            type="text"
                            placeholder="Mass Flow Rate"
                            unit="kg/s"
                        />
                        <MyTextInput
                            label="Specific Heat Capacity"
                            name="ShellSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        />
                        <MyTextInput
                            label="Dynamic Viscosity"
                            name="ShellDV"
                            type="text"
                            placeholder="Dynamic Viscosity"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Thermal Conductivity"
                            name="ShellTC"
                            type="text"
                            placeholder="Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <MyTextInput
                            label="Density"
                            name="ShellD"
                            type="text"
                            placeholder="Density"
                            unit="kg/m³"
                        />
                        <MyTextInput
                            label="Fouling Factor"
                            name="ShellFF"
                            type="text"
                            placeholder="Fouling Factor"
                            unit="m².K/W"
                        />
                        <h2 className='categoryHeader'>Tube Side Fluid</h2>
                        <MyTextInput
                            label="Inlet Temperature" //text infront of box
                            name="TubeIT" //name inside the JSON object
                            type="text"
                            placeholder="Inlet Temperature" //placeholder text inside box
                            unit="°C"
                        />
                        <MyTextInput
                            label="Outlet Temperature"
                            name="TubeOT"
                            type="text"
                            placeholder="Outlet Temperature"
                            unit="°C"
                        />
                        <MyTextInput
                            label="Mass Flow Rate"
                            name="TubeMFR"
                            type="text"
                            placeholder="Mass Flow Rate"
                            unit="kg/s"
                        />
                        <MyTextInput
                            label="Specific Heat Capacity"
                            name="TubeSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        />
                        <MyTextInput
                            label="Dynamic Viscosity"
                            name="TubeDV"
                            type="text"
                            placeholder="Dynamic Viscosity"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Thermal Conductivity"
                            name="TubeTC"
                            type="text"
                            placeholder="Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <MyTextInput
                            label="Density"
                            name="TubeD"
                            type="text"
                            placeholder="Density"
                            unit="kg/m³"
                        />
                        <MyTextInput
                            label="Fouling Factor"
                            name="TubeFF"
                            type="text"
                            placeholder="Fouling Factor"
                            unit="m².K/W"
                        />
                        <h2 className='categoryHeader'>Constrains and Physical Dimensions</h2>
                        <MyTextInput
                            label="Tube Inner Diameter"
                            name="TubeInnerD"
                            type="text"
                            placeholder="Tube Inner Diameter"
                            unit="m"
                        />
                        <MyTextInput
                            label="Tube Outer Diameter"
                            name="OuterD"
                            type="text"
                            placeholder="Tube Outer Diameter"
                            unit="m"
                        />
                        <MyTextInput
                            label="Tube Pitch"
                            name="TubePitch"
                            type="text"
                            placeholder="Tube Pitch"
                            unit="m"
                        />
                        <MyTextInput
                            label="Number of Tubes"
                            name="NumberTube"
                            type="text"
                            placeholder="Number of Tubes"
                            unit="-"
                        />
                        <MyTextInput
                            label="Number of Passes"
                            name="NumberPasses"
                            type="text"
                            placeholder="Number of Passes"
                            unit="-"
                        />
                        <MyTextInput
                            label="Layout Angle"
                            name="LayoutAngle"
                            type="text"
                            placeholder="Layout Angle"
                            unit="°"
                        />
                        <MyTextInput
                            label="Shell Inner Diameter"
                            name="ShellInnerDiameter"
                            type="text"
                            placeholder="Shell Inner Diameter"
                            unit="m"
                        />
                        <MyTextInput
                            label="Baffle Cut"
                            name="BaffleCut"
                            type="text"
                            placeholder="Baffle Cut"
                            unit="%"
                        />
                        <MyTextInput
                            label="Central Baffles Spacing"
                            name="CentralBaffleSpacing"
                            type="text"
                            placeholder="Central Baffles Spacing"
                            unit="m"
                        />
                        <MyTextInput
                            label="Clearance"
                            name="Clearance"
                            type="text"
                            placeholder="Clearance"
                            unit="m"
                        />
                        <MyTextInput
                            label="ShellSide Fluid Dynamic Viscosity at wall"
                            name="ShellSideFluidDynamicViscocity"
                            type="text"
                            placeholder="ShellSide Fluid Dynamic Viscosity at wall"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Tube Material Thermal Conductivity"
                            name="TubeMaterialThermalConductivity"
                            type="text"
                            placeholder="Tube Material Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <h2 className='categoryHeader'>Mechanical Design (Both ends are supported)</h2>
                        <MyTextInput
                            label="Tube Unsupported Length"
                            name="TubeUnsupportedLength"
                            type="text"
                            placeholder="Tube Unsupported Length"
                            unit="m"
                        />
                        <MyTextInput
                            label="Tube Young's Modules"
                            name="TubeYoungModule"
                            type="text"
                            placeholder="Tube Young's Modules"
                            unit="GPa"
                        />
                        <MyTextInput
                            label="Tube Longitudinal Stress"
                            name="TubeLongitudeStress"
                            type="text"
                            placeholder="Tube Longitudinal Stress"
                            unit="MPa"
                        />
                        <MyTextInput
                            label="Added Mass Coefficient"
                            name="AddedMassCoefficient"
                            type="text"
                            placeholder="Added Mass Coefficient"
                            unit="-"
                        />
                        <MyTextInput
                            label="Metal Mass Per Unit Length"
                            name="MetalMassUnitLength"
                            type="text"
                            placeholder="Metal Mass Per Unit Length"
                            unit="kg/m"
                        />

                        <button className='calculate' type="submit">Calculate</button>
                        {/* button is not done, dk what to do with it yet */}
                    </Form>
                </Formik >

            </div >
        );
    }
}

export default RatingForm;