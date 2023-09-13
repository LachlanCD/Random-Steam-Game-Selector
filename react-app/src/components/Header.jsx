import React from 'react';
import { Link } from "react-router-dom";

// returns the header of the page
export default function Header() {
  return (
    <header className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/">
        <h1 className="text-white text-2xl font-semibold">Time Waster</h1>
        </Link>
      </div>
    </header>
  );
};
