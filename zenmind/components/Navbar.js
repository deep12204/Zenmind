'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiHeartPulseFill, RiMentalHealthFill } from 'react-icons/ri';
import { GiNightSleep } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { MdDashboard, MdFoodBank, MdOutlineHelp, MdMenu } from 'react-icons/md';
import NavLink from './NavLink';
import Food from './Food';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg shadow-lg"
      >
        <MdMenu className="text-2xl" />
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="fixed top-0 left-0 h-full w-56 bg-black text-white flex flex-col items-start p-4 z-40  md:translate-x-0 md:flex-[.2] md:h-[100vh]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl mb-6 mt-2">
          <RiHeartPulseFill className="text-2xl" />
          <span>H.care</span>
        </Link>

        {/* Links */}
        <div className="flex flex-col gap-4 w-full text-white">
          <NavLink  className="text-white" text="Dashboard" address="/" icon={<MdDashboard />} />
          <NavLink text="Mental Health" icon={<RiMentalHealthFill />} address="/mentalhealth" />
          <NavLink text="Food" icon={<MdFoodBank />} address="/Food" />
          <NavLink text="Sleep" icon={<GiNightSleep />} address="/sleep" />
          <NavLink text="Exercise" icon={<CgGym />} address="/exercise" />
          
          <hr className="bg-white my-2" />
          <NavLink text="Help" icon={<MdOutlineHelp />} address="/help" />
        </div>
      </motion.div>

      {/* Background overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 "
        />
      )}
    </>
  );
};

export default Navbar;
