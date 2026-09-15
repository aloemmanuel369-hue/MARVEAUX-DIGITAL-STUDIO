import React from 'react'

export default function Button({children, className='', ...props}){
  return (
    <button className={`px-4 py-2 rounded-md bg-brand text-white h-11 ${className}`} {...props}>{children}</button>
  )
}
