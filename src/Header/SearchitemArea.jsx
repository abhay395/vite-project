// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function SearchItemArea() {
//   const name = useSelector((state) => state.SearchItem);
//   ; // Set loading state to true by default
//   var [loading, setLoading] = useState(true)
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     setLoading(true)
//     (`https://dummyjson.com/products/search?q=${name}`)
//       .then((resp) => resp.json())
//       .then((resp) => {
//         // setLoading(true)
//        setData(resp.products);
//         setInterval(()=>setLoading(false),2000); // Set loading to false when data is received
//       })
//       .catch((error) => {
//         console.log(error);
//         // setLoading(false); // Set loading to false in case of an error
//       });
//   }, [name]);
//   //  console.log(name)
//   if (loading) {
//     return (
//       <div className='flex justify-center items-center w-full h-screen'>
//         <span className='loader w-[100px] h-[100px] text-center ' ></span>
//       </div>
//     );
//   }

//   return (
//     <div className='flex' >
//         <div className=' bg-white w-[400px] h-[400px]' >

//         </div>
//     <div className=" flex flex-wrap  justify-center  items-center " id='CategoryItems'>
//       {data.map((item) => (
//         <div
//         id="bounce-element"
//         key={item.id}
//         className="bg-white border rounded-md border-white p-2 m-1 overflow-hidden shadow-2xl w-[300px]"
//       >
//         <Link to={`/al/${item.id}`}>
//           <img
//             src={
//               item.images[1] ||
//               item.images[2] ||
//               item.images[3] ||
//               item.images[0]
//             }
//             alt={item.title}
//             className="w-[300px] h-[300px]"
//           />
//         </Link>
//         <p className="font-bold text-[20px]">{item.title}</p>
//         <div className="flex flex-col ">
//           <h1 className="text-yellow-500 text-[20px] ">
//             &#9733;&#9733;&#9733;&#9733;
//             <span className="text-[15px] text-black">{item.rating}k</span>
//           </h1>
//           <h2 className="font-semibold text-sky-600 text-[20px]">{`${item.price}$`}</h2>
//           <h2 className="text-[10px] opacity-100 ">{item.description}</h2>
//         </div>
//       </div>
//        ))}
//     </div>
//     </div>
//   );
// }
