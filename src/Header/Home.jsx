import React from "react";
import CategorName from "./CategoryName";
import Items from "./Items";
import {useDispatch} from 'react-redux'
function Home() {
  const dispatch = useDispatch() 
  return (
    <div id="CategoryItems" >
      <section id="hero-Section">
        <div className="relative">
          <img src="https://images.pexels.com/photos/3762927/pexels-photo-3762927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-[100%] h-auto" alt="" />
          <h1 className="absolute left-[30px] text-[20px] bottom-[150px] text-red-400 ">
            Cool Red Shirt{" "}
          </h1>
          <button className="absolute bottom-[100px] left-[20px] text-[30px] bg-white px-[10px] rounded-md  text-sky-400 ">
            buy Now
          </button>
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
}

export default Home;
