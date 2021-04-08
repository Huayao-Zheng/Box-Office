import React, { useCallback, useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainpageLayout from '../components/MainpageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hook';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = results => {
  if (results && results.length === 0) {
    return <div>We did not find any results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }

  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(r => setResults(r));
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  return (
    <MainpageLayout>
      <SearchInput
        type="text"
        placeholder="Search for somthing"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            lable="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            lable="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainpageLayout>
  );
};

export default Home;
