import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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

  console.log('state', { show, isLoading, error });

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>GotError: {error}</div>;
  }

  return <div>this is show page</div>;
};

export default Show;
