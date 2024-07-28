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

      <img className='fixed bottom-5 left-5 z-50 w-20' src="pet.png" alt="" />
      <MainLayout>
        <div className="flex-grow flex justify-start px-20 2xl:px-60 items-center h-screen p-4 relative duration-500 transition-all">
          <div className="w-full max-w-3xl text-center pr-20">
            <div className='relative'>
              <h1 className="text-5xl text-navy font-bold mb-10 scale-110">Bienvendio a AdopMe</h1>
              <img className='w-11 right-1 top-0 absolute' src="huella.png" alt="" />
            </div>
            <p className="mb-8 text-gray-800 px-8 text-lg relative text">
              En AdopMe, creemos que todos los animales merecen un hogar lleno de amor y cuidados. Nuestro propósito es conectar a personas generosas como tú con mascotas que buscan una familia. Aquí, puedes dar en adopción a tus queridos compañeros para que encuentren un nuevo hogar, o bien, encontrar a ese amigo peludo que has estado buscando.

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
      <section id='mostrar' className={`${mostrar ? 'flex' : 'hidden'} flex w-full 2xl:gap-8 px-10 2xl:px-40 py-20 bg-sky-100`}>
        <div className="flex-grow p-4 w-[60%]">
          <h1 className="text-3xl font-bold mb-4">Gallery</h1>
          <ImageGallery />
        </div>
        <div className="w-[40%] mb-8 pt-16 flex justify-center items-center flex-col">

          <h3 className='text-3xl text-navy font-bold mb-10'>¿Por qué adoptar?</h3>
          <p className=" text-gray-800 px-8 text-base 2xl:text-lg text-center">
           

            Salvas una vida: Al adoptar, le das una segunda oportunidad a un animal en necesidad.
            Haces espacio para más rescates: Cuando adoptas, liberas recursos para que más animales puedan ser rescatados.
            <span className='text-[#fe8c81] font-semibold'> Encuentras un amigo fiel: Las mascotas adoptadas suelen ser extremadamente agradecidas y leales.</span>

          </p>

          <img className='mx-auto 2xl w-60 2xl:w-[70%]' src="heart.webp" alt="" />
        </div>
      </section>


      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-full  bg-sky-100 pb-20`}>
        <SliderPets />
      </section>

      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-[60%] mx-auto text-center py-20 text-navy`}>

        <p className='underline'>Únete a nosotros y sé parte de una comunidad que se preocupa por el bienestar animal. ¡Adopta, no compres! Dale la oportunidad a una mascota de ser parte de tu familia.
        </p>
      </section>

      <section className={`${mostrar ? 'flex' : 'hidden'} flex w-full  bg-sky-100`}>

        <Footer />

      </section>
    </motion.div>
  );
};

export default HomePage;
