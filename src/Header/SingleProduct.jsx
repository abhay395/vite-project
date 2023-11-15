import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, addedid } from "../Store/CategorySlice";
import { useNavigate } from "react-router-dom";

function SingleProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  const [index, setIndex] = useState(0);
  const authStatus = useSelector((state) => state.status);
  const allProducts = useSelector((state) => state.Categorys[1]);
  const filterProduct = allProducts?.find(item => item.id === Number(name)) || {};

  const ideaOf = useSelector((state) => state.Addedid) || [];
  const activity = ideaOf.includes(filterProduct.id);

  useEffect(() => {
    if (filterProduct.images?.length && index < 0) {
      setIndex(filterProduct.images.length - 1);
    } else if (filterProduct.images?.length && index > filterProduct.images.length - 1) {
      setIndex(0);
    }
  }, [index, filterProduct]);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (authStatus) {
      if (!activity) {
        dispatch(addedid(filterProduct.id));
        dispatch(addCart([filterProduct, { quantityid: Number(quantity) }]));
      }
      navigate("/cart");
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="flex flex-col" id="CategoryItems">
      {filterProduct.images && (
        <section id="section">
          {filterProduct.images.map((item, imageIndex) => {
            let position = "nextSlide";
            if (imageIndex === index) {
              position = "activeSlide";
            }
            if (
              imageIndex === index - 1 ||
              (index === 0 && imageIndex === filterProduct.images.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article id={position} key={imageIndex}>
                <img src={`${item}`} className="max-w-[800px] w-[100%] h-full text-center relative flex " alt=""/>
              </article>
            );
          })}
          <button className=" left-0 prev " onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="right-0 next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </section>
      )}
      <div className="w-[300px] relative ">
        <div className="absolute top-[10px]">
          <h1 className="font-bold text-[30px]">{filterProduct.title}</h1>
          <h1 className="text-yellow-500 text-[20px]">
            &#9733;&#9733;&#9733;&#9733;
            <span className="text-[15px] text-black">{filterProduct.rating}k</span>
          </h1>
          <h2 className="font-semibold text-sky-600 text-[25px]">{`${filterProduct.price}$`}</h2>
          <h2 className="text-[15px] opacity-50">{filterProduct.description}</h2>
          <h4 className="text-[#FF0000] font-bold text-[12px]">
            Only {filterProduct.stock} left
          </h4>
          <div className="flex">
            <button className="bg-sky-400 rounded-lg p-2 text-[12px] w-[80px] h-[35px]">
              Buy Now
            </button>
            <input
              type="number"
              onChange={(e) => setQuantity(e.currentTarget.value)}
              value={quantity}
              className="w-[40px] p-1 m-1"
            />
            <button
              className="bg-yellow-400 rounded-lg p-2 ml-3 text-[12px] w-[80px] h-[35px]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
