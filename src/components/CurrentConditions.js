import React from 'react';

import { GridContainer, Grid, Cell } from 'react-foundation';
import Skycons from 'react-skycons';


class Conditions extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const newProps = this.props;

    if (newProps.error) {
      this.render()
    }
  }

  render() {
    if (Object.keys(this.props.currently).length) {
      return (
        <GridContainer className="current-conditions">
          <Grid>
            <Cell large={12}>
              <h2>Current Conditions</h2>
              <hr/>
              <h3>
                <Skycons
                  color='black'
                  icon={this.props.currently.icon.toUpperCase()}
                  autoplay={true}
                  style={{ width: '2em', height: '1em' }}
                />
                <span
                  className="temp">{Math.round(this.props.currently.temperature)}&deg;F</span>
              </h3>
              <h4>{this.props.currently.summary}</h4>
            </Cell>
          </Grid>
        </GridContainer>
      );
    } else {
      return ('');
    }
  }
};

export default Conditions;
