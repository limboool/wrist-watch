import React from 'react';
import { connect } from 'react-redux';

class Clock extends React.Component {
  componentDidMount() {
    // обновляем время каждую секунду
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

// подключаем состояние из store
const mapStateToProps = (state) => {
  return {
    time: state.time,
  };
};

// подключаем action creators
const mapDispatchToProps = (dispatch) => {
  return {
    updateTime: () => dispatch({ type: 'UPDATE_TIME' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);