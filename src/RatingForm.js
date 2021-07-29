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

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return ( //do something about the styling pls
      <div className="form">
        {/* <label htmlFor={props.id || props.name}>{label}</label> */}
        <select className="input" {...field} {...props} />
        {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
      </div>
    );
  };

class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        //this.state = { formData: {} }; //not sure whether this is used
    }
    render() {
        //const formData = this.props; //not sure if this is used
        return (
            <div className='ratingContainer' >
                <h1 className='pageHeader'>Rating Analysis</h1>
                {/* the error message sucks, pls fix in future */}
                <Formik
                    initialValues={{ shellIT: '', shellOT: '', shellMFR: '' }}//dk why i dun need to put all the variables here
                    validationSchema={
                        Yup.object({
                            shellIT: Yup.number().required('Required'),
                            shellOT: Yup.number().required('Required'),
                            shellMFR: Yup.number().required('Required'),
                            shellSHC: Yup.number().required('Required'),
                            shellDV: Yup.number().required('Required'),
                            shellTC: Yup.number().required('Required'),
                            shellD: Yup.number().required('Required'),
                            shellFF: Yup.number().required('Required'),
                            tubeIT: Yup.number().required('Required'),
                            tubeOT: Yup.number().required('Required'),
                            tubeMFR: Yup.number().required('Required'),
                            tubeSHC: Yup.number().required('Required'),
                            tubeDV: Yup.number().required('Required'),
                            tubeTC: Yup.number().required('Required'),
                            tubeD: Yup.number().required('Required'),
                            tubeFF: Yup.number().required('Required'),
                            tubeInnerD: Yup.number().required('Required'),
                            tubeOuterD: Yup.number().required('Required'),
                            tubePitch: Yup.number().required('Required'),
                            numberTube: Yup.number().required('Required'),
                            numberPasses: Yup.number().required('Required'),
                            layoutAngle: Yup.number().required('Required'),
                            shellInnerDiameter: Yup.number().required('Required'),
                            baffleCut: Yup.number().required('Required'),
                            centralBaffleSpacing: Yup.number().required('Required'),
                            clearance: Yup.number().required('Required'),
                            shellSideFluidDynamicViscocity: Yup.number().required('Required'),
                            tubeMaterialThermalConductivity: Yup.number().required('Required'),
                            tubeUnsupportedLength: Yup.number().required('Required'),
                            tubeYoungModule: Yup.number().required('Required'),
                            tubeLongitudeStress: Yup.number().required('Required'),
                            addedMassCoefficient: Yup.number().required('Required'),
                            metalMassUnitLength: Yup.number().required('Required'),

                        })
                    }
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.handleSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    <Form>
                        <h2 className='categoryHeader'>Shell Side Fluid</h2>
                        <MyTextInput
                            label="Inlet Temperature" //text infront of box
                            name="shellIT" //name inside the JSON object
                            type="text"
                            placeholder="Inlet Temperature" //placeholder text inside box
                            unit="°C"
                        />
                        <MyTextInput
                            label="Outlet Temperature"
                            name="shellOT"
                            type="text"
                            placeholder="Outlet Temperature"
                            unit="°C"
                        />
                        <MyTextInput
                            label="Mass Flow Rate"
                            name="shellMFR"
                            type="text"
                            placeholder="Mass Flow Rate"
                            unit="kg/s"
                        />
                        <MyTextInput
                            label="Specific Heat Capacity"
                            name="shellSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        />
                        <MyTextInput
                            label="Dynamic Viscosity"
                            name="shellDV"
                            type="text"
                            placeholder="Dynamic Viscosity"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Thermal Conductivity"
                            name="shellTC"
                            type="text"
                            placeholder="Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <MyTextInput
                            label="Density"
                            name="shellD"
                            type="text"
                            placeholder="Density"
                            unit="kg/m³"
                        />
                        <MyTextInput
                            label="Fouling Factor"
                            name="shellFF"
                            type="text"
                            placeholder="Fouling Factor"
                            unit="m².K/W"
                        />
                        <h2 className='categoryHeader'>Tube Side Fluid</h2>
                        <MyTextInput
                            label="Inlet Temperature" //text infront of box
                            name="tubeIT" //name inside the JSON object
                            type="text"
                            placeholder="Inlet Temperature" //placeholder text inside box
                            unit="°C"
                        />
                        <MyTextInput
                            label="Outlet Temperature"
                            name="tubeOT"
                            type="text"
                            placeholder="Outlet Temperature"
                            unit="°C"
                        />
                        <MyTextInput
                            label="Mass Flow Rate"
                            name="tubeMFR"
                            type="text"
                            placeholder="Mass Flow Rate"
                            unit="kg/s"
                        />
                        <MyTextInput
                            label="Specific Heat Capacity"
                            name="tubeSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        />
                        <MyTextInput
                            label="Dynamic Viscosity"
                            name="tubeDV"
                            type="text"
                            placeholder="Dynamic Viscosity"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Thermal Conductivity"
                            name="tubeTC"
                            type="text"
                            placeholder="Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <MyTextInput
                            label="Density"
                            name="tubeD"
                            type="text"
                            placeholder="Density"
                            unit="kg/m³"
                        />
                        <MyTextInput
                            label="Fouling Factor"
                            name="tubeFF"
                            type="text"
                            placeholder="Fouling Factor"
                            unit="m².K/W" 
                        />
                        <h2 className='categoryHeader'>Constrains and Physical Dimensions</h2>
                        <MyTextInput
                            label="Tube Inner Diameter"
                            name="tubeInnerD"
                            type="text"
                            placeholder="Tube Inner Diameter"
                            unit="m"
                        />
                        <MyTextInput
                            label="Tube Outer Diameter"
                            name="tubeOuterD"
                            type="text"
                            placeholder="Tube Outer Diameter"
                            unit="m"  
                        />
                        <MyTextInput
                            label="Tube Pitch"
                            name="tubePitch"
                            type="text"
                            placeholder="Tube Pitch"
                            unit="m"
                        />
                        <MyTextInput
                            label="Number of Tubes"
                            name="numberTube"
                            type="text"
                            placeholder="Number of Tubes"
                            unit="-"
                        />
                        <MyTextInput
                            label="Number of Passes"
                            name="numberPasses"
                            type="text"
                            placeholder="Number of Passes"
                            unit="-"
                        />                        
                        <MySelect label="Layout Angle" name="layoutAngle">
                            <option value="">Select a Layout Angle</option>
                            <option value="30">30°</option>
                            <option value="45">45°</option>
                            <option value="90">90°</option>
                        </MySelect>
                        <MyTextInput
                            label="Shell Inner Diameter"
                            name="shellInnerDiameter"
                            type="text"
                            placeholder="Shell Inner Diameter"
                            unit="m"
                        />
                        <MyTextInput
                            label="Baffle Cut"
                            name="baffleCut"
                            type="text"
                            placeholder="Baffle Cut"
                            unit="%"
                        />
                        <MyTextInput
                            label="Central Baffles Spacing"
                            name="centralBaffleSpacing"
                            type="text"
                            placeholder="Central Baffles Spacing"
                            unit="m"
                        />
                        <MyTextInput
                            label="Clearance"
                            name="clearance"
                            type="text"
                            placeholder="Clearance"
                            unit="m"
                        />
                        <MyTextInput
                            label="Shell Side Fluid Dynamic Viscosity at wall"
                            name="shellSideFluidDynamicViscocity"
                            type="text"
                            placeholder="Shell Side Fluid Dynamic Viscosity at wall"
                            unit="Pa.s"
                        />
                        <MyTextInput
                            label="Tube Material Thermal Conductivity"
                            name="tubeMaterialThermalConductivity"
                            type="text"
                            placeholder="Tube Material Thermal Conductivity"
                            unit="W/m.K"
                        />
                        <h2 className='categoryHeader'>Mechanical Design (Both ends are supported)</h2>
                        <MyTextInput
                            label="Tube Unsupported Length"
                            name="tubeUnsupportedLength"
                            type="text"
                            placeholder="Tube Unsupported Length"
                            unit="m"
                        />
                        <MyTextInput
                            label="Tube Young's Modules"
                            name="tubeYoungModule"
                            type="text"
                            placeholder="Tube Young's Modules"
                            unit="GPa"
                        />
                        <MyTextInput
                            label="Tube Longitudinal Stress"
                            name="tubeLongitudeStress"
                            type="text"
                            placeholder="Tube Longitudinal Stress"
                            unit="MPa"
                        />
                        <MyTextInput
                            label="Added Mass Coefficient"
                            name="addedMassCoefficient"
                            type="text"
                            placeholder="Added Mass Coefficient"
                            unit="-"
                        />
                        <MyTextInput
                            label="Metal Mass Per Unit Length"
                            name="metalMassUnitLength"
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