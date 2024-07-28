import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import img from '../../assets/fondo2.png';
import ImageGallery from '../organisms/ImageGallery';
import SliderPets from '../organisms/SliderPets';
import Footer from '../organisms/Footer';

const HomePage = () => {

  const [mostrar, setMostrar] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-pastelBlue font-sans"
    >
      <MainLayout>
        <div className="flex-grow flex justify-start px-20 2xl:px-60 items-center h-screen p-4 relative duration-500 transition-all">
          <div className="w-full max-w-3xl text-center pr-20">
            <h1 className="text-5xl text-navy font-bold mb-10 scale-110">Welcome to AdopMe</h1>
            <p className="mb-8 text-gray-800 px-8 text-lg">
              This is the home page. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus nostrum necessitatibus magnam reiciendis consequuntur corrupti recusandae! Doloremque illum eaque nobis rem aliquid similique nulla ipsam soluta iusto numquam quas perspiciatis, minus aliquam tenetur omnis distinctio nihil officiis dicta deserunt. Dignissimos?
            </p>
            <a href='#mostrar' onClick={() => { setMostrar(!mostrar) }} className="relative px-6 py-3 font-bold text-black group">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">{mostrar ? 'Ver Menos' : 'Ver Mas'}</span>
            </a>
          </div>
          <img
            className="absolute right-16 -bottom-10 w-[32%] opacity-90 transition-transform transform hover:scale-105 mask-image"
            src={img}
            alt="Fondo"
          />
        </div>
      </MainLayout>
      <section id='mostrar' className={`${mostrar ? 'flex' : 'hidden'} flex w-full px-40 py-20 bg-sky-100`}>
        <div className="flex-grow p-4 w-[60%]">
          <h1 className="text-3xl font-bold mb-4">Gallery</h1>
          <ImageGallery />
        </div>
        <div className="w-[40%]">
          <p className="mb-8 pt-16 text-gray-800 px-8 text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi eius similique quia quo, architecto ex praesentium quibusdam eaque, optio natus fugiat ea quae quod cupiditate distinctio fuga, voluptas soluta aliquid. Quibusdam necessitatibus fugiat architecto, quod debitis iure pariatur totam consectetur voluptatum quidem quas tempora minima, corporis minus nisi labore ad modi ab placeat. Ut, similique accusamus et odio dolores laboriosam quaerat consequuntur repellat delectus velit nobis iste vero ipsam corrupti dolorum tempora hic sit fugit. Doloremque quidem nobis, eius praesentium obcaecati id placeat dolore. Maiores nihil ad distinctio, voluptatum possimus vero. Cumque culpa officiis fugit eaque perspiciatis voluptatibus, reiciendis laboriosam.
          </p>
        </div>
      </section>


      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-full  bg-sky-100 pb-20`}>
        {/* <div className="flex-grow p-4 w-full">
          <h1 className="text-3xl font-bold mb-4">Gallery</h1> */}
    <SliderPets/>
        {/* </div> */}
      </section>

      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-[60%] mx-auto text-center py-20 text-navy`}>
      
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptatum eos rerum beatae quibusdam esse assumenda voluptas expedita corrupti molestias ut numquam dolorum, non fugit hic ipsum sequi dolore inventore. Optio, quaerat! Veniam qui aliquid ut! Odio maxime sint eos obcaecati dolore nisi itaque labore facere dolores laborum rem alias, facilis vel corporis minima! Aspernatur nihil molestias consequuntur eveniet eligendi doloribus dolorem architecto harum provident eius tempora in recusandae nobis, veritatis nisi necessitatibus sequi officia illum sint laboriosam debitis neque! Illum, eius hic quo voluptatem expedita, impedit reprehenderit facilis repudiandae aut magnam architecto, natus consequatur exercitationem nesciunt nemo sapiente non?</p>
        </section>

      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-full  bg-sky-100`}>
      
    <Footer/>

      </section>
    </motion.div>
  );
};

export default HomePage;
