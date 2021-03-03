/* eslint-disable arrow-body-style */
import React from 'react';
import ShowCard from './ShowCard';

import { FlexGrid } from '../styled';

import IMAGE_NOT_FOUND from '../../imag/not-found.png';

const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          namd={show.name}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
