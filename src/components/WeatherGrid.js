import React from 'react';

import { Grid, GridContainer } from 'react-foundation';
import Single from './Single';


class WeatherGrid extends React.Component {
  renderItems() {
    return this.props.forecast.map(item =>
      <Single
        key={item.time}
        forecast={item}
      />
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const newProps = this.props;
    if (prevProps.zipcode !== newProps.zipcode) {
      this.forceUpdate();
    }
    if (newProps.error) {
      this.render();
    }
  }

  render() {
    if (this.props.forecast.length) {
      return (
        <div className="weather-grid">
          <GridContainer>
            <Grid className="display" centerAlign={true} upOnLarge={4}>
              {this.renderItems()}
            </Grid>
          </GridContainer>
        </div>
      )
    } else {
      return ('')
    }
  }
}

export default WeatherGrid;
