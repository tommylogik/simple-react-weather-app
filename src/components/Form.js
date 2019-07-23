import React from 'react';

import { Grid, Cell, Button, GridContainer } from 'react-foundation'


class Form extends React.Component {
  handleChange(event) {
    this.props.handleChange(event);
  }

  handleSubmit(event) {
    this.props.handleSubmit(event);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <GridContainer className="local-weather-form">
          <Grid>
            <Cell>
              <h2>Get your local weather</h2>
            </Cell>
          </Grid>
          <Grid>
            <Cell medium={10}>
              <label>
                <input
                  name="zipcode"
                  type="text"
                  value={this.props.zipcode}
                  onChange={this.props.handleChange}
                  placeholder="Enter a 5 digit ZipCode e.g. 10001"
                  minLength={5}
                  maxLength={5}
                />
              </label>
            </Cell>
            <Cell medium={2}>
              <div>
                <Button type="submit" isExpanded>Get Weather</Button>
              </div>
            </Cell>
          </Grid>
        </GridContainer>
      </form>
    );
  }
}

export default Form;
