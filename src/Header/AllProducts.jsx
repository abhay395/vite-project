import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFilterData } from "../Store/CategorySlice";

export default function AllProducts() {
  // sort for high and low
  const [Loading, setLoading] = useState(false);
  const [active, setactive] = useState("relevent");
  const [toggle,setToggle] = useState(false)

  const handelLowtoHigh = () => {
    setactive("lowtohigh");
  };

  const handelhightolow = () => {
    setactive("hightolow");
  };

  const relevence = () => {
    setData(allData);
    setactive("relevent");
  };

  const [activeforPrice, setactiveforprice] = useState("price");
  const [is4, setis4] = useState(false);
  const [price, setprice] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1700);
  const [categoryValue, setValue] = useState("All");
  const [brandValue, setBrandValue] = useState("All");

  // Get product data from Redux store
  const allData = useSelector((state) =>
    state.Categorys[1] ? state.Categorys[1] : []
  );

  const [brands, setBrands] = useState([]);

  let allCategory = allData ? allData.map((item) => item.category) : [];
  allCategory = [...new Set(allCategory)];
  allCategory.unshift("All");

  const [data, setData] = useState([]);

  useEffect(() => {
    const brandsData = allData
      ? ["All", ...new Set(allData.map((item) => item.brand))]
      : [];
    if (categoryValue === "All") setBrands(brandsData);
    setData(allData);
  }, [allData, categoryValue]);
  // Handle filter changes
  useEffect(() => {
    let filteredData = allData ? allData : [];

    if (is4) {
      filteredData = filteredData.filter((item) => item.rating > 4.5);
    }
    if (categoryValue !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category === categoryValue
      );
      setBrands(() => {
        return ["All", ...new Set(filteredData.map((item) => item.brand))];
      });
    }
    if (brandValue !== "All") {
      filteredData = filteredData.filter((item) => item.brand === brandValue);
    }

    if (true) {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) >= min && parseFloat(item.price) <= max
      );
    }
    if (active === "lowtohigh") {
      filteredData = [...filteredData].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }
    if (active === "hightolow") {
      filteredData = [...filteredData].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }
    setLoading(true);
    setData(filteredData);
    const timout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timout);
  }, [active, is4, max, categoryValue, brandValue]);

  if (allData.length > 0) {
    return (
      <div className=" md:flex md:flex-row">
        <div className={` md:w-[300px] sticky top-[30px]    ${toggle?'z-30 mt-0 transition-all ease-in-out delay-500 h-screen ':'hidden'} md:top-[68px] md:flex md:flex-col w-full   items-start h-[483px] md:ml-[20px]  md:mr-[10px] md:mt-2 bg-white md:p-4 md:rounded-lg shadow-md`}>
          <h3 className="text-lg font-semibold">Sort by</h3>

          <button
            className={`rounded p-2 ${
              active === "relevent" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setactive("relevent")}
          >
            Relevance
          </button>
          <button
            className={`rounded p-2 ${
              active === "lowtohigh" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setactive("lowtohigh")}
          >
            Low to High
          </button>
          <button
            className={`rounded p-2 ${
              active === "hightolow" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setactive("hightolow")}
          >
            High to Low
          </button>
          <h3 className="text-lg font-semibold mt-4">Price Range</h3>
          <input
            type="range"
            min={10}
            max={1700}
            value={max}
            onChange={(e) => setMax(e.currentTarget.value)}
          />
          <label htmlFor="">{max}$</label>
          <h3 className="text-lg font-semibold mt-4">Rating</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={is4}
              onChange={() => setis4(!is4)}
            />
            <label htmlFor="is4" className="ml-2">
              4.5 or up
            </label>
          </div>
          <h3 className="text-lg font-semibold mt-4">Category</h3>
          <select
            name=""
            id=""
            onChange={(e) => setValue(e.currentTarget.value)}
            className="rounded p-2 w-full"
          >
            {allCategory.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <h3 className="text-lg font-semibold mt-4">Brands</h3>
          <select
            onChange={(e) => setBrandValue(e.currentTarget.value)}
            className="rounded p-2 w-full"
          >
            {brands
              ? brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              : null}
          </select>
          <div className="w-full flex justify-end md:hidden " ><button className="mr-[20px] bg-yellow-400 px-2 rounded-md " onClick={()=>{setToggle(false)}} >Apply</button></div>
        </div>
        <div className="w-full flex justify-end md:hidden" ><button className="bg-white text-black px-2 mt-[10px] mb-3 text-[20px] rounded-lg mr-4 " onClick={()=>setToggle(!toggle)} >filter</button></div>
        <div
          id="CategoryItems"
          className="flex flex-wrap w-[100%] justify-evenly space-y-3 space-x-2 items-center transition-all ease-in-out delay-500"
        >
          {data.length>0 ? (
            data.map((item) => {
              if (!Loading)
                return (
                  <div
        key={item.id}
        className="bg-white border rounded-md border-white  flex p-2 overflow-hidden shadow-2xl h-[200px] w-[100%]  md:flex-col md:w-[250px] md:h-[350px] "
      >
        <div className="w-[150px] md:w-full md:h-[150px] h-full  transition-all ease-in-out delay-500 " >
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
          <h1 className="text-yellow-500 text-[20px]">
            &#9733;&#9733;&#9733;&#9733;
            <span className="text-[15px] text-black">{item.rating}k</span>
          </h1>
          <h2 className="font-semibold text-sky-600 text-[20px]">{`${item.price}$`}</h2>
          <h2 className="text-[10px] opacity-100 ">{item.description}</h2>
        </div>
      </div>
                );
              else
                return (
                  <div className="flex justify-center items-center w-full h-screen">
                    <span className="loader w-[100px] h-[100px] text-center "></span>
                  </div>
                );
            })
          ) : (
            <h1 className="text-red-700 text-[20px]" >I am not found your search product </h1>
          )}
        </div>
      </div>
    );
  } //if (!Loading) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <span className="loader w-[100px] h-[100px] text-center "></span>
    </div>
  );
  // }
}
