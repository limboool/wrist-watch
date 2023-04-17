import React from "react";
import { Link } from "react-router-dom";
import Clock from "../clock/clock";


function Header() {

  return (
    <header className="d-flex justify-between align-center">
      <Link to="">
        <div className="d-flex align-center">
          <img width={60} height={60} src="/img/logo.svg" alt="Logotype"></img>
          <div>
            <h3>TIME WATCH</h3>
            <Clock></Clock>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <Link to="/drawer">
          <li className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.svg" alt="cart"></img>
          </li>
        </Link>
        <Link to="/order">
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="User"></img>
          </li>
        </Link>
      </ul>
    </header>
  )
}

export default Header;