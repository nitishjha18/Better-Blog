import React from 'react'

export default function Container({ children }) {
  return (
    <div className='w-full max-w-none xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'>
      {children}
    </div>
  );
}
