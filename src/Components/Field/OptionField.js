import React from 'react'
import './optionfield.css'
import Options from './Options'

export default function OptionField({options, selected_options, setSelectedOptions, type}) {
  return (
    <div className='option_field_container'>
        {options.map((op,ind)=>(
            <Options type={type} {...op} index = {ind} selected_options={selected_options} setSelectedOptions={setSelectedOptions}/>
        ))}
    </div>
  )
}
