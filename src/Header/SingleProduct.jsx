import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, addedid } from "../Store/CategorySlice";
import { useNavigate } from "react-router-dom";

function SingleProduct() {
  // const [data ,setData]= useState(null)
  // const [Loading ,setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  let [index, setindex] = useState(0);
  const authstatus = useSelector((state) => state.status);
  // const AllProducts = useSelector((state) => state.Categorys[1]);
  // const filterProduct = AllProducts
  //   ? AllProducts.filter((item) => item.id == Number(name))
  //   : [];
  const [filterProduct, setfilterProduct] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((resp)=>setfilterProduct(resp))
      .catch((error)=>console.log(error))
  }, [name]);
  const ideaof = filterProduct.length ? useSelector((state) => state.Addedid) : [];
  const activity =
    ideaof.length != 0 ? ideaof.includes(filterProduct.id) : false;
 
  useEffect(() => {
    if (filterProduct.length != 0) {
      if (index < 0) {
        setindex(filterProduct.images.length - 1);
      }
      if (index > filterProduct.images.length - 1) {
        setindex(0);
        // if(index===0) setindex(0)
      }
    }
  }, [index]);

  const [quantity, setquantity] = useState(1);
  if (filterProduct.length != 0)
    console.log(typeof filterProduct.images.length);
  if (filterProduct.length != 0) {
    return (
      <section className="flex flex-col " id="CategoryItems">
        <section id="section">
          {filterProduct.images.map((item, imageIndex) => {
            let postion = "nextSlide";
            // console.log(imageIndex, index);
            if (imageIndex === index) {
              postion = "activeSlide";
            }
            if (
              imageIndex === index - 1 ||
              (index === 0 && imageIndex === filterProduct.images.length - 1)
            ) {
              postion = "lastSlide";
            }
            return (
              <article id={postion} key={imageIndex}>
                <img src={`${item}`} className="image" alt="" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setindex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setindex(index + 1)}>
            <FiChevronRight />
          </button>
        </section>
        <div className="w-[300px] relative ">
          <div className="absolute top-[10px]">
            <h1 className="font-bold text-[30px]">{filterProduct.title}</h1>
            <h1 className="text-yellow-500 text-[20px] ">
              &#9733;&#9733;&#9733;&#9733;
              <span className="text-[15px] text-black">
                {filterProduct.rating}k
              </span>
            </h1>
            <h2 className="font-semibold text-sky-600 text-[25px]">{`${filterProduct.price}$`}</h2>
            <h2 className="text-[15px] opacity-50  ">
              {filterProduct.description}
            </h2>
            <h4 className="text-[#FF0000] font-bold text-[12px]">
              Only {filterProduct.stock} left{" "}
            </h4>
           
            <div className="flex   ">
              <button className="bg-sky-400 rounded-lg p-2 text-[12px] w-[80px] h-[35px]  ">Bay Now</button>
              <input
                type="number"
                onChange={(e) => setquantity(e.currentTarget.value)}
                value={quantity}
                className="w-[40px]  p-1 m-1"
              />
              <button
                className="bg-yellow-400 rounded-lg p-2 ml-3 text-[12px] w-[80px] h-[35px] "
                onClick={() => {
                  if (authstatus) {
                    if (!activity) {
                      dispatch(addedid(filterProduct.id));
                      dispatch(
                        addCart([
                          filterProduct,
                          { quantityid: Number(quantity) },
                        ])
                      );
                    }
                    navigate("/cart");
                  }
                  else{
                    navigate('/login')
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <span className="loader w-[100px] h-[100px] text-center "></span>
    </div>
  );
}

export default SingleProduct;
