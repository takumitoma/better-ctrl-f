import React from 'react';
import QueryRow from './MainPage/QueryRow';
import SearchOptions from './MainPage/SearchOptions';
import { useStorageOnLoad } from '../hooks/useStorageOnLoad';

const MainPage: React.FC = () => {
  useStorageOnLoad();

  return (
    <div id="main">
      {[0, 1, 2, 3, 4].map((index) => (
        <QueryRow key={index} index={index} />
      ))}
      <SearchOptions />
    </div>
  );
};

export default MainPage;
