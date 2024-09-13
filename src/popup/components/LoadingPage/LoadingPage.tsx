import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  return (
    <div id="loading">
      <h2>Loading Scripts</h2>
      <ClipLoader color="#123abc" loading={true} size={50} />
      <p>Some reasons you might be seeing this</p>
      <ul>
        <li>You recently installed the extension: Please refresh the page.</li>
        <li>
          You are viewing a chrome:// URL: Content scripts are not operational
          in this environment.
        </li>
        <li>
          You are accessing a specialized web application (e.g., PDF viewers or
          Microsoft Office online): This extension is designed for standard web
          pages only.
        </li>
        <li>
          Website loading is incomplete: Please allow additional time for full
          page rendering.
        </li>
      </ul>
    </div>
  );
};

export default LoadingPage;
