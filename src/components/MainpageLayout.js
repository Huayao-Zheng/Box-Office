import React from 'react';
import Navs from './Navs';
import TItle from './TItle';

const MainpageLayout = ({ children }) => (
  <div>
    <TItle title="Box Office" subtitle="Looking for a movie or actor" />
    <Navs />

    {children}
  </div>
);

export default MainpageLayout;
