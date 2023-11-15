import React, { useEffect } from 'react';

const PreloadImage = ({ imageUrl ,className=''}) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [imageUrl]);

  return (
    <div className='w-[100%] h-auto' >
      {/* Your component content */}
      <img src={imageUrl} alt="Preloaded Image" className={`${className}`}  />
    </div>
  );
};

export default PreloadImage;
