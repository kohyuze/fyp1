import React from 'react';
import SizingForm from './SizingForm';
import SizingResult from './SizingResult';




class Sizing_Form extends React.Component {
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
                // Constant for tube
                tubeIT: 0,
                tubeOT: 0,
                tubeMFR: 0,
                tubeSHC: 0,
                //Constraints and Physical Dimensions
                tubeOuterD: 0,
                tubeLOconstant: 0,
                numberTube: 0,
                centralBaffleSpacing: 0,
                clearance: 0,
                numberPasses: 0,
                //Fouling Attributes
                overSurfaceDesign: 0,
                overallHeatTCCHE: 0,
            },
            isSubmitted: false,
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
        {this.state.isSubmitted ? < SizingResult formData={this.state.formData} handleNewCalc={this.handleNewCalc}/>
        :
        < SizingForm formData={this.state} handleSubmit={this.handleSubmit} />
        }               
        <button onClick={() => console.log(this.state)}>log state</button>
      </div>
    );
  }
}
export default Sizing_Form;