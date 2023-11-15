// import React, { useEffect } from 'react';

// const PreloadImage = ({ imageUrl }) => {
//   useEffect(() => {
//     const link = document.createElement('link');
//     link.rel = 'preload';
//     link.as = 'image';
//     link.href = imageUrl;
//     document.head.appendChild(link);

//     return () => {
//       document.head.removeChild(link);
//     };
//   }, [imageUrl]);

//   return (
//     <div>
//       {/* Your component content */}
//       <img src={imageUrl} alt="Preloaded Image" />
//     </div>
//   );
// };

// export default PreloadImage;
