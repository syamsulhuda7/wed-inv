"use client";

import React from "react";
import Countdown from "react-countdown";

interface rendererData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const Hero = () => {
  // Renderer callback with condition
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: rendererData) => {
    if (completed) {
      // Render a completed state
      return <span className="text-2xl font-bold">It's Wedding Day! 🎉</span>;
    } else {
      // Render a countdown
      return (
        <div className="flex space-x-4 text-center">
          <div>
            <p className="text-4xl font-bold">
              {days.toString().length === 1 ? "0" + days : days}
            </p>
            <span>Days</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {hours.toString().length === 1 ? "0" + hours : hours}
            </p>
            <span>Hours</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {minutes.toString().length === 1 ? "0" + minutes : minutes}
            </p>
            <span>Minutes</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {seconds.toString().length === 1 ? "0" + seconds : seconds}
            </p>
            <span>Seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold">You're Invited</h1>
      <p className="mt-4 text-lg md:text-2xl">To the wedding of</p>
      <h2 className="mt-2 text-3xl md:text-5xl font-script">Emma & David</h2>
      <p className="mt-4 text-lg">Saturday, June 15, 2024</p>
      <Countdown date={Date.now() + 62000} renderer={renderer} />
      <div className="mt-6 flex space-x-2">
        {/* Countdown Timer Placeholder */}
        <div>20 Days</div>
        <div>15 Hours</div>
        <div>32 Minutes</div>
        <div>10 Seconds</div>
      </div>
      <a
        href="#our-story"
        className="mt-10 bg-white text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-100"
      >
        Scroll Down
      </a>
    </section>
  );
};

export default Hero;
