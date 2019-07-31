import React from 'react';

import { Cell } from 'react-foundation';
import Skycons from 'react-skycons';
import Moment from 'react-moment';

const calendarStrings = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  sameElse: 'dddd'
};


const Single = (props) => {
  return (
    <Cell small={12} medium={4} large={3} className="display text-center">
      <header className="day-of-week text-center">
        <div><Moment calendar={calendarStrings} unix>{props.forecast.time}</Moment></div>
      </header>
      <h3>
        <Skycons
          color='black'
          icon={props.forecast.icon}
          autoplay={true}
          style={{ width: '2em', height: '1em' }}
        />
        <span className="temp">
          <span className="temp-lo">{Math.round(props.forecast.temperatureLow)}</span>
          <span className="temp-seperator">/</span>
          <span className="temp-hi">{Math.round(props.forecast.temperatureHigh)}</span>
          &deg;F</span>
      </h3>
      <small>{props.forecast.summary}</small>
      <hr/>
      <div>sunrise: <Moment format="hh:MM a" unix>{props.forecast.sunriseTime}</Moment></div>
      <div>sunset: <Moment format="hh:MM a" unix>{props.forecast.sunsetTime}</Moment></div>
    </Cell>
  );
};

export default Single;
