import React, { Component } from 'react';
import styled from 'styled-components';
import RatingSystem from '../Rating/RatingSystem';

class EnterMeal extends Component {
  state = {
    food: {},
    value: '',
    rating: '',
    errorMessage: '',
    ready: false,
    editName: false,
    isToday: ''
  };

  componentDidMount() {
    const mealtime = this.props.mealtime;
    const ready = `${mealtime}Ready`;
    if (this.props[ready]) {
      this.setState({
        previousValue: this.props[this.props.mealtime].name,
        value: this.props[this.props.mealtime].name,
        food: this.props[mealtime],
        rating: this.props[this.props.mealtime].report
      });
    } else if (!this.props[ready]) {
      this.nameInput.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.editName !== this.state.editName) {
      this.nameInput.focus();
    }
  }

  handleButtonClick = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    if (name === 'return') {
      // return back to Today screen
      this.props.handleClick('return');
      // rating is clicked
    } else if (name === '1' || name === '2' || name === '3' || name === '4' || name === '5') {
      this.setState({
        rating: name,
        errorMessage: ''
      });
    } else if (name === 'editName') {
      // change name display to input
      this.setState({ editName: true });
    } else if (name === 'add') {
      // clicked plus button
      if (!this.state.value) {
        // if input invalid
        this.setState({ errorMessage: 'You need to enter something' });
      } else {
        // if input valid
        // console.log(this.props.dateDisplayfullDate);
        // console.e.log(this.props.todaysDate.fullDate);

        if (!this.props[`${this.props.mealtime}Ready`]) {
          // adding new name
          const parameters = {
            meal: this.state.value,
            mealtime: this.props.mealtime,
            isToday: this.state.isToday,
            enterDate: this.props.dateDisplay,
            userId: this.props.userData.userId
          };
          this.props.addMeal('food', parameters);
          this.props.handleClick('return');
        } else {
          // patching name
          if (!this.state.rating) {
            // if rating invalid
            this.setState({ errorMessage: 'You need to enter a rating' });
          } else {
            // if rating valid
            // name edited and add rating
            if (this.state.previousValue !== this.state.value) {
              const foodCopy = Object.assign({}, this.state.food);
              foodCopy.name = this.state.value;
              foodCopy.report = this.state.rating;
              const namePatchData = {
                food: foodCopy,
                mealtime: this.props.mealtime
              };
              const ratingData = {
                food: foodCopy,
                rating: this.state.rating
              };
              this.props.addMeal('foodPatch', namePatchData);
              this.props.addMeal('rating', ratingData);
              this.props.handleClick('return');
              // name not edited add rating
            } else if (this.state.previousValue === this.state.value) {
              const foodCopy = Object.assign({}, this.state.food);
              foodCopy.report = this.state.rating;
              const parameters = { food: foodCopy };
              this.props.addMeal('rating', parameters);
              this.props.handleClick('return');
            }
          }
        }
      }
    } else if (name === 'delete') {
      this.props.addMeal('delete', this.props[this.props.mealtime].mealId);
      this.props.handleClick('return');
    }
  };

  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleInputFocus = (e) => {
    this.setState({ errorMessage: '' });
  };

  render() {
    return (
      <Container className="slideDisplay slideIn">
        <div className="enterHeader">
          <button name="return" className="returnButton enter" onClick={this.handleButtonClick}>
            <span
              className="iconify"
              data-icon="ant-design:left-square-filled"
              data-inline="false"
            />
          </button>
          <span>
            <h2 className="mealtime">{this.props.mealtime}</h2>
          </span>
        </div>
        <form className="form">
          <label></label>
          {
            // was meal already entered
            this.props[`${this.props.mealtime}Ready`] ? (
              this.state.editName ? ( // was name edited
                <div className="nameContainer">
                  {' '}
                  {/* entered, edited */}
                  <input
                    type="text"
                    placeholder="What did you eat?"
                    className="input"
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    ref={(input) => {
                      this.nameInput = input;
                    }}
                  />
                </div>
              ) : (
                <div className="nameContainer">
                  {' '}
                  {/* entered, not edited */}
                  <span className="nameDisplay">{this.props[this.props.mealtime].name}</span>
                  <button
                    className="editButton enter"
                    name="editName"
                    onClick={this.handleButtonClick}
                  >
                    <span
                      className="iconify"
                      data-icon="ant-design:edit-filled"
                      data-inline="false"
                    />
                  </button>
                </div>
              )
            ) : (
              <input // entering new name
                type="text"
                placeholder="What did you eat?"
                className="input"
                value={this.state.value}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                ref={(input) => {
                  this.nameInput = input;
                }}
              />
            )
          }
        </form>
        <div className="voteContainer">
          {this.props[`${this.props.mealtime}Ready`] && (
            <RatingSystem handleClick={this.handleButtonClick} rating={this.state.rating} />
          )}
          {this.state.errorMessage ? (
            <span className="errorMessage">{this.state.errorMessage}</span>
          ) : (
            <div className="buttonContainer">
              <button name="add" className="addButton enter" onClick={this.handleButtonClick}>
                <span
                  className="iconify"
                  data-icon="ant-design:plus-square-filled"
                  data-inline="false"
                />
              </button>
              {this.props[this.props.mealtime] && (
                <button
                  name="delete"
                  className="deleteButton enter"
                  onClick={this.handleButtonClick}
                >
                  <span
                    className="iconify"
                    data-icon="ant-design:delete-filled"
                    data-inline="false"
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default EnterMeal;

const Container = styled.div`
  height: 100%;
  background-color: var(--primary-0);
  border-radius: 12px;
  padding: 12px 24px;
  .enterHeader {
    text-align: center;
  }
  .form {
    width: 100%;
    max-height: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .nameContainer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--primary-0);
      border-radius: 12px;
      .nameDisplay {
        font-size: 1.2rem;
      }
    }
    .input {
      font-size: 1.2rem;
      width: 100%;
      outline: none;
      border: 1px solid var(--primary-0);
      border-radius: 12px;
      padding: 6px 24px;
    }
    .input:invalid {
      border: 2px solid var(--warning-4);
    }
  }
  .voteContainer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buttonContainer {
    display: flex;
  }
  .enter {
    background-color: var(--primary-0);
    font-size: 26px;
    border-radius: 25px;
    border: 2px solid var(--primary-4);
    color: var(--primary-4);
    display: flex;
  }
  .returnButton,
  .editButton {
    padding: 8px 16px;
    position: absolute;
  }
  .returnButton {
    top: 12px;
    left: 24px;
  }
  .editButton {
    right: 30px;
    margin-left: 10px;
  }
  .addButton,
  .deleteButton {
    margin: 12px;
    padding: 8px 32px;
  }
  .errorMessage {
    text-align: center;
    color: var(--warning-5);
    font-size: 1.3rem;
    font-weight: 700;
  }
`;
