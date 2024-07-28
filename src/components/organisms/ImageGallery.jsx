// src/components/organisms/ImageGallery.js
import React from 'react';
import ImageCard from '../molecules/ImageCard';

const images = [
  { src: 'https://www.nunpet.es/blog/wp-content/uploads/2022/03/consejos-adoptar-perros-1.webp', alt: 'Placeholder 1', size: 'large' },
  { src: 'https://t1.uc.ltmcdn.com/es/posts/2/3/9/como_encontrar_perros_para_adoptar_1932_600_square.jpg', alt: 'Placeholder 2', size: 'small' },
  { src: 'https://cdn.shopify.com/s/files/1/0468/5460/2913/files/no-compres-adopta.jpg?v=1605174526', alt: 'Placeholder 3', size: 'large' },
  { src: 'https://www.respetmascotas.com/posts/asset_upload_file2488_674610.jpg', alt: 'Placeholder 4', size: 'small' },
  { src: 'https://soyfotografodeperros.com/wp-content/uploads/2019/10/Cachorros-1.jpg', alt: 'Placeholder 5', size: 'large' },
  { src: 'https://wowcan.com.co/wp-content/uploads/2018/07/puppy-dog-animal-cute-canine-wildlife-697035-pxhere.com_.jpg', alt: 'Placeholder 6', size: 'large' },
  { src: 'https://wowcan.com.co/wp-content/uploads/2018/07/puppy-dog-animal-cute-canine-wildlife-697035-pxhere.com_.jpg', alt: 'Placeholder 7', size: 'large' },

];

const ImageGallery = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {images.map((image, index) => (
      <ImageCard key={index} src={image.src} alt={image.alt} size={image.size} />
    ))}
  </div>
);

export default ImageGallery;
