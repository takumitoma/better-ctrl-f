import React from 'react';
import { useNavigationContext } from './context';
import MainPage from './components/MainPage';
import SetColorPage from './components/SetColorPage';
import LoadingScreen from './components/LoadingScreen';
import { useContentScriptChecker } from './hooks/useContentScriptChecker';

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

    if (pageType === 'SetHighlight' || pageType === 'SetFocus') {
      const type = pageType === 'SetHighlight' ? 'highlight' : 'focus';
      child = <SetColorPage index={index} type={type} />;
    }
  }

  return <div id="popup">{child}</div>;
};

export default Popup;
