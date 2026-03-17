import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // Production (Render)
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // Local development (fallback)
  const fs = await import("fs");
  const { default: path } = await import("path");

  const filePath = new URL("./firebase-adminsdk.json", import.meta.url);
  const fileData = fs.readFileSync(filePath);

  serviceAccount = JSON.parse(fileData);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;