import React from 'react';
import { useNavigationContext } from './context';
import MainPage from './components/MainPage';
import SetHighlightPage from './components/SetHighlightPage';
import SetFocusPage from './components/SetFocusPage';
import LoadingScreen from './components/LoadingScreen';
import useContentScriptChecker from './hooks/useContentScriptChecker';

const Popup: React.FC = () => {
  const { page } = useNavigationContext();
  const contentScriptLoaded = useContentScriptChecker();

  let child = null;

  if (!contentScriptLoaded) {
    child = <LoadingScreen />;
  } else if (page === 'Main') {
    child = <MainPage />;
  } else {
    const [pageType, indexStr] = page.split('-');
    const index = parseInt(indexStr);

    if (pageType === 'SetHighlight') {
      child = <SetHighlightPage index={index} />;
    } else if (pageType === 'SetFocus') {
      child = <SetFocusPage index={index} />;
    }
  }

  return <div id="popup">{child}</div>;
};

export default Popup;
