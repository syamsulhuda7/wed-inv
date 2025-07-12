"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";

// Dynamic import Countdown supaya tidak SSR
const Countdown = dynamic(() => import("react-countdown"), { ssr: false });

// Tambahkan ini di file Hero.tsx (paling atas)
interface NotificationOptionsWithVibrate extends NotificationOptions {
  vibrate?: number[]; // deklarasikan vibrate sebagai array number
}

function formatDateToString(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Jakarta", // GMT+7
  }).format(date);
}

const Hero = () => {
  const targetDate = new Date("2025-07-13T01:09:20+07:00");

  // Request permission & register Service Worker
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("🔔 Notifikasi permission:", permission);
      });
    }

    // Daftarkan Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("✅ Service Worker terdaftar:", reg.scope))
        .catch((err) => console.error("❌ Gagal daftar SW:", err));
    }
  }, []);

  const handleComplete = () => {
    console.log("🎉 Countdown selesai!");

    // Kirim notifikasi melalui Service Worker jika ada
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("🎉 Selamat! Hari H Telah Tiba!", {
          body: "Klik untuk melihat detail acara.",
          icon: "/wedding-icon.png", // icon di public/
          vibrate: [200, 100, 200, 100, 200], // Getar
        } as NotificationOptionsWithVibrate);

        // Mainkan suara notifikasi (di client)
        const audio = new Audio("/notif-sound.mp3"); // letakkan di public/
        audio.play();
      });
    } else if ("Notification" in window) {
      // Fallback kalau tidak ada SW
      new Notification("🎉 Selamat! Hari H Telah Tiba!", {
        body: "Klik untuk melihat detail acara.",
        icon: "/wedding-icon.png",
        vibrate: [200, 100, 200],
      } as NotificationOptionsWithVibrate);
      const audio = new Audio("/notif-sound.mp3");
      audio.play();
    }
  };

  // Renderer countdown
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return (
        <span className="text-2xl font-bold">It&apos;s Wedding Day! 🎉</span>
      );
    } else {
      return (
        <div className="flex space-x-4 text-center">
          <div>
            <p className="text-4xl font-bold">
              {days.toString().padStart(2, "0")}
            </p>
            <span>Days</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {hours.toString().padStart(2, "0")}
            </p>
            <span>Hours</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {minutes.toString().padStart(2, "0")}
            </p>
            <span>Minutes</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {seconds.toString().padStart(2, "0")}
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
      <h1 className="text-4xl md:text-6xl font-bold">You&apos;re Invited</h1>
      <p className="mt-4 text-lg md:text-2xl">To the wedding of</p>
      <h2 className="mt-2 text-3xl md:text-5xl font-script">Emma & David</h2>
      <p className="my-4 text-lg">{formatDateToString(targetDate)}</p>

      <Countdown
        date={targetDate}
        renderer={renderer}
        onComplete={handleComplete}
      />

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
