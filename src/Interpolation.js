

// workflow:
// add the fluid properties table to github as a csv File
// import using danfo
// follow the logic here to do the Interpolation
// need to settle what happens when the temperature input is lower than freezing point 
// and higher than critical point

import React from 'react';
import * as dfd from 'danfojs/src/index';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// import { callAndCheck } from '@tensorflow/tfjs-backend-webgl/dist/webgl_util'


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


class Interpolation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inletTemp: 0,
            outletTemp: 0,
            density: 0,
            specificHeat: 0,
            dynamicVis: 0,
            kinematicVis: 0,
            heatConductivity: 0,
            isSubmitted: false
        };
    };
    // componentDidMount() {
    //     this.setState({ specificHeat: 0 }); //reset it to zero every time we refresh
    // }

    interpolate = (x, x1, x2, y1, y2) => {
        return (y1 + ((x-x1)*(y2-y1)/(x2-x1)));
    }

    fetchProperties = (inlet, outlet) => {
        let averageTemp = (Number(inlet)+Number(outlet))/2;
        console.log(inlet, outlet, averageTemp);
        this.setState({ 
            density: 0,
            specificHeat: 0,
            dynamicVis: 0,
            kinematicVis: 0,
            heatConductivity: 0, 
        }); //reset them to zero every time we refresh
        dfd.read_csv("https://raw.githubusercontent.com/kohyuze/fluid-properties/main/SteamTable")
            .then(df => {
                //first we read the entire steam table, then we pick out only the temp and specific columns
                let sub_df = df.loc({ columns: ["temp","densityL","specHeatL","dynamicViscL","therCondL"] })
                // sub_df.head().print()
                // sub_df.iloc({rows:[2]}).print();
                // console.log(Number(sub_df.iloc({rows:[2]}).col_data[0]))

                //find the row in the steam table with the temperature
                let j = 0;
                while (averageTemp > Number(sub_df.iloc({ rows: [j] }).col_data[0])) { j++ }
                sub_df.iloc({ rows: [j - 1, j] }).print();

                let density = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[1]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[1])
                )
                this.setState({ density: density })
                let specificHeat = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[2]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[2])
                )
                this.setState({ specificHeat: specificHeat })
                let dynamicVis = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[3]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[3])
                )
                this.setState({ dynamicVis: dynamicVis })
                let kinematicVis = this.state.dynamicVis/this.state.density;
                this.setState({ kinematicVis: kinematicVis })
                let heatConductivity = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[4]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[4])
                )
                this.setState({ heatConductivity: heatConductivity })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className='ratingContainer'>

                {this.state.isSubmitted ?
                    <div>
                        <h2>Density: {this.state.density}kg/m³</h2>
                        <h2>Specific Heat: {this.state.specificHeat}J/kg·K</h2>
                        <h2>Kinematic Viscosity: {this.state.kinematicVis}m²/s</h2>
                        <h2>Conductivity: {this.state.heatConductivity}W/m·K</h2>
                        <button className='calculate' onClick={()=>this.setState({ isSubmitted: false })}>Back</button>
                    </div>
                    :
                    <Formik
                        initialValues={{ inletTemp: '' , outletTemp: ''}}//dk why i dun need to put all the variables here
                        validationSchema={
                            Yup.object({
                                inletTemp: Yup.number().required('Required'),
                                outletTemp: Yup.number().required('Required'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values.water);
                            this.fetchProperties(values.inletTemp, values.outletTemp);
                            this.setState({ isSubmitted: true })
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            <h2 className='categoryHeader'>Input temperature of water, it'll return the specific heat.</h2>
                            <MyTextInput
                                label="Inlet Temperature" //text infront of box
                                name="inletTemp" //name inside the JSON object
                                type="text"
                                placeholder="Inlet Temperature" //placeholder text inside box
                                unit="°C"
                            />
                            <MyTextInput
                                label="Outlet Temperature" //text infront of box
                                name="outletTemp" //name inside the JSON object
                                type="text"
                                placeholder="Outlet Temperature" //placeholder text inside box
                                unit="°C"
                            />
                            <button className='calculate' type="submit">Fetch</button>
                            {/* button is not done, dk what to do with it yet */}
                        </Form>
                    </Formik >
                }
            </div>
        )
    }
}

export default Interpolation;