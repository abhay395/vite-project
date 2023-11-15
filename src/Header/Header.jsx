import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SetSearchitem, addCatgory } from "../Store/CategorySlice";
import Cart from "./Cart";
function Header() {
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
      <ul className="flex space-x-10 text-[10px] items-center px-[45px] z-100 bg-cyan-700 shadow-2xl sticky py-2 text-cyan-300 ">
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
              Cart <span className="text-white">{Cart && Cart.length} </span>{" "}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
