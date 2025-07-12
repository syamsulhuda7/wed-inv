// import { NextRequest, NextResponse } from "next/server";
// import { subscriptions } from "@/utils/store";

// // Simpan subscription dari frontend
// export async function POST(req: NextRequest) {
//   try {
//     const sub: PushSubscription = await req.json();

//     // Cek apakah sudah ada
//     const exists = subscriptions.find((s) => s.endpoint === sub.endpoint);
//     if (!exists) {
//       subscriptions.push(sub);
//       console.log("✅ Subscription added:", sub.endpoint);
//     }

//     return NextResponse.json({ message: "Subscribed successfully" });
//   } catch (error) {
//     console.error("❌ Subscribe error:", error);
//     return NextResponse.json(
//       { error: "Invalid subscription" },
//       { status: 400 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const subscription = await req.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("wedding");
    const collection = db.collection("subscriptions");

    const exists = await collection.findOne({
      endpoint: subscription.endpoint,
    });
    if (exists) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    await collection.insertOne(subscription);
    console.log("✅ Subscription saved:", subscription.endpoint);

    return NextResponse.json({ message: "Subscription saved" });
  } catch (err) {
    console.error("❌ Subscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
