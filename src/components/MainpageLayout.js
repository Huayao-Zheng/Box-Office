import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainpageLayout = ({ children }) => (
  <div>
    <Title title="Box Office" subtitle="Looking for a movie or actor" />
    <Navs />

    {children}
  </div>
);

export default MainpageLayout;
