import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFilterData } from "../Store/CategorySlice";

export default function AllProducts() {
  // State variables for sorting and filtering
  const dispatch = useDispatch();
  const [active, setactive] = useState("relevent");
  const [activeforPrice, setactiveforprice] = useState("price");
  const [is4, setis4] = useState(false);
  const [price, setprice] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [categoryValue, setValue] = useState("All");
  const [brands, setBrands] = useState([]);
  const [brandValue, setBrandValue] = useState("All");

  // Get product data from Redux store
  const allData = useSelector((state) => state.Categorys[1]);

  let allCategory = allData.map((item) => item.category);
  allCategory = [...new Set(allCategory)];
  allCategory.unshift("All");

  const [data, setData] = useState(allData);

  // Sorting functions
  const handelLowtoHigh = () => {
    setactive("lowtohigh");
  };

  const handelhightolow = () => {
    setactive("hightolow");
  };

  // Reset to the original data
  const relevence = () => {
    setData(allData);
    setactive("relevent");
  };

  // Handle filter changes
  useEffect(() => {
    let filteredData = allData;

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

    if (activeforPrice === "price") {
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

  if (allData)
    return (
      <div className="flex flex-row">
        <div className="w-[350px] sticky top-[68px] flex flex-col items-start h-[483px] ml-[20px] mr-[10px] bg-white">
          <p>Sort by</p>
          <button
            className={active === "relevent" ? "bg-slate-400" : ""}
            onClick={() => {
              relevence();
            }}
          >
            Relevance
          </button>
          <button
            className={active === "lowtohigh" ? "bg-slate-400" : ""}
            onClick={handelLowtoHigh}
          >
            Low to High
          </button>
          <button
            className={active === "hightolow" ? "bg-slate-400" : ""}
            onClick={handelhightolow}
          >
            High to Low
          </button>
          <p>Price</p>
          <input
            type="range"
            min={10}
            max={1700}
            onChange={(e) => setMax(e.currentTarget.value)}
          />
          <label htmlFor="">{max}$</label>
          <p>Rating</p>
          <div>
            <input
              type="checkbox"
              checked={is4}
              onChange={() => setis4(!is4)}
            />
            <label htmlFor="is4">4.5 or up</label>
          </div>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setValue(e.currentTarget.value)}
            >
              {allCategory.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <p>Brands</p>
          <select onChange={(e) => setBrandValue(e.currentTarget.value)}>
            {brands
              ? brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div
          id="CategoryItems"
          className="flex flex-wrap w-[70%] justify-evenly space-y-3 space-x-2 items-center transition-all ease-in-out delay-500"
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl h-[300px] w-[250px]"
            >
              <Link to={`/al/${item.id}`}>
                <img
                  src={
                    item.images[0] ||
                    item.images[1] ||
                    item.images[2] ||
                    item.images[3]
                  }
                  alt={item.title}
                  className="w-[300px] h-[200px]"
                />
              </Link>
              <p className="font-bold text-[20px]">{item.title}</p>
              <div className="flex flex-col">
                <h1 className="text-yellow-500 text-[20px]">
                  &#9733;&#9733;&#9733;&#9733;
                  <span className="text-[15px] text-black">{item.rating}k</span>
                </h1>
                <h2 className="font-semibold text-sky-600 text-[20px]">{`${item.price}$`}</h2>
                <h2 className="text-[10px] opacity-100 ">{item.description}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
