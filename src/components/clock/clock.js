import React from 'react';
import { connect } from 'react-redux';

class Clock extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.updateTime();
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.props.time.toLocaleTimeString()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    time: state.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTime: () => dispatch({ type: 'UPDATE_TIME' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);

