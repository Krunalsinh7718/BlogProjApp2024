import React, { useState } from 'react';
import Select, {} from 'react-select';
import { Controller } from 'react-hook-form';

function CustSelect({name, options, control,  defaultValue = ""}) {
 
    return ( <>
        <div>
            <Controller
                name={name || "custSelect"}
                control={control}
                render={({ field: { onChange } }) => (<>
                
                <Select
                className="basic-single"
                classNamePrefix="select"
                onChange={onChange}
                defaultValue={options[0]}
                isSearchable={false}
                name="color"
                options={options}
            />
                
                </>)}
            />
         
        </div>
    
    </>);
}

export default CustSelect;