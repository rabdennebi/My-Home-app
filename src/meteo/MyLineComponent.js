import createG2 from 'g2-react';
import React, { Component } from 'react';

const Line = createG2(chart => {
  
  chart.line().position('period*temp2m').color('day').shape('spline').size(2);
  chart.render();
});

export default class MyLineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.heur,
      width: 1050,
      height: 150,
      
    }
  }
  /*componentDidUpdate(prevState) {
    if(prevState.heur!==undefined && this.state.heur !== prevState.heur.periods){
      this.setState({
        heur: prevState.periods
      });
    }  
  }*/
  render() {
    return (
      <div>
        <Line
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          plotCfg={this.state.plotCfg}
        />
      </div>
    );
  }
}