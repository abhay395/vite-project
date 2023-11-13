import React from 'react'
import {Link} from "react-router-dom"
import CategorName from './CategoryName'
function Category() {
    
    return (
        <div id='CategoryItems' className='flex flex-wrap  justify-evenly   ' >
            {
                CategorName.map((item)=>(
                    <Link to={`/${item}`} key={item} >
                    <div className='h-[100px] flex items-center rounded-lg justify-center bg-teal-500 w-[150px] m-1 ' >
                        <h1>{item}</h1>
                    </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Category
