import React from 'react';

export default function Header() {
  return (
    <header className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <a href="/">
        <h1 className="text-white text-2xl font-semibold">Time Waster</h1>
      </a>
      </div>
    </header>
  );
};
