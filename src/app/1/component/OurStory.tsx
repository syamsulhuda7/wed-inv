import React from "react";

const OurStory = () => {
  return (
    <section id="our-story" className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">Our Story</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h3 className="text-xl font-bold">2018: First Meet</h3>
          <p className="mt-2">We met at a coffee shop and started talking...</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">2022: Engagement</h3>
          <p className="mt-2">A beautiful day on the beach...</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">2024: Wedding Day</h3>
          <p className="mt-2">Now we are here to celebrate love...</p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
