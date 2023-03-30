import React from "react";
import logoPath from '../images/mesto_logo.svg'

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
    </header>
  );
}

export default Header;