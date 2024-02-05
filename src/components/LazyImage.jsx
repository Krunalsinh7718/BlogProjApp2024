import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function LazyImage({ src, alt, height, width, className, ...props }) {
  return (
    <LazyLoadImage
      alt={alt}
      height={height}
      width={width}
      src={src} 
      className={className}
      {...props}
    />
  );
}

export default LazyImage;
