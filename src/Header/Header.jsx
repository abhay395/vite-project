import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SetSearchitem, addCatgory } from "../Store/CategorySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Cart";
function Header() {
  const [NotifyCall,setNotifyCall] = useState(true)
  // const notify = () => {
  //   toast("Your OrderPlaced", {
  //     className: "black-background",
  //     bodyClassName: "grow-font-size",
  //     progressClassName: "fancy-progress-bar",
  //   });
  // }
  let Cart = useSelector((state) => state.CartId);
  const authStatus = useSelector((state) => state.status);
  const [searchitem, setsearchitem] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Categorylength = useSelector((state) => state.Categorys).length;
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=100`)
      .then((respo) => respo.json())
      .then((rep) => {
        if (Categorylength < 2) dispatch(addCatgory(rep.products));
      })
      .catch((error) => console.log(error));
  }, []);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Categary",
      slug: "/category",
      active: true,
    },
    {
      name: "All Product",
      slug: "/allproduct",
      active: true,
    },
  ];
  return (
    <div>
      <ul className="flex space-x-10 text-[10px] font-bold z-30  md:text-[20px] items-center px-[45px] z-100 bg-white  sticky py-2 text-black ">
        {navItems.map((item) => {
          return item.active ? (
            <li key={item.name}>
              <Link to={item.slug}>{item.name}</Link>
            </li>
          ) : null;
        })}
        {authStatus && (
          <li to="cart">
            <Link to="cart">
              Cart <span className="text-black">{Cart && Cart.length} </span>{" "}
            </Link>
          </li>
        )}
      </ul>
      <ToastContainer
              toastClassName={({ type }) =>
                contextClass[type || "default"] +
                " relative flex p-1 z-555555 min-h-10 rounded-md justify-between bg-black overflow-hidden cursor-pointer "
              }
              bodyClassName={() => "text-sm font-white z-50  font-med block bg-black p-3 "}
              position="top-center mt-[20px] z-50"
              autoClose={3000}
            />
    </div>
  );
}

export default Header;
