import React from 'react';
import RatingForm from './RatingForm';
import RatingResult from './RatingResult';




class Rating_Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); //this line here is rly needed
    this.handleNewCalc = this.handleNewCalc.bind(this);
    this.state = {
      formData: {
        // constants for shell
        shellIT: 0,
        shellOT: 0,
        shellMFR: 0,
        shellSHC: 0,
        shellDV: 0,
        shellTC: 0,
        shellD: 0,
        shellFF: 0,
        //ShellPN: 0, //not filled in form
        // Constant for tube
        tubeIT: 0,
        tubeOT: 0,
        tubeMFR: 0,
        tubeSHC: 0,
        tubeDV: 0,
        tubeTC: 0,
        tubeD: 0,
        tubeFF: 0,
        //TubePN: 0, //not filled in form
        // Constant for Constraints and physical Dimensions
        tubeInnerD: 0,
        tubeOuterD: 0,
        tubePitch: 0,
        numberTube: 0,
        numberPasses: 0,
        layoutAngle: 0,
        shellInnerDiameter: 0,
        baffleCut: 0,
        centralBaffleSpacing: 0,
        clearance: 0,
        shellSideFluidDynamicViscocity: 0,
        tubeMaterialThermalConductivity: 0,
        // Constant for material design
        tubeUnsupportedLength: 0,
        tubeYoungModule: 0,
        tubeLongitudeStress: 0,
        addedMassCoefficient: 0,
        metalMassUnitLength: 0,
      },
      isSubmitted: false
    };
  }

  //to be passed into RatingForm component, 
  //to extract data from the form into the state here
  handleSubmit(value) {
    for(var property in value){
      value[property] = parseFloat(value[property]) //this loop converts all the data input into float so we can do arithmetic
    }
    this.setState({ formData: value });
    this.setState({ isSubmitted: true })
    //upon submission, this will toggle and the ternary operator in render() will display
    //the corresponding page
  }

  handleNewCalc() {
    this.setState({ isSubmitted: false })
  }

  render() {
    return (
      <div className='ratingContainer'>
        {this.state.isSubmitted ? < RatingResult formData={this.state.formData} handleNewCalc={this.handleNewCalc}/>
        :
        < RatingForm formData={this.state} handleSubmit={this.handleSubmit} />
        }               
        <button onClick={() => console.log(this.state)}>log state</button>
      </div>
    );
  }
}
export default Rating_Form;