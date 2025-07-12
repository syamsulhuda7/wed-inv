import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Image width={300} height={200} src="/photo1.jpg" alt="photo1" />
        <Image width={300} height={200} src="/photo2.jpg" alt="photo2" />
        <Image width={300} height={200} src="/photo3.jpg" alt="photo3" />
      </div>
    </section>
  );
};

export default Gallery;
