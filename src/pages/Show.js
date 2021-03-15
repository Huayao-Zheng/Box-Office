/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Detaile from '../components/show/Detaile';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';

const initState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  if (action.type === 'FETCH_SUCCESS') {
    return { ...prevState, isLoading: false, show: action.show };
  }
  if (action.type === 'FETCH_FAILED') {
    return { ...prevState, isLoading: false, error: action.error };
  }
  return prevState;
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: res });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>GotError: {error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Detaile
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
