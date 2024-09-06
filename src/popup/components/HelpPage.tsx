import React from "react";
import GotoHomeButton from "./common/GotoHomeButton";

const HelpPage: React.FC = () => {
  return (
    <div id="help">
      <GotoHomeButton />
      <hr />
      <h1>Search Options Help</h1>
      <ol>
        <li>
          Case sensitive
          <ul>
            <li>
              <b>Checked:</b> finds the exact case of a letter
              <ul>
                <li>Searching for "case" finds "case"</li>
                <li>Searching for "case" doesn't find "Case"</li>
              </ul>
            </li>
            <li>
              <b>Not Checked:</b> finds both cases of a letter
              <ul>
                <li>Searching for "case" finds "case"</li>
                <li>Searching for "case" also finds "Case"</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          Diacritics
          <ul>
            <li>
              <b>Checked:</b> finds both exact and variant forms of a letter
              <ul>
                <li>Searching for "café" finds "café", "cafe", "cafè", "cafê", etc.</li>
              </ul>
            </li>
            <li>
              <b>Not Checked:</b> finds only the exact variant of a letter
              <ul>
                <li>Searching for "café" finds only "café"</li>
                <li>Searching for "cafe" doesn't find "café"</li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default HelpPage;
