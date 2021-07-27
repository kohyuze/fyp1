import React from 'react';
import RatingForm from './RatingForm';


class Rating_Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormData = this.handleFormData.bind(this); //this line here is rly needed
    this.state = { formData : {
      // constants for shell
      ShellIT: 0,
      ShellOT: 0,
      ShellMFR: 0,
      ShellSHC: 0,
      ShellDV: 0,
      ShellTC: 0,
      ShellD: 0,
      ShellFF: 0,
      // Constant for tube
      TubeIT: 0,
      TubeOT: 0,
      TubeMFR: 0,
      TubeSHC: 0,
      TubeDV: 0,
      TubeTC: 0,
      TubeD: 0,
      TubeFF: 0,
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
    }};
  }

  handleFormData(value){
    this.setState({formData: value});
  }
  

  render() {
    return (
      <div className='ratingContainer'>
        < RatingForm formData={this.state} onFormChange={this.handleFormData}/>
        <button onClick={() => console.log(this.state)}>log state</button>
      </div>
    );
  }
}
export default Rating_Form;