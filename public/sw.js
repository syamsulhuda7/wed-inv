// // self.addEventListener("push", function (event) {
// //   const data = event.data?.json() || {};
// //   const title = data.title || "🎉 Selamat! Hari H Telah Tiba!";
// //   const options = {
// //     body: data.body || "Klik untuk melihat detail acara.",
// //     icon: data.icon || "/wedding-icon.png",
// //     vibrate: [200, 100, 200, 100, 200],
// //     data: {
// //       url: "https://wed-inv-h6k9.vercel.app/1", // 👈 URL tujuan
// //     },
// //   };

// //   event.waitUntil(self.registration.showNotification(title, options));
// // });

// // self.addEventListener("notificationclick", function (event) {
// //   event.notification.close(); // Tutup notifikasi

// //   // Ambil URL dari data
// //     const targetUrl =
// //       event.notification.data?.url || "https://wed-inv-h6k9.vercel.app/1";

// //   // Fokuskan tab jika sudah terbuka, atau buka tab baru
// //   event.waitUntil(
// //     clients.matchAll({ type: "window" }).then(function (clientList) {
// //       for (const client of clientList) {
// //         if (client.url === targetUrl && "focus" in client) {
// //           return client.focus();
// //         }
// //       }
// //       if (clients.openWindow) {
// //         return clients.openWindow(targetUrl);
// //       }
// //     })
// //   );
// // });

// // Aktifkan SW lebih cepat
// self.addEventListener("install", (event) => {
//   console.log("✅ Service Worker installed");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("✅ Service Worker activated");
//   return self.clients.claim();
// });

// // Tangani klik notifikasi
// self.addEventListener("notificationclick", function (event) {
//   event.notification.close(); // Tutup notif

//   const relativePath = event.notification.data?.url || "/";
//   const origin = self.location.origin;

//   // 🔥 Gabungkan origin + relative path
//   const targetUrl = new URL(relativePath, origin).href;

//   console.log("🎯 Target URL:", targetUrl);

//   event.waitUntil(
//     clients
//       .matchAll({ type: "window", includeUncontrolled: true })
//       .then(function (clientList) {
//         for (const client of clientList) {
//           console.log("🔍 Cek tab:", client.url);
//           if (client.url === targetUrl && "focus" in client) {
//             console.log("✅ Fokus tab:", client.url);
//             return client.focus();
//           }
//         }
//         if (clients.openWindow) {
//           console.log("🚀 Membuka tab baru:", targetUrl);
//           return clients.openWindow(targetUrl);
//         }
//       })
//   );
// });

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title || "Notification";
  const options = {
    body: data.body,
    icon: data.icon,
    vibrate: [200, 100, 200],
    data: { url: data.data?.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url.includes(event.notification.data.url) &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});
