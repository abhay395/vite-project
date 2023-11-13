import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFilterData } from "../Store/CategorySlice";

export default function AllProducts() {
  // State variables for sorting and filtering
  const dispatch = useDispatch();
  
  // sort for high and low 
  const [active, setactive] = useState("relevent");

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
  const allData = useSelector((state) => state.Categorys[1]?state.Categorys[1]:[]);
  
 
  const [brands, setBrands] = useState([]);

  let allCategory = allData?allData.map((item) => item.category):[];
  allCategory = [...new Set(allCategory)];
  allCategory.unshift("All");

  const [data, setData] = useState([]);

  
useEffect(()=>{
  const brandsData =allData?["All", ...new Set(allData.map((item) => item.brand))]:[] 
  if(categoryValue==='All') setBrands(brandsData)
  setData(allData);

},[allData,categoryValue])
  // Handle filter changes
  useEffect(() => {
    let filteredData = allData?allData:[];

    if (is4) {
      filteredData = filteredData.filter((item) => item.rating > 4.5);
    }
    if (categoryValue !== "All") {
      filteredData = filteredData.filter((item) => item.category === categoryValue);
      setBrands(() => {
        return ["All", ...new Set(filteredData.map((item) => item.brand))]
      })
    }
    if (brandValue !== "All") {
      filteredData = filteredData.filter((item) => item.brand === brandValue);
    }

    if (true){
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

    setData(filteredData);
  }, [active, is4, max, min, categoryValue, brandValue]);

  if (allData.length>0)
    return (
      <div className="flex flex-row">
        <div className="w-[350px] sticky top-[68px] flex flex-col items-start h-[483px] ml-[20px] mr-[10px] bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Sort by</h3>
          <button
            className={`rounded p-2 ${active === "relevent" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setactive("relevent")}
          >
            Relevance
          </button>
          <button
            className={`rounded p-2 ${active === "lowtohigh" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setactive("lowtohigh")}
          >
            Low to High
          </button>
          <button
            className={`rounded p-2 ${active === "hightolow" ? "bg-blue-500 text-white" : ""}`}
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
            <label htmlFor="is4" className="ml-2">4.5 or up</label>
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
            {brands ? brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )) : null}
          </select>
        </div>
        <div
          id="CategoryItems"
          className="flex flex-wrap w-[70%] justify-evenly space-y-3 space-x-2 items-center transition-all ease-in-out delay-500"
        >
          {data?data.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl h-[400px] w-[250px]"
            >
            <Link to={`/al/${item.id}`}>
                <img
                  src={
                    item.images?item.images[0]:'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg'
                  }
                  alt={item.title}
                  className="w-[300px] h-[75%]"
                />
              </Link>
              <p className="font-bold text-[20px]">{item.title}</p>
              <div className="flex flex-col">
                <h1 className="text-yellow-500 text-[20px]">
                  &#9733;&#9733;&#9733;&#9733;
                  <span className="text-[15px] text-black">{item.rating}k</span>
                </h1>
                <h2 className="font-semibold text-sky-600 text-[20px]">{`${item.price}$`}</h2>
                {/* <h2 className="text-[10px] opacity-100 ">{item.description}</h2> */}
              </div>
            </div>
          )):(
            <h1>loading</h1>
          )}
        </div>
      </div>
    );
    // if (loading) {
          return (
            <div className='flex justify-center items-center w-full h-screen'>
              <span className='loader w-[100px] h-[100px] text-center ' ></span>
            </div>
          );
        // }
}
