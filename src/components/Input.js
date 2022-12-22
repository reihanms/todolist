import React from 'react'

const Input = ({placeholder, type, value, change}) => {
  return (
    <input 
        style={myinput}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={change}
        />
  )
}

export default Input

const myinput = {
    width : '80%',
    border : 'none',
    borderBottom : '1px solid #57ae4f',
    marginBottom : '2rem',
    marginLeft : '2rem'
}