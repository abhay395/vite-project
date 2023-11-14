// import React, { useEffect, useState } from "react";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { addCart, addedid } from "../Store/CategorySlice";
// import { useNavigate } from "react-router-dom";

// function SingleProduct() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { name } = useParams();
//   let [index, setIndex] = useState(0);
//   const authStatus = useSelector((state) => state.status);
//   const AllProducts = useSelector((state) => state.Categorys[1]);
//   const filterProduct = AllProducts
//     ? AllProducts.filter((item) => item.id === Number(name))
//     : [];
//   const ideaOf = filterProduct ? useSelector((state) => state.Addedid) : [];
//   const activity = ideaOf.length !== 0 ? ideaOf.includes(filterProduct[0].id) : false;

//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   useEffect(() => {
//     if (filterProduct.length !== 0) {
//       const imagePromises = filterProduct[0].images.map((item) => {
//         return new Promise((resolve, reject) => {
//           const img = new Image();
//           img.src = item;
//           img.onload = () => resolve();
//           img.onerror = () => reject();
//         });
//       });

//       Promise.all(imagePromises)
//         .then(() => setImagesLoaded(true))
//         .catch(() => setImagesLoaded(true));
//     }
//   }, [filterProduct]);

//   useEffect(() => {
//     if (filterProduct.length !== 0) {
//       if (index < 0) {
//         setIndex(filterProduct[0].images.length - 1);
//       }
//       if (index > filterProduct[0].images.length - 1) {
//         setIndex(0);
//       }
//     }
//   }, [index, filterProduct]);

//   const [quantity, setquantity] = useState(1);

//   if (filterProduct.length !== 0 && imagesLoaded) {
//     return (
//       <section className="flex flex-col" id="CategoryItems">
//          <section id="section">
//           {filterProduct[0].images.map((item, imageIndex) => {
//             let postion = "nextSlide";
//             // console.log(imageIndex, index);
//             if (imageIndex === index) {
//               postion = "activeSlide";
//             }
//             if (
//               imageIndex === index - 1 ||
//               (index === 0 && imageIndex === filterProduct[0].images.length - 1)
//             ) {
//               postion = "lastSlide";
//             }
//             return (
//               <article id={postion} key={imageIndex}>
//                 <img src={`${item}`} className="image" alt="" />
//               </article>
//             );
//           })}
//           <button className="prev" onClick={() => setindex(index - 1)}>
//             <FiChevronLeft />
//           </button>
//           <button className="next" onClick={() => setindex(index + 1)}>
//             <FiChevronRight />
//           </button>
//         </section>
//         <div className="w-[300px] relative ">
//           <div className="absolute top-[10px]">
//             <h1 className="font-bold text-[30px]">{filterProduct[0].title}</h1>
//             <h1 className="text-yellow-500 text-[20px] ">
//               &#9733;&#9733;&#9733;&#9733;
//               <span className="text-[15px] text-black">
//                 {filterProduct[0].rating}k
//               </span>
//             </h1>
//             <h2 className="font-semibold text-sky-600 text-[25px]">{`${filterProduct[0].price}$`}</h2>
//             <h2 className="text-[15px] opacity-50  ">
//               {filterProduct[0].description}
//             </h2>
//             <h4 className="text-[#FF0000] font-bold text-[12px]">
//               Only {filterProduct[0].stock} left{" "}
//             </h4>
           
//             <div className="flex   ">
//               <button className="bg-sky-400 rounded-lg p-2 text-[12px] w-[80px] h-[35px]  ">Bay Now</button>
//               <input
//                 type="number"
//                 onChange={(e) => setquantity(e.currentTarget.value)}
//                 value={quantity}
//                 className="w-[40px]  p-1 m-1"
//               />
//               <button
//                 className="bg-yellow-400 rounded-lg p-2 ml-3 text-[12px] w-[80px] h-[35px] "
//                 onClick={() => {
//                   if (authstatus) {
//                     if (!activity) {
//                       dispatch(addedid(filterProduct[0].id));
//                       dispatch(
//                         addCart([
//                           filterProduct[0],
//                           { quantityid: Number(quantity) },
//                         ])
//                       );
//                     }
//                     navigate("/cart");
//                   }
//                   else{
//                     navigate('/login')
//                   }
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       {/* Display a loader or a placeholder */}
//       <span className="loader w-[100px] h-[100px] text-center"></span>
//     </div>
//   );
// }

// export default SingleProduct;
