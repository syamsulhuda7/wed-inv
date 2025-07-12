// import { NextResponse } from "next/server";
// import webpush from "web-push";
// import { subscriptions } from "@/utils/store";

// // VAPID keys
// const vapidKeys = {
//   publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   privateKey: process.env.VAPID_PRIVATE_KEY!,
// };

// // Setup VAPID
// webpush.setVapidDetails(
//   process.env.VAPID_SUBJECT!,
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );

// // ✅ Validator untuk PushSubscription
// function isValidPushSubscription(
//   sub: unknown
// ): sub is webpush.PushSubscription {
//   if (typeof sub !== "object" || sub === null) return false;

//   const candidate = sub as Record<string, unknown>;
//   return (
//     typeof candidate.endpoint === "string" &&
//     candidate.keys !== undefined &&
//     typeof (candidate.keys as Record<string, unknown>).p256dh === "string" &&
//     typeof (candidate.keys as Record<string, unknown>).auth === "string"
//   );
// }

// export async function POST() {
//   const payload = JSON.stringify({
//     title: "🎉 Selamat! Hari H Telah Tiba!",
//     body: "Klik untuk melihat detail acara.",
//     icon: "/wedding-icon.png",
//     data: { url: "/1" },
//   });

//   const results = await Promise.allSettled(
//     subscriptions.map((sub) => {
//       if (isValidPushSubscription(sub)) {
//         return webpush.sendNotification(sub, payload).catch((err) => {
//           console.error("❌ Push error:", err);
//         });
//       } else {
//         console.warn("🚫 Invalid subscription skipped:", sub);
//         return Promise.resolve();
//       }
//     })
//   );

//   console.log("📢 Push results:", results);

//   return NextResponse.json({ message: "Push sent" }, { status: 200 });
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("wedding");
    const collection = db.collection("subscriptions");

    const subscriptions = await collection.find().toArray();

    const payload = JSON.stringify({
      title: "🎉 Selamat! Hari H Telah Tiba!",
      body: "Klik untuk melihat detail acara.",
      icon: "/wedding-icon.png",
      data: { url: "/1" },
    });

    const results = await Promise.allSettled(
      subscriptions.map((sub: any) =>
        webpush.sendNotification(sub, payload).catch((err) => {
          console.error("❌ Push error:", err);
        })
      )
    );

    console.log("📣 Push results:", results);
    return NextResponse.json({ message: "Notifications sent" });
  } catch (err) {
    console.error("❌ Push API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
