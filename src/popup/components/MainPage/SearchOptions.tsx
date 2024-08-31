import React, { useState } from 'react';

const SearchOptions: React.FC = () => {
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [searchDiacritics, setSearchDiacritics] = useState<boolean>(false);
  //const [searchShadowDoms, setSearchShadowDoms] = useState<boolean>(false);

  //   <label>
  //   <input
  //     type="checkbox"
  //     checked={searchShadowDoms}
  //     onChange={(e) => setSearchShadowDoms(e.target.checked)}
  //   />
  //   Shadow DOM
  // </label>
  return (
    <div id="search-options">
      <label>
        <input
          type="checkbox"
          checked={isCaseSensitive}
          onChange={(e) => setIsCaseSensitive(e.target.checked)}
        />
        Case sensitive
      </label>
      <label>
        <input
          type="checkbox"
          checked={searchDiacritics}
          onChange={(e) => setSearchDiacritics(e.target.checked)}
        />
        Diacritics
      </label>
    </div>
  );
};

export default SearchOptions;
