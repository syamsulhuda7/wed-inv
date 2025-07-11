"use client";

import React from "react";

const EventDetails = () => {
  return (
    <section className="py-16 bg-gray-50 text-center flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">Event Details</h2>
      <p className="mb-2">📅 Saturday, June 15, 2025 at 2:00 PM</p>
      <p className="mb-4">📍 Grand Ballroom Hotel Elegant, Jakarta</p>

      <div className="relative flex justify-center self-center w-[700px] h-[400px] overflow-hidden rounded-lg shadow">
        {/* Iframe */}
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1U5rys4j7Un1H2YM5I3pia_qmS38jJpQ&ehbc=2E312F"
          width="700"
          height="500" // buat sedikit lebih tinggi biar bagian bawah tidak terpotong
          style={{
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Overlay untuk masking bagian atas */}
        <div
          className="absolute top-0 left-0 w-full flex items-center justify-center"
          style={{
            height: "60px", // tinggi header yang mau ditutup
            backgroundColor: "white", // atau sesuaikan dengan warna background parent
          }}
        >
          <div className="flex justify-center">
            <a
              href="https://www.google.com/maps/dir//-8.1425339,111.775477/@-8.1425438,111.7755393,21z?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D" // Ganti dengan link maps asli
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1U5rys4j7Un1H2YM5I3pia_qmS38jJpQ&ehbc=2E312F"
          width="700"
          height="500" // buat sedikit lebih tinggi biar bagian bawah tidak terpotong
          style={{
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
        ></iframe> */}

      {/* <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "60px", // tinggi header yang mau ditutup
            backgroundColor: "white", // atau sesuaikan dengan warna background parent
          }}
        ></div>
      </div> */}
    </section>
  );
};

export default EventDetails;
