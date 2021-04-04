import React, { Component } from 'react';
import styled from 'styled-components';
import { dateFormatter, sundayFormatter } from './Functions/date';
import Lists from './Lists/Lists';
import Settings from './Settings/Settings';
import TodaysMeals from './Today/Todays-Meals';
import Footer from './UI/Footer';
import WeeklyReview from './Weekly/Weekly-Review';

class HomePage extends Component {
  state = {
    userData: {},
    isLoggedIn: false,
    dateToday: '',
    dateDisplay: '',
    dateSunday: '',
    dateSet: false,
    previousWeek: false,
    list: [],
    listLoaded: false,
    isToday: '',
    isFuture: '',
    listButtonClicked: false,
    listButtonX: false,
    hamburgerClicked: false,
    hamburgerX: false
  };

  async componentDidMount() {
    this._isMounted = true;
    const response = await fetch('/api/isloggedin');
    const json = await response.json();
    if (json.error) return this.props.history.push('/ls');
    if (this._isMounted) {
      this.setTime();
      this.setState({
        isLoggedIn: true,
        userData: json
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) this.getList();
    if (prevState.dateDisplay !== this.state.dateDisplay) {
      const isToday = this.state.dateToday.fullDate === this.state.dateDisplay.fullDate;
      let isFuture;
      if (this.state.dateToday.fullDate < this.state.dateDisplay.fullDate) {
        isFuture = this.state.dateDisplay.fullDate;
      }
      this.setState({ isToday: isToday, isFuture: isFuture });
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  setTime = () => {
    const newDate = new Date();
    // send newDate to be formatted to helper functions
    const displayDateState = dateFormatter(newDate);
    const displaySundayState = sundayFormatter(newDate);

    this.setState({
      dateToday: displayDateState,
      dateDisplay: displayDateState,
      dateSunday: displaySundayState,
      dateSet: true,
      previousWeek: false
    });
  };

  async getList() {
    const listRes = await fetch('/api/list');
    const listJSON = await listRes.json();
    if (this._isMounted) {
      this.setState({
        list: listJSON,
        listLoaded: true
      });
    }
  }

  handleWeeklyClick = (date, day) => {
    const displayDateState = dateFormatter(date);
    const displaySundayState = sundayFormatter(date);
    this.setState({
      dateDisplay: displayDateState,
      dateSunday: displaySundayState
    });
  };

  handleButtonClick = (e) => {
    e.preventDefault();
    const action = e.currentTarget.name;
    const { listButtonClicked, hamburgerClicked, dateSunday, dateToday } = this.state;
    if (action === 'today') this.setTime();
    else if (action === 'list') {
      if (!listButtonClicked) {
        this.setState({
          listButtonClicked: true,
          listButtonX: true,
          hamburgerClicked: false,
          hamburgerX: false
        });
      } else if (listButtonClicked) {
        this.delayState();
      }
    } else if (action === 'hamburger') {
      if (!hamburgerClicked) {
        this.setState({
          hamburgerClicked: true,
          hamburgerX: true,
          listButtonClicked: false,
          listButtonX: false
        });
      } else if (hamburgerClicked) {
        this.delayState();
      }
    } else if (action === 'previousWeek') {
      const sunday = dateSunday.timestamp;
      const prev = sunday.setHours(sunday.getHours() - 24 * 7);
      const previousSunday = new Date(prev);
      const previousSundayState = sundayFormatter(previousSunday);
      this.setState({
        previousWeek: true,
        dateDisplay: previousSundayState,
        dateSunday: previousSundayState
      });
    } else if (action === 'nextWeek') {
      const sunday = dateSunday.timestamp;
      const next = sunday.setHours(sunday.getHours() + 24 * 7);
      const nextSundayState = sundayFormatter(new Date(next));
      const todaysSunday = sundayFormatter(new Date(dateToday.timestamp));
      if (nextSundayState.fullDate === todaysSunday.fullDate) {
        this.setTime();
      } else {
        this.setState({
          dateDisplay: nextSundayState,
          dateSunday: nextSundayState
        });
      }
    }
  };

  delayState = () => {
    setTimeout(() => {
      this.setState({
        hamburgerClicked: false,
        listButtonClicked: false
      });
    }, 300);
    this.setState({
      hamburgerX: !this.state.hamburgerX,
      listButtonX: !this.state.listButtonX
    });
  };

  handleLogOut = async () => {
    const response = await fetch('/api/log-out');
    const data = await response.json();
    if (data.success) return this.props.history.push('/login');
  };

  addMeal = async (category, parameter) => {
    if (category === 'food') {
      const postData = {
        meal: parameter.meal,
        mealtime: parameter.mealtime,
        isToday: this.state.isToday,
        enterDate: parameter.enterDate,
        userId: parameter.userId
      };
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };
      const response = await fetch('/api/enter', init);
      const data = await response.json();
      if (data) {
        const listCopy = [...this.state.list];
        listCopy.push(data);
        this.setState({ list: listCopy });
      }
    } else if (category === 'rating') {
      const { mealId, report } = parameter.food;
      const reportData = { report: parseInt(report), mealId };
      const init = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      };
      const response = await fetch(`/api/rate/${mealId}`, init);
      const data = await response.json();
      if (data) {
        const listCopy = [...this.state.list];
        for (let i = 0; i < listCopy.length; i++) {
          if (listCopy[i].mealId === mealId) {
            listCopy[i].report = parseInt(report);
            this.setState({ list: listCopy });
          }
        }
      }
    } else if (category === 'foodPatch') {
      const { mealId, name } = parameter.food;
      const patchData = { name, mealId };
      const init = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
      };
      const response = await fetch(`/api/enter/${mealId}`, init);
      const data = await response.json();
      if (data) {
        const listCopy = [...this.state.list];
        const arrOfIds = listCopy.map((x) => x.mealId);
        const index = arrOfIds.indexOf(mealId);
        listCopy[index].name = name;
        this.setState({ list: listCopy });
      }
    } else if (category === 'delete') {
      const mealId = parameter;
      const init = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(`/api/enter/${mealId}`, init);
      const data = await response.json();
      if (data.success) {
        const listCopy = [...this.state.list];
        const index = listCopy.findIndex((x) => x.mealId === mealId);
        listCopy.splice(index, 1);
        this.setState({ list: listCopy });
      }
    }
  };

  updateUserData = (data) => this.setState({ userData: data });

  render() {
    let username, display;
    if (this.props.location.state) {
      username = this.props.location.state.username;
    } else username = 'user';
    if (this.state.listButtonClicked) {
      display = (
        <section
          className={
            this.state.listButtonClicked
              ? 'section listsSection open'
              : 'section listsSection closed'
          }
        >
          <Lists
            list={this.state.list}
            clicked={this.state.listButtonX}
            handleClick={this.handleButtonClick}
          />
        </section>
      );
    } else if (this.state.hamburgerClicked) {
      display = (
        <section
          className={
            this.state.hamburgerClicked
              ? 'section settingsSection open'
              : 'section settingsSection closed'
          }
        >
          <Settings
            userData={this.state.userData}
            clicked={this.state.hamburgerX}
            handleClick={this.handleButtonClick}
            logout={this.handleLogOut}
            updateUserData={this.updateUserData}
          />
        </section>
      );
    } else {
      display = (
        <>
          <section className="section helloSection">
            <div className="hello">Hello, {username} !</div>
          </section>
          <section className="section todaySection">
            {this.state.dateSet ? (
              <div className="todayTitleContainer">
                {this.state.isToday ? (
                  <span className="todayTitle">Today</span>
                ) : (
                  <span style={{ textTransform: 'capitalize' }} className="todayTitle">
                    {this.state.dateDisplay.day}
                  </span>
                )}
                <span className="todayDate">{this.state.dateDisplay.display}</span>
              </div>
            ) : (
              <span className="todayTitleContainer">date loading...</span>
            )}
            {this.state.listLoaded && (
              <TodaysMeals
                list={this.state.list}
                dateDisplay={this.state.dateDisplay}
                todaysDate={this.state.dateToday}
                addMeal={this.addMeal}
                userData={this.state.userData}
              />
            )}
          </section>
          <section className="section reviewSection">
            <div className="reviewTitleContainer">
              <button
                className="previousWeekButton"
                name="previousWeek"
                onClick={this.handleButtonClick}
              >
                <span
                  className="iconify"
                  data-icon="akar-icons:chevron-left"
                  data-inline="false"
                ></span>
              </button>
              <div className="reviewTitle">
                {this.state.previousWeek ? <span>Last Week</span> : <span>This Week</span>}
              </div>
              {
                <button
                  className={
                    this.state.previousWeek ? 'nextWeekButton displayed' : 'nextWeekButton'
                  }
                  name="nextWeek"
                  onClick={this.handleButtonClick}
                  disabled={!this.state.previousWeek}
                >
                  <span
                    className="iconify"
                    data-icon="akar-icons:chevron-right"
                    data-inline="false"
                  ></span>
                </button>
              }
            </div>
            {this.state.listLoaded && (
              <WeeklyReview
                list={this.state.list}
                dateDisplay={this.state.dateDisplay}
                dateToday={this.state.dateToday}
                dateSunday={this.state.dateSunday}
                handleClick={this.handleWeeklyClick}
                previousWeek={this.state.previousWeek}
                isToday={this.state.isToday}
                isFuture={this.state.isFuture}
              />
            )}
          </section>
        </>
      );
    }
    return (
      <Container>
        {display}
        <div className="footer">
          <Footer
            isToday={this.state.isToday}
            clicked={this.state.hamburgerClicked}
            listClicked={this.state.listButtonClicked}
            handleClick={this.handleButtonClick}
          />
        </div>
      </Container>
    );
  }
}

export default HomePage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  .helloSection {
    width: 100%;
    height: 15%;
    .hello {
      font-size: 2rem;
      padding: 15px 25px;
    }
  }
  .todaySection {
    height: 40%;
    display: flex;
    padding: 6px 12px;
    flex-direction: column;
    align-items: center;
    .todayTitleContainer {
      width: 100%;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
    }
  }
  .reviewSection {
    padding: 36px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .slideDisplay {
      overflow: hidden;
    }
    .reviewTitleContainer {
      width: 100%;
      display: flex;
      justify-content: left;
      .previousWeekButton {
        width: 40px;
        height: 25px;
        border: none;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
      }
      .nextWeekButton {
        width: 40px;
        height: 25px;
        outline: none;
        border: none;
        background-color: #fff;
        * {
          display: none;
        }
      }
      .displayed {
        display: flex;
        border-radius: 12px;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        background-color: var(--primary-0);
        * {
          display: inherit;
        }
      }
      .reviewTitle {
        font-size: 1.2rem;
        width: calc(100% - 30px);
        text-align: center;
      }
    }
  }
  .settingsSection,
  .listsSection {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    align-items: flex-end;
  }
  .settingsSection.open,
  .listsSection.open {
    display: flex;
    justify-content: center;
  }
  .settingsSection.closed,
  .listsSection.closed {
    display: none;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    z-index: 1000;
  }
  @keyframes slideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }
  .slideDisplay {
    height: 100%;
    transform: translateX(-20px);
    opacity: 0;
  }
  .slideIn {
    animation: slideIn 0.4s forwards;
  }
  @keyframes slideIn {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
