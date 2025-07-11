import React from "react";
import OurStory from "./component/OurStory";
import Gallery from "./component/Gallery";
import EventDetails from "./component/EventDetails";
import RSVP from "./component/RSVP";
import Footer from "./component/Footer";
import Hero from "./component/Hero";

const firstPage = () => {
  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <OurStory />
      <Gallery />
      <EventDetails />
      <RSVP />
      <Footer />
    </div>
  );
};

export default firstPage;
