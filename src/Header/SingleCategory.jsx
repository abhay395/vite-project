import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function SingleCategory() {
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  const AllProducts = useSelector((state) => state.Categorys[1]);
  const filterProduct = AllProducts
    ? AllProducts.filter((item) => item.category === id)
    : null;

  if (filterProduct) {
    return (
      <div
        id="CategoryItems"
        className="flex flex-wrap justify-evenly space-y-3 space-x-2 items-center"
      >
        {filterProduct.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-md border-white p-2 overflow-hidden shadow-2xl w-[300px]"
          >
            <Link to={`/al/${item.id}`}>
              <img
                src={
                  item.images[1] ||
                  item.images[2] ||
                  item.images[3] ||
                  item.images[0]
                }
                alt={item.title}
                className="w-[300px] h-[300px]"
              />
            </Link>
            <p className="font-bold text-[20px]">{item.title}</p>
          </div>
        ))}
      </div>
    );
  }
  return <h1 className="text-[40px] text-blue-600">Loading...</h1>;
}

export default SingleCategory;
