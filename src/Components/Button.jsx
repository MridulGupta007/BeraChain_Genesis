import React from 'react'

function Button(props) {
  return (
    <button className={'bg-[#232323]/20 hover:bg-[#fff] hover:text-black duration-500 ease-in-out px-4 py-2 rounded-full shadow-custom ' + props.cl } onclick={props.func}>
        {props.children}
    </button>
  )
}

export default Button