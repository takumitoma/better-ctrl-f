import React from 'react';
import { useNavigationContext } from './context';
import MainPage from './components/MainPage';
import SetColorPage from './components/SetColorPage';
import LoadingPage from './components/LoadingPage';
import { useContentScriptChecker } from './hooks/useContentScriptChecker';
import HelpPage from './components/HelpPage';
import "./reset.css";
import "./base.css";

const Popup: React.FC = () => {
  const { page } = useNavigationContext();
  const contentScriptLoaded = useContentScriptChecker();

  let child = null;

  if (!contentScriptLoaded) {
    child = <LoadingPage />;
  } else if (page === 'Main') {
    child = <MainPage />;
  } else if (page === 'Help') {
    child = <HelpPage />;
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
