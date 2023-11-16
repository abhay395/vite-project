import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { addCart,  } from "../Store/CategorySlice";
function Items({ Category }) {
  const [data, setData] = useState([]);
  const AllProducts = useSelector((state) => state.Categorys[1]);
  const dispatch = useDispatch();
  const filterProduct = AllProducts
    ? AllProducts.filter((item) => item.category === Category)
    : null;
 

  if (filterProduct) {
    return (
      <div
        id="CategoryItems"
        className=" flex flex-col justify-evenly md:flex-row md:flex-wrap space-y-3 space-x-2 items-center transition-all ease-in-out delay-500"
      >
        {filterProduct.map((item) => (
        <div
        key={item.id}
        className="bg-white border rounded-md border-white flex p-2 overflow-hidden shadow-2xl h-[200px] w-[100%]  md:flex-col md:w-[250px] md:h-[350px] "
      >
        <div className="w-[150px] md:w-full md:h-[150px] h-full " >
      <Link to={`/al/${item.id}`}>
          <img
            src={
              item.images?item.images[0]:'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg'
            }
            alt={item.title}
            className=" w-[100%] h-full xl:w-[300px] "
          />
        </Link>
        </div>
        <div className="flex flex-col ml-[10px] w-[200px]  ">
        <p className="font-bold text-[20px]">{item.title.slice(0,20)}</p>
          <h1 className="text-yellow-600 text-[20px]">
            &#9733;&#9733;&#9733;&#9733;
            <span className="text-[15px] text-black">{item.rating}k</span>
          </h1>
          <h2 className="font-semibold text-sky-700 text-[20px]">{`${item.price}$`}</h2>
          <h2 className="text-[10px] opacity-100 ">{item.description}</h2>
        </div>
      </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-evenly space-y-3 space-x-2 items-center transition-all ease-in-out delay-500 w-[100%] ">
      <div className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl w-[90%] h-[150px] "></div>
      <div className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl w-[90%] h-[150px] "></div>
    </div>
  );
}

export default Items;
