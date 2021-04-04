import React, { Component } from 'react';

class FoodTable extends Component {
  state = {
    ready: false,
    buttonSwitched: false,
    badList: [],
    goodList: [],
    mealtime: ''
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.buttonSwitched !== this.props.buttonSwitched) {
      this.setState({ buttonSwitched: !this.state.buttonSwitched });
    }
    if (prevProps.list !== this.props.list) {
      this.doTheThing();
    }
  };

  doTheThing = () => {
    const mealtime = Object.keys(this.props.list)[0];
    const good = this.props.list[mealtime].filter((x) => {
      if (x.report >= 3) return x;
    });
    const bad = this.props.list[mealtime]
      .filter((x) => {
        if (x.report < 3) return x;
      })
      .reverse();
    this.setState({
      goodList: good,
      badList: bad,
      mealtime: `${mealtime.charAt(0)}${mealtime.slice(1)}`,
      ready: true
    });
  };

  render() {
    const { ready, buttonSwitched, goodList, badList } = this.state;
    let masterList;
    if (ready) {
      if (!buttonSwitched) {
        masterList = goodList;
      } else if (buttonSwitched) {
        masterList = badList;
      }
    }
    return (
      <table className="foodTable">
        <tbody className="foodBody">
          {ready &&
            masterList.map((x) => {
              return (
                <tr key={x.eatenAt}>
                  <td>{x.name}</td>
                  <td>{x.report}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default FoodTable;
