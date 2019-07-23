import React from 'react';

import { Grid, Cell } from 'react-foundation';

const Header = (props) => {
  let callout = props.error ? `<div class="callout alert">${props.error.message}</div>` : '&nbsp;';

  return (
    <header className="grid-container">
      <Grid className="display">
        <Cell large={12}>
          <div className="text-center" dangerouslySetInnerHTML={{ __html: callout }}/>
        </Cell>
      </Grid>
    </header>
  )
};

export default Header;
