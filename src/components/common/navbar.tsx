import React, { useState } from "react";
import { NavBarProps } from "@/types";
import Menu from "../../assets/svgs/menu-svgrepo-com.svg"
import cancel from "../../assets/svgs/cancel-svgrepo-com.svg"
import { Link } from "react-router-dom";


const NavBar: React.FC<NavBarProps> = ({Logo, Facebook, Twitter, Insta}) => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <nav className="relative flex items-center justify-between gap-2 p-1">
            <div>
                <img src={Logo} alt="logo" className="md:w-18 w-12 ml-2" />
            </div>
            
            {/* Desktop Navigation - hidden on mobile */}
            <ul className="hidden md:flex md:gap-12 gap-2 text-lg md:font-semibold">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/recipe'>Recipe</Link>
                </li>
                <li>
                    <Link to='/contact'> Contact </Link>
                </li>
            </ul>

            {/* Mobile Menu Button - visible only on mobile */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <img src={cancel} alt="cancel svg" className="w-8 h-8"  /> : <img src={Menu} alt="menu" className="w-8 h-8" /> }
            </button>

            {/* Mobile Menu - shown when menu is open */}
            {isOpen && (
                <div className="z-20 absolute top-full right-0 w-full md:hidden bg-white text-center">
                    <ul className="flex flex-col gap-2 p-1 text-lg text-black underline">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/recipe'>Recipe</Link>
                    </li>
                    <li>
                        <Link to='/contact'> Contact </Link>
                    </li>
                    </ul>
                    <div className="flex justify-center gap-4 m-2">
                        <img src={Facebook} alt="Facebook logo" />
                        <img src={Twitter} alt="Twitter Logo" />
                        <img src={Insta} alt="Insta Logo" />
                    </div>
                </div>
                
            )}

            {/* Social Media Icons */}
            <div className="hidden md:flex md:gap-3 gap-2">
                <img src={Facebook} alt="Facebook logo" />
                <img src={Twitter} alt="Twitter Logo" />
                <img src={Insta} alt="Insta Logo" />
            </div>
        </nav>

    )
}

export default NavBar