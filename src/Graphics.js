import React from 'react';
import A_1 from './Resources/A_1.png'
import E from './Resources/E.png'
import L_1 from './Resources/L_1B.png'

class Graphics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "tab-1", //default tab is tab1
    };
  }

  //switches the tabs
  onClick = e => {
    this.setState({ currentTab: e.target.id });
  }


  render() {
    return (
      <div>

        <div className='HX_container'>
          <img src={A_1} alt="A head" className='head' />
          <img src={E} alt="E Shell" className='shell' />
          <img src={L_1} alt="L Rear" className='rear' />
        </div>

        <section class="tabs">
          <div class="container">
            <div id="tab-1" class={`tab-item ${this.state.currentTab === "tab-1" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-1" class="hide-sm">TEMA HX type</p>
            </div>
            <div id="tab-2" class={`tab-item ${this.state.currentTab === "tab-2" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-2" class="hide-sm">Fluids input</p>
            </div>
            <div id="tab-3" class={`tab-item ${this.state.currentTab === "tab-3" ? "tab-border" : ""}`} onClick={this.onClick}>
              <p id="tab-3" class="hide-sm">HX input</p>
            </div>
          </div>
        </section>

        <section class="tab-content">
          <div class="container">
            <div id="tab-1-content" class={`tab-content-item ${this.state.currentTab === "tab-1" ? "show" : ""}`}>
              <div class="tab-1-content-inner">
                <div>
                  <p class="text-lg">Tab 1 forms</p>
                </div>
              </div>
            </div>

            <div id="tab-2-content" class={`tab-content-item ${this.state.currentTab === "tab-2" ? "show" : ""}`}>
              <div class="tab-2-content-top">
                <p class="text-lg">Tab 2 forms</p>
              </div>
            </div>
            <div id="tab-3-content" class={`tab-content-item ${this.state.currentTab === "tab-3" ? "show" : ""}`}>
              <div class="text-center">
                <p class="text-lg">Tab 3 forms</p>
              </div>
            </div>
          </div>

        </section>


      </div>
    );
  }
}
export default Graphics;