
import React from 'react';
import SeeIngredients from './see-ingredients';

export default class RateMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: [],
      mealName: ''
    };
    this.handleRatingClick = this.handleRatingClick.bind(this);
  }

  componentDidMount() {
    const mealId = this.props.match.params.mealId;
    fetch(`/api/rate/${mealId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ mealName: data });
      })
      .catch(err => {
        alert('Error: ', err);
      });
  }

  handleRatingClick() {
    const eventText = event.target.text;
    let reportNumber = null;
    const mealId = this.props.match.params.mealId;
    let ratingImage = null;

    if (eventText === 'Good') {
      reportNumber = 3;
      ratingImage = '/images/happyFace.jpg';
    } else if (eventText === 'Ok') {
      reportNumber = 2;
      ratingImage = '/images/neutralFace.jpg';
    } else if (eventText === 'Bad') {
      reportNumber = 1;
      ratingImage = '/images/badFace.jpg';
    }
    const dataToSend = { mealId: mealId, report: reportNumber, image: ratingImage };
    fetch('/api/rate/mealId', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.history.push('/daily-list');
      })
      .catch(err => {
        alert('Error: ', err);
      });
  }

  render() {
    const mealName = [this.state.mealName.name];
    if (!this.state.meal) {
      return <div>LOADING...</div>;
    } else {
      return (
        <div className={'container'} style={{ width: '375px', height: '667px' }}>
          <div className={'bg-warning'}>
              How did it make you feel?
          </div>
          <div className={'bg-info'}>
            {mealName}
          </div>
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Good
              <img src='/images/happyFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
            </a>
            <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Ok
              <img src='/images/neutralFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
            </a>
            <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Bad
              <img src='/images/badFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
            </a>
          </div>
          <div>
            <SeeIngredients mealId={this.props.match.params.mealId} />
          </div>
        </div>
      );
    }
  }
}
