import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <h2>Wait for content script to load</h2>
      <ClipLoader color="#123abc" loading={true} size={50} />
      <p>Some reasons you might be seeing this</p>
      <ul>
        <li>You just downloaded the extension. Please reload the page.</li>
        <li>
          This extension only works in websites with the url http://*/* or
          https://*/*.
        </li>
        <li>The website has not fully loaded yet.</li>
      </ul>
    </div>
  );
};

export default LoadingScreen;
