import React from "react";

const Gallery = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* Replace these with real image URLs */}
        <img src="/photo1.jpg" alt="Gallery 1" className="rounded shadow" />
        <img src="/photo2.jpg" alt="Gallery 2" className="rounded shadow" />
        <img src="/photo3.jpg" alt="Gallery 3" className="rounded shadow" />
      </div>
    </section>
  );
};

export default Gallery;
