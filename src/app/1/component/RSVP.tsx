"use client";

import React, { useState } from "react";

const RSVP = () => {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`Thank you, ${name}! RSVP recorded.`);
  };

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">RSVP</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 text-left"
      >
        <div>
          <label className="block mb-2">Your Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Will you attend?</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes, I’ll be there</option>
            <option value="no">Sorry, I can’t come</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Submit RSVP
        </button>
      </form>
    </section>
  );
};

export default RSVP;
