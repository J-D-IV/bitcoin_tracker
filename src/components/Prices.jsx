import React from 'react';
import Range from './range.jsx';


class Prices extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Range range={this.props.range} />
      </div>
    )
  }
}

export default Prices