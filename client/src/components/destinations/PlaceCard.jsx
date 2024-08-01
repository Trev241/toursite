// import React from "react";
// import { IoLocationSharp } from "react-icons/io5";

// const PlaceCard = ({
//   img,
//   title,
//   location,
//   description,
//   price,
//   type,
//   handleBookClick,
// }) => {
//   return (
//     <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-white dark:text-black cursor-pointer">
//       <div className="overflow-hidden">
//         <img
//           src={img}
//           alt={title}
//           className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
//         />
//       </div>
//       <div className="space-y-2 p-3">
//         <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
//         <div className="flex items-center gap-2 opacity-70">
//           <IoLocationSharp />
//           <span>{location}</span>
//         </div>
//         <p className="line-clamp-2">{description}</p>
//         <div className="flex items-center justify-between border-t-2 py-3 !mt-3">
//           <div className="opacity-70">
//             <p>{type}</p>
//           </div>
//           <div className="flex items-center">
//             <p className="text-2xl font-bold mr-4">${price}</p>
//             <button
//               onClick={handleBookClick}
//               className="px-4 py-2 bg-primary text-white font-bold rounded hover:bg-primary-dark"
//             >
//               Book
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceCard;
