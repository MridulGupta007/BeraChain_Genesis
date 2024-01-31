import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="backdrop-blur-sm py-5 sticky top-0">
      <nav className="bg-[#232323] flex items-center justify-between text-[#EEF5FF] py-4 px-10 rounded-full mx-5 border-[#fff]/20 border">
        {/* title = Harmony Hub */}
        <NavLink to='/' >
        <h1 className="text-white text-[25px]">
          H<sup>2</sup>
        </h1>
        </NavLink>
        <ul className="flex gap-x-10">
          <NavLink to="find">
            <li className="hover:text-[#eef5ff]/70 cursor-pointer duration-500 ease-in-out">
              Find SHG
            </li>
          </NavLink>
          <NavLink to="manage">
            <li className="hover:text-[#eef5ff]/70 cursor-pointer duration-500 ease-in-out">
              Manage SHG
            </li>
          </NavLink>
        </ul>

        {/* <Button>
            Connect Wallet
        </Button> */}

        <div className="flex items-center space-x-3">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}

export default Header;
