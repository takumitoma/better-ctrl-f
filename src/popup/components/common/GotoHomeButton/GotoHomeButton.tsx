import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigationContext } from '../../../context';
import './GotoHomeButton.css';

const GotoHomeButton: React.FC = () => {
  const { setPage } = useNavigationContext();

  return (
    <button className="goto-home" onClick={() => setPage('Main')} tabIndex={0}>
      <IoIosArrowRoundBack className="icon" />
      <p>Go Back</p>
    </button>
  );
};

export default GotoHomeButton;
