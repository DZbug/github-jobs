import React, { Fragment } from 'react';

import Search from '../jobs/Search';
import Jobs from '../jobs/Jobs';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Jobs />
    </Fragment>
  );
};

export default Home;
