"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import AuthButtons from "./AuthButtons";


export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll className="bg-[#0E0C0C]">
     
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
        <NavbarItem isActive>
          <Link className="text-white hover:text-[#0357B8] transition-colors" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
       
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
         <AuthButtons />
        </NavbarItem>
       
      </NavbarContent>
    </Navbar>
  );
}
