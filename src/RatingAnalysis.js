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
        ShellIT: 0,
        ShellOT: 0,
        ShellMFR: 0,
        ShellSHC: 0,
        ShellDV: 0,
        ShellTC: 0,
        ShellD: 0,
        ShellFF: 0,
        //ShellPN: 0, //not filled in form
        // Constant for tube
        TubeIT: 0,
        TubeOT: 0,
        TubeMFR: 0,
        TubeSHC: 0,
        TubeDV: 0,
        TubeTC: 0,
        TubeD: 0,
        TubeFF: 0,
        //TubePN: 0, //not filled in form
        // Constant for Constraints and physical Dimensions
        InnerD: 0,
        OuterD: 0,
        TubePitch: 0,
        NumberTube: 0,
        NumberPasses: 0,
        LayoutAngle: 0,
        ShellInnerDiameter: 0,
        BaffleCut: 0,
        CentralBaffleSpacing: 0,
        Clearance: 0,
        ShellSideFluidDynamicViscocity: 0,
        TubeMaterialThermalConductivity: 0,
        // Constant for material design
        TubeUnsupportedLength: 0,
        TubeYoungModule: 0,
        TubeLongitudeStress: 0,
        AddedMassCoefficient: 0,
        MetalMassUnitLength: 0,
      },
      isSubmitted: false
    };
  }

  //to be passed into RatingForm component, 
  //to extract data from the form into the state here
  handleSubmit(value) {
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
        {this.state.isSubmitted ? < RatingResult formData={this.state} handleNewCalc={this.handleNewCalc}/>
        :
        < RatingForm formData={this.state} handleSubmit={this.handleSubmit} />
        }               
        <button onClick={() => console.log(this.state)}>log state</button>
      </div>
    );
  }
}
export default Rating_Form;