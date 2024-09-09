import React from 'react';
import QueryRow from './MainPage/QueryRow';
import SearchOptions from './MainPage/SearchOptions';
import { useStorageOnLoad } from '../hooks/useStorageOnLoad';
import "./MainPage/MainPage.css";

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
