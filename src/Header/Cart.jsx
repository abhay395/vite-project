import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  removeCart,
  incrementQuantity,
  decrementQuantity,
  removeAllCart,
  // addCart,
} from "../Store/CategorySlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const notify = () => {
    toast("Your OrderPlaced", {
      className: "black-background",
      bodyClassName: "grow-font-size",
      progressClassName: "fancy-progress-bar",
    });
  };
  const [removeid, setremoveid] = useState(null);
  const Cartid = useSelector((state) => state.CartId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalprice = Cartid.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      Number(currentValue[0].price * Number(currentValue[1].quantityid))
    );
  }, 0);
  const discountPrice = Cartid.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      Number(
        currentValue[0].price *
          Number(currentValue[1].quantityid) *
          Number(currentValue[0].discountPercentage / 100)
      )
    );
  }, 0);
  // console.log(totalprice,discountPrice)
  if (Cartid.length !== 0)
    return (
      <div
        id="CategoryItems"
        className="flex  justify-center flex-col md:flex-row  bg-sky-100 mt-[40px] space-y-[40px] relative "
      >
        <div className=" w-[100%] md:w-[60%]  ">
          <div className=" md:ml-[10px] md:mb-[10px] w-[100%] h-[40px] bg-white flex justify-between items-center p-[20px] ">
            <p>
              Delevery :{" "}
              <span className="font-semibold">to indore Gori nagar iti...</span>{" "}
            </p>
            <button className="bg-white px-2 text-[12px] p-1 text-blue-500 border border-opacity-50 rounded-md">
              Change
            </button>
          </div>

          {Cartid.map((item) => (
            <div
              key={item[0].id}
              className="w-[100%] md:ml-[10px] flex items-start bg-white mt-1 relative "
            >
              <div className="p-5 flex flex-col ">
                <img
                  src={
                    item[0].images[1] ||
                    item[0].images[2] ||
                    item[0].images[3] ||
                    item[0].images[0]
                  }
                  alt=""
                  className="w-[150px] h-[150px]"
                />
                <div className=" flex items-center justify-center space-x-3 mt-2 ">
                  <button
                    className="bg-opacity-50  p-0 text-[20px] w-[20px] h-[20px] "
                    onClick={() =>
                      dispatch(incrementQuantity([item[0].id, "+"]))
                    }
                  >
                    <AiOutlinePlusCircle />
                  </button>
                  <p className="border-[1px] text-center w-[40px] border-black">
                    {item[1].quantityid}
                  </p>
                  <button
                    className={` ${
                      item[1].quantityid == 1 ? "opacity-50" : null
                    } `}
                    disabled={item[1].quantityid == 1}
                    onClick={() =>
                      dispatch(decrementQuantity([item[0].id, "-"]))
                    }
                  >
                    <AiOutlineMinusCircle />
                  </button>
                  <button
                    className="text-sky-700"
                    onClick={() => dispatch(removeCart(item[0].id))}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                </div>
              </div>
              <div className="space-x-0 py-5">
                <p className="text-[14px] uppercase font-semibold ">
                  {item[0].description.slice(0, 30)}...
                </p>
                <p className="text-[13px] pt-[8px] pb-[10px] opacity-50 ">
                  Seller:AbhayPrajapati
                </p>
                <div className="flex items-center   space-x-2">
                  <p className="text-sky-700 font-bold text-[20px] ">
                    {item[0].price}$
                  </p>
                  <p className="text-green-600  font-bold text-[12px] pt-[5px] ">
                    {item[0].discountPercentage}% off
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="w-[100%] h-[50px]  md:bottom-0 top-0 mt-1 self-auto sticky bg-white md:ml-2 pr-[10px] flex justify-end items-center ">
            <button
              className="w-auto px-2  p-[10px] bg-yellow-400 "
              onClick={() => {
                dispatch(removeAllCart())
                navigate("/")
                notify();
              }}
            >
              place Order
            </button>
            {/* <ToastContainer
              toastClassName={({ type }) =>
                contextClass[type || "default"] +
                " relative flex p-1 z-555555 min-h-10 rounded-md justify-between bg-black overflow-hidden cursor-pointer "
              }
              bodyClassName={() => "text-sm font-white z-50  font-med block bg-black p-3 "}
              position="top-center mt-[20px] z-50"
              autoClose={3000}
            /> */}
          </div>
        </div>
        <div className="md:w-[300px] w-[100%] z-50 sticky top-[100px]   flex flex-col items-start h-[283px] md:ml-[40px] bg-white">
          <p className=" pl-[20px]  opacity-60 uppercase p-[15px] ">
            Price Detail
          </p>
          <div className="w-full border-[2px] border-opacity-60"></div>
          <div className="flex flex-col w-full ">
            <div className="pl-[20px] mb-4 mt-[20px] space-y-[20px]">
              <p className="flex justify-between w-full ">
                Price({Cartid.length} items){" "}
                <span className="pr-[10px]">{parseInt(totalprice)}$</span>{" "}
              </p>
              <p className="flex justify-between">
                Discount{" "}
                <span className="pr-[10px] text-green-800 ">
                  -{parseInt(discountPrice)}$
                </span>{" "}
              </p>
              <p className="flex justify-between">
                DileveryCharges <span className="pr-[10px]">Free Delevery</span>{" "}
              </p>
            </div>
            <div className="w-[100%] border-[1px] border-dashed border-opacity-60  "></div>
            <p className="pl-[20px] mt-[20px] text-[16px] font-semibold flex justify-between ">
              Total Amount{" "}
              <span className="pr-[10px] font-semibold">
                {parseInt(totalprice - discountPrice)}$
              </span>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    );
  return (
    <h1 className="text-center text-[40px] text-red-700">
      you not add any item{" "}
    </h1>
  );
}

export default Cart;
