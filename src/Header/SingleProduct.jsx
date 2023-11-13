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
  const AllProducts = useSelector((state) => state.Categorys[1]);
  const filterProduct = AllProducts
    ? AllProducts.filter((item) => item.id == Number(name))
    : [];
  const ideaof = filterProduct ? useSelector((state) => state.Addedid) : [];
  const activity =
    ideaof.length != 0 ? ideaof.includes(filterProduct[0].id) : false;
  // window.addEventListener("beforeunload", function (e) {
  //   // Cancel the event
  //   e.preventDefault();
  //   // Chrome requires returnValue to be set
  //   e.returnValue = "";

  //   // Display a confirmation message to the user
  //   const confirmationMessage = "Leaving this page will result in data loss.";
  //   e.returnValue = confirmationMessage;
  //   return confirmationMessage;
  // });
  useEffect(() => {
    if (filterProduct.length != 0) {
      if (index < 0) {
        setindex(filterProduct[0].images.length - 1);
      }
      if (index > filterProduct[0].images.length - 1) {
        setindex(0);
        // if(index===0) setindex(0)
      }
    }
  }, [index]);

  const [quantity, setquantity] = useState(1);
  if (filterProduct.length != 0)
    console.log(typeof filterProduct[0].images.length);
  if (filterProduct.length != 0) {
    return (
      <section className="flex " id="CategoryItems">
        <section id="section">
          {filterProduct[0].images.map((item, imageIndex) => {
            let postion = "nextSlide";
            // console.log(imageIndex, index);
            if (imageIndex === index) {
              postion = "activeSlide";
            }
            if (
              imageIndex === index - 1 ||
              (index === 0 && imageIndex === filterProduct[0].images.length - 1)
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
          <div className="absolute top-[120px]">
            <h1 className="font-bold text-[40px]">{filterProduct[0].title}</h1>
            <h2 className="font-semibold text-sky-600 text-[30px]">{`${filterProduct[0].price}$`}</h2>
            <h2 className="text-[20px] opacity-50 mt-[20px] ">
              {filterProduct[0].description}
            </h2>
            <h4 className="text-[#FF0000] font-bold text-[12px]">
              Only {filterProduct[0].stock} left{" "}
            </h4>
            <h1 className="text-yellow-500 text-[20px] ">
              &#9733;&#9733;&#9733;&#9733;
              <span className="text-[15px] text-black">
                {filterProduct[0].rating}k
              </span>
            </h1>
            <div className="flex fl  ">
              <button className="bg-sky-400 rounded-lg p-2">Bay Now</button>
              <input
                type="number"
                onChange={(e) => setquantity(e.currentTarget.value)}
                value={quantity}
                className="w-[40px] border border-black p-1 m-1"
              />
              <button
                className="bg-yellow-400 rounded-lg p-2 ml-3 "
                onClick={() => {
                  if (authstatus) {
                    if (!activity) {
                      dispatch(addedid(filterProduct[0].id));
                      dispatch(
                        addCart([
                          filterProduct[0],
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
{
  /* <div id="for-image" className="relative" >
<div id="Side"   ><img src={filterProduct[0].images[1]} alt="" /></div>
<div id="active" ><img src={filterProduct[0].images[2]} alt="" /></div>
<div id="Side" ><img src={filterProduct[0].images[3]} alt="" /></div>
<div id="Side" ><img src={filterProduct[0].images[4]} alt="" /></div>
</div> */
}
