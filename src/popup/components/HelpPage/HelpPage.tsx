import React from 'react';
import GotoHomeButton from './common/GotoHomeButton';
import './HelpPage/HelpPage.css';

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
                <li>Searching for &quot;case&quot; finds &quot;case&quot;</li>
                <li>
                  Searching for &quot;case&quot; does not find &quot;Case&quot;
                </li>
              </ul>
            </li>
            <li>
              <b>Not Checked:</b> finds both cases of a letter
              <ul>
                <li>Searching for &quot;case&quot; finds &quot;case&quot;</li>
                <li>
                  Searching for &quot;case&quot; also finds &quot;Case&quot;
                </li>
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
                <li>
                  Searching for &quot;café&quot; finds &quot;café&quot;,
                  &quot;cafe&quot;, &quot;cafè&quot;, &quot;cafê&quot;, etc.
                </li>
              </ul>
            </li>
            <li>
              <b>Not Checked:</b> finds only the exact variant of a letter
              <ul>
                <li>
                  Searching for &quot;café&quot; finds only &quot;café&quot;
                </li>
                <li>
                  Searching for &quot;cafe&quot; doesn&apos;t find
                  &quot;café&quot;
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default HelpPage;
