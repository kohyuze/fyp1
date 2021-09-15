import React from 'react';
import WCForm from './WCForm';
import WCResult from './WCResult';
import * as dfd from 'danfojs/src/index';

class WC_Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this); //this line here is rly needed
        this.handleNewCalc = this.handleNewCalc.bind(this);
        this.state = {
            // constants for shell
            shellIT: 0,
            shellOT: 0,
            shellMFR: 0,
            shellD: 0,
            shellSHC: 0,
            shellKV: 0,
            shellTC: 0,
            // Constant for tube
            tubeIT: 0,
            tubeOT: 0,
            tubeMFR: 0,
            tubeD: 0,
            tubeSHC: 0,
            tubeKV: 0,
            tubeTC: 0,
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
            isSubmitted: false,
        };
    }

    handleNewCalc(){
        this.setState({ isSubmitted: false })
    }

    interpolate(x, x1, x2, y1, y2){
        return (y1 + ((x - x1) * (y2 - y1) / (x2 - x1)));
    }

    //returns an array [density, specificHeat, kinematicVis, heatConductivity]
    fetchProperties(inlet, outlet, callback){
        let averageTemp = (Number(inlet) + Number(outlet)) / 2;
        console.log(inlet, outlet, averageTemp);

        dfd.read_csv("https://raw.githubusercontent.com/kohyuze/fluid-properties/main/SteamTable")
            .then(df => {
                //first we read the entire steam table, then we pick out only the temp and specific columns
                let sub_df = df.loc({ columns: ["temp", "densityL", "specHeatL", "dynamicViscL", "therCondL"] })
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
                let specificHeat = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[2]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[2])
                )
                let dynamicVis = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[3]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[3])
                )
                let kinematicVis = dynamicVis / density;
                let therConductivity = this.interpolate(
                    averageTemp,
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[0]),
                    Number(sub_df.iloc({ rows: [j - 1] }).col_data[4]),
                    Number(sub_df.iloc({ rows: [j] }).col_data[4])
                )
                const Properties = [density,specificHeat,kinematicVis,therConductivity];
                console.log(Properties)
                callback(Properties);              
            }).catch(err => {
                console.log(err);
            })            
        }
    
    handleSubmit(value){
        for (var property in value) {
            value[property] = parseFloat(value[property]) //this loop converts all the data input into float so we can do arithmetic
        }
        this.setState(value);
        this.setState({ isSubmitted: true })
        //upon submission, this will toggle and the ternary operator in render() will display the corresponding page

        //callback feature ensures the data is fetched before updating the state
        this.fetchProperties(this.state.shellIT, this.state.shellOT, (shellProperties)=>{
            this.setState({ ...this.state, shellD: shellProperties[0] })
            this.setState({ ...this.state, shellSHC: shellProperties[1] })
            this.setState({ ...this.state, shellKV: shellProperties[2] })
            this.setState({ ...this.state, shellTC: shellProperties[3] })
        })
        this.fetchProperties(this.state.tubeIT, this.state.tubeOT, (tubeProperties)=>{
            this.setState({ ...this.state, tubeD: tubeProperties[0] })
            this.setState({ ...this.state, tubeSHC: tubeProperties[1] })
            this.setState({ ...this.state, tubeKV: tubeProperties[2] })
            this.setState({ ...this.state, tubeTC: tubeProperties[3] })
        })
    }


    render() {
        return (
            <div className='ratingContainer'>
                {this.state.isSubmitted ? < WCResult formData={this.state} handleNewCalc={this.handleNewCalc} />
                    :
                    < WCForm formData={this.state} handleSubmit={this.handleSubmit} />
                }
                <button onClick={() => console.log(this.state)}>log state</button>
            </div>
        );
    }
}
export default WC_Analysis;