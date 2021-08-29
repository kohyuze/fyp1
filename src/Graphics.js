import React from 'react';
import A_1 from './Resources/A_1.png'
import E from './Resources/E.png'
import L_1 from './Resources/L_1B.png'

class Graphics extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }
  
    render() {
      return (
        <div className='G_container'>
          <img src={A_1} alt="A head" className='head'/>
          <img src={E} alt="E Shell" className='shell'/>
          <img src={L_1} alt="L Rear" className='rear'/>
        </div>
      );
    }
  }
  export default Graphics;