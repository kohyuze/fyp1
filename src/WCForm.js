import React from 'react';
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

class WC_Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='ratingContainer' >
                <h1 className='pageHeader'>WaterCoolerSizing</h1>
                {/* the error message sucks, pls fix in future */}
                <Formik
                    initialValues={{ shellIT: '', shellOT: '', shellMFR: '' }}//dk why i dun need to put all the variables here
                    validationSchema={
                        Yup.object({
                            shellIT: Yup.number().required('Required'),
                            shellOT: Yup.number().required('Required'),
                            shellMFR: Yup.number().required('Required'),
                            // shellSHC: Yup.number().required('Required'),
                            
                            tubeIT: Yup.number().required('Required'),
                            tubeOT: Yup.number().required('Required'),
                            tubeMFR: Yup.number().required('Required'),
                            // tubeSHC: Yup.number().required('Required'),
                            
                            // tubeOuterD: Yup.number().required('Required'),
                            // tubeLOconstant: Yup.number().required('Required'),
                            // numberTube: Yup.number().required('Required'),  
                            // centralBaffleSpacing: Yup.number().required('Required'),
                            // clearance: Yup.number().required('Required'),      
                            // numberPasses: Yup.number().required('Required'),
                            // overSurfaceDesign: Yup.number().required('Required'),
                            // overallHeatTCCHE: Yup.number().required('Required'),
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
                        {/* <MyTextInput
                            label="Specific Heat Capacity"
                            name="shellSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        /> */}
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
                        {/* <MyTextInput
                            label="Specific Heat Capacity"
                            name="tubeSHC"
                            type="text"
                            placeholder="Specific Heat Capacity"
                            unit="J/kg.K"
                        /> */}
                        {/* <h2 className='categoryHeader'>Constrains and Physical Dimensions</h2>
                        <MyTextInput
                            label="Tube Outer Diameter"
                            name="tubeOuterD"
                            type="text"
                            placeholder="Tube Outer Diameter"
                            unit="m"  
                        />
                        <MySelect label="Tube Layout Geometry" name="tubeLOconstant">
                            <option value="">Tube Layout Geometry</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </MySelect>
                        <MyTextInput
                            label="Number of Tubes"
                            name="numberTube"
                            type="text"
                            placeholder="Number of Tubes"
                            unit="-"
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
                        <MySelect label="Number of Tube Pass(es)" name="numberPasses">
                            <option value="">Number of Tube Pass(es)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </MySelect> */}
                        {/* <h2 className='categoryHeader'>Fouling Attributes</h2> 
                        <MyTextInput
                            label="Surface Overdesign"
                            name="overSurfaceDesign"
                            type="text"
                            placeholder="Surface Overdesign"
                            unit="%"
                        />
                        <MyTextInput
                            label="Overall Heat Transfer Coefficient(Clean)"
                            name="overallHeatTCCHE"
                            type="text"
                            placeholder="Overall Heat Transfer Coefficient(Clean)"
                            unit="W/m².K"
                        /> */}

                        <button className='calculate' type="submit">Calculate</button>
                        {/* button is not done, dk what to do with it yet */}
                    </Form>
                </Formik >
            </div >
        );
    }
}

export default WC_Form;