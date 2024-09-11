import React from 'react';
import './GotoColorButton.css';
import { useNavigationContext } from '@context';

interface GotoColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  page: string;
}

const GotoColorButton: React.FC<GotoColorButtonProps> = ({
  backgroundColor,
  page,
}) => {
  const { setPage } = useNavigationContext();

  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor }}
      onClick={() => setPage(page)}
    />
  );
};

export default GotoColorButton;
