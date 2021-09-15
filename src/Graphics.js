import React from 'react';
import A_1 from './Resources/A_1.png'
import E from './Resources/E.png'
import L_1 from './Resources/L_1B.png'

class Graphics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "tab-1", //default tab is tab1
      tubeNo: 10,
    };
  }

  //switches the tabs
  onClick = e => {
    this.setState({ currentTab: e.target.id });
  }

  render() {
    const tubes=[];
    for (let i = 0; i < this.state.tubeNo; i++) {
      tubes.push(<div className="tube"></div>)
    }
    return (
      <div>
        <div className="graphics_container">
          {/* try see if you can do all this with a switch statement  */}
          <div className={`HX_container ${this.state.currentTab === "tab-1" ? "" : "hide"}`}>
            <img src={A_1} alt="A head" className='head' />
            <img src={E} alt="E Shell" className='shell' />
            <img src={L_1} alt="L Rear" className='rear' />
          </div>

          <div className={`cross-section ${this.state.currentTab === "tab-2" ? "" : "hide"}`}>
            <div className="big_circle">
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
              <div className="tube-row">{tubes}</div>
            </div>
          </div>

          <div className={`HX_shell ${this.state.currentTab === "tab-3" ? "" : "hide"}`}>
            <img src={E} alt="E Shell" className='shell' />
          </div>
        </div>






        <section className="tabs">
          <div className="container">
            <div id="tab-1" className={`tab-item ${this.state.currentTab === "tab-1" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-1">General Configuration/Fluids</p>
            </div>
            <div id="tab-2" className={`tab-item ${this.state.currentTab === "tab-2" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-2">Tube Configurations</p>
            </div>
            <div id="tab-3" className={`tab-item ${this.state.currentTab === "tab-3" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-3">Shell Configurations</p>
            </div>
          </div>
        </section>

        <section className="tab-content">
          <div className="container">
            <div id="tab-1-content" className={`tab-content-item ${this.state.currentTab === "tab-1" ? "show" : ""}`}>
              <div className="tab-1-content-inner">
                <div>
                  <p className="text-lg">Tab 1</p>
                </div>
              </div>
            </div>

            <div id="tab-2-content" className={`tab-content-item ${this.state.currentTab === "tab-2" ? "show" : ""}`}>
              <div className="tab-2-content-top">
                <p className="text-lg">Tab 2</p>
              </div>
            </div>
            <div id="tab-3-content" className={`tab-content-item ${this.state.currentTab === "tab-3" ? "show" : ""}`}>
              <div className="text-center">
                <p className="text-lg">Tab 3</p>
              </div>
            </div>
          </div>

        </section>


      </div>
    );
  }
}
export default Graphics;