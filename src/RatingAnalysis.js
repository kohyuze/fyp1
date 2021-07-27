import React, { useState, Component } from 'react';
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
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
class RatingAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShellIT: 0,
      ShellOT: 0,
      ShellMFR: 0,
    };
  }

  render() {
    return (
      <div className='ratingContainer'>
        <h1 className='pageHeader'>Rating Analysis</h1>
        <h2 className='categoryHeader'>Shell Side Fluid</h2>
        {/* this form is done using formik */}
        <Formik
          initialValues={{ ShellIT: '', ShellOT: '', ShellMFR: '' }}
          validationSchema={Yup.object({
            ShellIT: Yup.number().required('Required'),
            ShellOT: Yup.number().required('Required'),
            ShellMFR: Yup.number().required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.setState(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <MyTextInput
              label="Inlet Temperature" //text infront of box
              name="ShellIT" //name inside the JSON object
              type="text"
              placeholder="Inlet Temperature" //placeholder text inside box
              unit="C"
            />

            <MyTextInput
              label="Outlet Temperature"
              name="ShellOT"
              type="text"
              placeholder="Outlet Temperature"
              unit="C"
            />

            <MyTextInput
              label="Mass Flow Rate"
              name="ShellMFR"
              type="text"
              placeholder="Mass Flow Rate"
              unit="C"
            />

            <button className='calculate' type="submit">Calculate</button>
            {/* button is not done, dk what to do with it yet */}
          </Form>
        </Formik>

        <button onClick={() => console.log(this.state)}>log state</button>
      </div>
    );
  }
}
export default RatingAnalysis;