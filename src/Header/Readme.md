<!-- import React from "react";
function Home() {
  return (
    <div>
      <section id="hero-Section">
        <div className="relative">
          <img src="../../public/img/hero4.png" alt="" />
          <h1 className="absolute left-[30px] text-[20px] bottom-[150px] text-red-400 ">Cool Red Shirt </h1>
          <button className="absolute bottom-[100px] left-[20px] text-[30px] bg-white px-[10px] rounded-md  text-sky-400 ">
            buy Now
          </button>
        </div>
      </section>
      <section id="Category-Section" className="bg-sky-50" >
       <div className="flex flex-col items-center space-y-1 " >
        <h1 className="text-center font-semibold text-[30px] text-sky-700 " >Category</h1>
        <div className="border-[2px] rounded-md border-sky-500 w-[120px]" ></div>
        </div> 
        <div id="CategoryItems" className=" flex flex-wrap justify-evenly space-y-3 items-center "  >
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/category-images/60ab2c72778b5.png" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Mens</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://www.octaveclothing.com/sites/default/files/styles/large/public/2023-02/0C8A3945.jpg?itok=oRDoQwZp" alt="" className="w-[300px] h-[300px] "   />
                <p className="font-bold text-[20px]" >Womans</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.unsplash.com/photo-1596392927852-2a18c336fb78?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Boys</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Girls</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.pexels.com/photos/1697218/pexels-photo-1697218.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Wacthes</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.pexels.com/photos/12963835/pexels-photo-12963835.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Kurtesh</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Electroincs</p>
            </div>
            <div className="bg-white  bor border rounded-md border-white p-2 overflow-hidden  shadow-2xl  w-[300px] " >
                <img src="https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-[300px] h-[300px] " />
                <p className="font-bold text-[20px]" >Laptops</p>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Home; -->

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Items({Category}) {
    const [data,setData]= useState([])
    const [Loading, setLoading] = useState(false);
    useEffect(()=>{
        fetch(`https://dummyjson.com/products/category/${Category}?limit=4`)
    .then((respo)=>respo.json())
    .then((rep)=>{setData(rep.products)
    setLoading(true)
    })
    .catch((error)=>console.log(error))
},[Category]) 
if(data!==0) console.log(data)

    
    if(data.length!==0){
       return Loading ?( <div id="CategoryItems" className="flex flex-wrap justify-evenly space-y-3 space-x-2 items-center">
       {data.map((item) => (
        <Link to={`/al/${item.id}`} key={item.id} > <div  className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl w-[300px]">
           <img
             src={item.images[1] || item.images[2] || item.images[3]||item.images[0] }
             alt={item.title}
             className="w-[300px] h-[300px]"
           />
           <p className="font-bold text-[20px]">{item.title}</p>
         </div>
         </Link>
       ))}
     </div>):(<h1>Hell</h1>)}
       else return <h1>Hello</h1>
    
    
}

export default Items
 -->
