// src/components/UI/NavButton.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavButton.module.css';

interface NavButtonProps {
  to: string;
  label: string;
  exact?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label, exact = false }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
      }
      end={exact} // For NavLink to match exact path for home
    >
      {label}
    </NavLink>
  );
};

export default NavButton;
