import React from 'react';

import Header from './components/Header';
import Form from './components/Form';
import CurrentConditions from './components/CurrentConditions';
import WeatherGrid from './components/WeatherGrid';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: 'Guest',
      zipcode: '',
      currently: {},
      forecast: [],
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (isNaN(value)) {
      return;
    }
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    if (this.state.zipcode) {
      this.getWeatherData();
    }

    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  getWeatherData() {
    fetch(`/api/?zipcode=${this.state.zipcode}`)
      .then(res => res.json())
      .then((result) => {
        if (Object.prototype.hasOwnProperty.call(result, 'error')) {
          throw result;
        }
        const currentWeather = result.currently;
        currentWeather.summary = result.hourly.summary;

        this.setState({
          currently: currentWeather,
          forecast: result.daily.data,
          error: false,
        });
      })
      .catch((error) => {
        this.setState({
          currently: {},
          forecast: [],
          error,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Header
          error={this.state.error}
          name={this.state.name}
        />
        <Form
          zipcode={this.state.zipcode}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <CurrentConditions
          error={this.state.error}
          zipcode={this.state.zipcode}
          currently={this.state.currently}
        />
        <WeatherGrid
          error={this.state.error}
          zipcode={this.state.zipcode}
          forecast={this.state.forecast}
        />
      </div>
    );
  }
}

export default App;
