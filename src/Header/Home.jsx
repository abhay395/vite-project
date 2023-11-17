import React, { useEffect, useState } from "react";
import CategorName from "./CategoryName";
import Items from "./Items";
import PreloadImage from "./PreloadImage";
import {useDispatch, useSelector} from 'react-redux'
function Home() {
  const dispatch = useDispatch() 
  const [Loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timout);
  }, []);
  const singleProduct = useSelector(state=>state.Categorys[1]?state.Categorys[1][5]:null)
  const ImageUrl = 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  console.log(singleProduct)
  if(!Loading) return (
    <div id="CategoryItems" >
      <section id="hero-Section">
        <div className="relative w-full h-[200px] md:h-[400px] ">
          <PreloadImage imageUrl={ImageUrl} className={'w-[100%] h-[200px] md:h-[400px]'} />
         
        </div>
      </section>
      {CategorName.map((item) => {
        return (
          <section key={item}>
            <div className="flex flex-col items-center space-y-1 ">
              <h1 className="text-center font-semibold text-[30px] text-sky-700 ">
                {item}
              </h1>
              <div className="border-[2px] rounded-md border-sky-500 w-[120px]"></div>
            </div>
            <div
              id="CategoryItems"
              className=" flex flex-wrap justify-evenly space-y-3 items-center "
            >
              <Items Category={item} />
            </div>
          </section>
        );
      })}
    </div>
  );
  return (<div className="flex justify-center items-center w-full h-screen">
  <span className="loader w-[100px] h-[100px] text-center "></span>
</div>)
}

export default Home;
