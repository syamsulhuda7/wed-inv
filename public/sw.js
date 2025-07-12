self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};
  const title = data.title || "🎉 Selamat! Hari H Telah Tiba!";
  const options = {
    body: data.body || "Klik untuk melihat detail acara.",
    icon: "/wedding-icon.png",
    vibrate: [200, 100, 200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // arahkan ke halaman utama
  );
});
