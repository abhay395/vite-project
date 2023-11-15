import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addCart,  } from "../Store/CategorySlice";
function Items({ Category }) {
  const [data, setData] = useState([]);
  const AllProducts = useSelector((state) => state.Categorys[1]);
  const dispatch = useDispatch();
  // if(AllProducts) console.log(AllProducts)
  const filterProduct = AllProducts
    ? AllProducts.filter((item) => item.category === Category)
    : null;
  // const [Loading, setLoading] = useState(false);
  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products/category/${Category}?limit=4`)
  //     .then((respo) => respo.json())
  //     .then((rep) => {
  //       setData(rep.products);
  //       setLoading(true);
  //     })
  //     .catch((error) => console.log(error));
  // }, [Category]);

  if (filterProduct) {
    return (
      <div
        id="CategoryItems"
        className=" flex flex-wrap justify-evenly space-y-3 space-x-2 items-center transition-all ease-in-out delay-500"
      >
        {filterProduct.map((item) => (
          <div
            // id="bounce-element"
            key={item.id}
            className="bg-white border rounded-md border-white p-2 flex overflow-hidden shadow-2xl h-[150px] w-[90%]"
            
          >
           <Link to={`/al/${item.id}`}>
                
                <div className={`w-[100px] h-[120px] bg-[url('${item.images[0]}')] `} ><img
                  src={
                    item.images[0]|| 'https://img.freepik.com/premium-photo/floating-computer-online-shop-shopping-bags_72104-2478.jpg'
                  }
                  alt={item.title}
                  className=" w-full h-full "
                />
                </div>
              </Link>
            <div className="flex flex-col ml-[10px] ">
            <p className="font-bold text-[20px]">{item.title}</p>
              <h1 className="text-yellow-500 text-[20px] ">
                &#9733;&#9733;&#9733;&#9733;
                <span className="text-[15px] text-black">{item.rating}k</span>
              </h1>
              <h2 className="font-semibold text-sky-600 text-[20px]">{`${item.price}$`}</h2>
              {/* <h2 className="text-[10px] opacity-100 ">{item.description}</h2> */}
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
