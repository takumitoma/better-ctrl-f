import React from 'react';
import QueryRow from './QueryRow/QueryRow';
import SearchOptions from './SearchOptions/SearchOptions';
import { useStorageOnLoad } from '../../hooks';
import './MainPage.css';

const QUERY_ROW_COUNT = 5;

const MainPage: React.FC = () => {
  useStorageOnLoad();

  return (
    <div id="main">
      {Array.from({ length: QUERY_ROW_COUNT }, (_, index) => (
        <QueryRow key={index} index={index} />
      ))}
      <SearchOptions />
    </div>
  );
};

export default MainPage;
