"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BiSearch, BiBell, BiUser, BiCaretDown } from "react-icons/bi";

function Header() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get("category") || "home";
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Netflix-style links
  const mainLinks = [
    { label: "Home", category: "home" },
    { label: "TV Shows", category: "tv" },
    { label: "Movies", category: "movies" },
    { label: "New & Popular", category: "latest" },
    { label: "My List", category: "my_list" },
    { label: "Browse by Languages", category: "languages" },
  ];

  // Handle scroll effect like Netflix
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-2 flex items-center justify-between ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left side - Logo and navigation */}
      <div className="flex items-center">
        {/* Netflix-style logo */}
        <Link href="/" className="mr-8">
          <img
            src="/logo.png"
            alt="Movie App Logo"
            className="h-8 md:h-10 w-auto cursor-pointer"
          />
        </Link>

        {/* Main navigation - desktop */}
        <nav className="hidden md:flex space-x-4 text-sm text-gray-200">
          {mainLinks.map(({ label, category }) => (
            <Link
              key={category}
              href={`/?category=${category}`}
              className={`relative transition-colors duration-200 hover:text-white ${
                currentCategory === category 
                  ? "font-bold text-white" 
                  : "font-normal"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile dropdown menu button */}
        <div className="flex md:hidden items-center">
          <button className="text-white flex items-center">
            Browse
            <BiCaretDown className="ml-1" />
          </button>
        </div>
      </div>

      {/* Right side - Search, notifications, and profile */}
      <div className="flex items-center space-x-4 text-white">
        {/* Search icon */}
        <button className="p-1">
          <BiSearch size={20} />
        </button>

        {/* Kids section */}
        <Link href="/kids" className="hidden md:block text-sm">
          Kids
        </Link>

        {/* Notifications bell */}
        <button className="p-1 relative">
          <BiBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User profile */}
        <div className="relative">
          <button 
            className="flex items-center"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img
              src="/avatar.png" 
              alt="User Avatar"
              className="h-8 w-8 rounded"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.src = "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4";
              }}
            />
            <BiCaretDown className="ml-1" />
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg py-1 z-20">
              <div className="px-4 py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <img 
                    src="/avatar.png" 
                    alt="User" 
                    className="h-7 w-7 rounded mr-2" 
                  />
                  <span>Profile 1</span>
                </div>
              </div>
              <Link href="/profiles" className="block px-4 py-2 text-sm hover:bg-gray-800">
                Manage Profiles
              </Link>
              <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-800">
                Account
              </Link>
              <Link href="/help" className="block px-4 py-2 text-sm hover:bg-gray-800">
                Help Center
              </Link>
              <div className="border-t border-gray-700 mt-1">
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800">
                  Sign out of Netflix
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;