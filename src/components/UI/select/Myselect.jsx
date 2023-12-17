import React from 'react';
import cl from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select className={cl.mySelect} value={value} onChange={e => onChange(e.target.value)}>
            <option value="id">{defaultValue}</option>
            {options.map(opt => 
                <option key={opt.value} value={opt.value}>{opt.name}</option>  
            )}
        </select>
    );
};

export default MySelect;