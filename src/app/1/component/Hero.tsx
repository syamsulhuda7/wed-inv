"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { name, targetDate } from "@/app/1/utils/data";
import { base64ToUint8Array } from "@/app/1/utils/base64Utils";

const Countdown = dynamic(() => import("react-countdown"), { ssr: false });

interface NotificationOptionsWithVibrate extends NotificationOptions {
  vibrate?: number[];
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

// async function subscribeToPush() {
//   if ("serviceWorker" in navigator) {
//     const registration = await navigator.serviceWorker.ready;
//     const existingSub = await registration.pushManager.getSubscription();

//     if (!existingSub) {
//       const newSub = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(
//           process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//         ),
//       });

//       // Simpan ke backend
//       await fetch("/api/subscribe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSub),
//       });

//       console.log("📩 User subscribed:", newSub);
//     } else {
//       console.log("✅ User sudah subscribe");
//     }
//   }
// }

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

//   const rawData = atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

const Hero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Request Notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }

      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.register("/sw.js").then(async (reg) => {
          console.log("✅ Service Worker registered:", reg.scope);

          const permission = await Notification.requestPermission();
          console.log("🔔 Notification permission:", permission);

          if (permission === "granted") {
            const sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: base64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
              ),
            });

            await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(sub),
            });

            console.log("📩 Push subscription sent:", sub);
          }
        });
      }
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if ("Notification" in window) {
  //       if (Notification.permission === "default") {
  //         Notification.requestPermission().then((permission) => {
  //           console.log("🔔 Notification permission:", permission);
  //         });
  //       }
  //     }

  //     if ("serviceWorker" in navigator) {
  //       navigator.serviceWorker
  //         .register("/sw.js")
  //         .then((reg) =>
  //           console.log("✅ Service Worker registered:", reg.scope)
  //         )
  //         .catch((err) => console.error("❌ Service Worker failed:", err));
  //     }
  //   }
  // }, []);

  const handleComplete = async () => {
    console.log("🎉 Countdown selesai!");

    if (typeof window !== "undefined") {
      // Cek apakah sudah pernah kirim notifikasi
      const alreadyNotified = localStorage.getItem("wedding_notified");
      if (alreadyNotified === "yes") {
        console.log("⚠️ Sudah pernah kirim notifikasi, skip");
        return;
      }

      if ("Notification" in window && Notification.permission === "granted") {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("🎉 Selamat! Hari H Telah Tiba!", {
              body: "Klik untuk melihat detail acara.",
              icon: "/wedding-icon.png",
              vibrate: [200, 100, 200],
              data: { url: "/1" },
            } as NotificationOptionsWithVibrate);

            // ✅ Set flag sudah kirim notifikasi
            localStorage.setItem("wedding_notified", "yes");
          });
        }
      }
    }
    await fetch("/api/push", { method: "POST" });
  };

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
              {String(days).padStart(2, "0")}
            </p>
            <span>Days</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {String(hours).padStart(2, "0")}
            </p>
            <span>Hours</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {String(minutes).padStart(2, "0")}
            </p>
            <span>Minutes</span>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {String(seconds).padStart(2, "0")}
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
      <h2 className="mt-2 text-3xl md:text-5xl font-script">
        {name.bride} & {name.groom}
      </h2>
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
