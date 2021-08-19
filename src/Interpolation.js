

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
import { callAndCheck } from '@tensorflow/tfjs-backend-webgl/dist/webgl_util'


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
            specificHeat: 0,
            isSubmitted: false
        };
    };
    // componentDidMount() {
    //     this.setState({ specificHeat: 0 }); //reset it to zero every time we refresh
    // }

    calculateSpecHeat = (temp) => {
        this.setState({ specificHeat: 0 }); //reset it to zero every time we refresh
        dfd.read_csv("https://raw.githubusercontent.com/kohyuze/fluid-properties/main/SteamTable")
            .then(df => {
                //first we read the entire steam table, then we pick out only the temp and specHeatL columns
                let sub_df = df.loc({ columns: ["temp", "specHeatL"] })
                //sub_df.head().print()
                //sub_df.iloc({rows:[2]}).print();
                //console.log(Number(sub_df.iloc({rows:[2]}).col_data[0]))

                //find the row in the steam table with the temperature
                let j = 0;
                while (temp > Number(sub_df.iloc({rows:[j]}).col_data[0])){j++}
                sub_df.iloc({rows:[j-1,j]}).print();

                //interpolation
                let x = temp
                let x1 = Number(sub_df.iloc({rows:[j-1]}).col_data[0])
                let x2 = Number(sub_df.iloc({rows:[j]}).col_data[0])
                let y1 = Number(sub_df.iloc({rows:[j-1]}).col_data[1])
                let y2 = Number(sub_df.iloc({rows:[j]}).col_data[1])

                let y = y1 + ((x-x1)*(y2-y1)/(x2-x1));   
                console.log("interpolated value:" + y) 
                this.setState({ specificHeat: y })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className='ratingContainer'>

                {this.state.isSubmitted ?
                    <div>
                        <h2>The interpolated specific heat is {this.state.specificHeat}J/kg·K</h2>
                        <button className='calculate' onClick={()=>this.setState({ isSubmitted: false })}>Back</button>
                    </div>
                    :
                    <Formik
                        initialValues={{ water: '' }}//dk why i dun need to put all the variables here
                        validationSchema={
                            Yup.object({
                                water: Yup.number().required('Required'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values.water);
                            this.calculateSpecHeat(values.water);
                            this.setState({ isSubmitted: true })
                            setSubmitting(false);
                        }}
                    >
                        <Form>


                            <h2 className='categoryHeader'>Input temperature of water, it'll return the specific heat.</h2>
                            <MyTextInput
                                label="Water Temperature" //text infront of box
                                name="water" //name inside the JSON object
                                type="text"
                                placeholder="Water Temperature" //placeholder text inside box
                                unit="°C"
                            />
                            <button className='calculate' type="submit">Calculate</button>
                            {/* button is not done, dk what to do with it yet */}
                        </Form>
                    </Formik >
                }
            </div>
        )
    }
}

export default Interpolation;