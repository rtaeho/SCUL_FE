import React from 'react';

import { ReactComponent as Soccer } from '../../assets/Soccer.svg';

const Header = () => {
  return (
    <div className="head-container ">
      <div className="head-border-container ">
        <div className="head-border-title">S-Cul</div>
        <Soccer />
      </div>
    </div>
  );
};

export default Header;
