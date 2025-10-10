import { initDB, USER_STORE } from "./DBConnect";

// ✅ Save or update user
export const setUserDB = async (user: any) => {
  try {
    const db = await initDB();
    if (!db) return;

    const toStore = { ...user, id: user.id || `user-${Date.now()}` };
    const tx = db.transaction(USER_STORE, "readwrite");
    await tx.store.put(toStore);
    await tx.done;

    console.log("✅ User saved to IndexedDB:", toStore);
  } catch (error) {
    console.error("❌ setUserDB error:", error);
  }
};

// ✅ Get stored user (for single-user apps)
export const getUserDB = async () => {
  try {
    const db = await initDB();
    if (!db) return null;

    const tx = db.transaction(USER_STORE, "readonly");
    const all = await tx.store.getAll();
    await tx.done;

    const user = all[0] || null;
    console.log("📦 Loaded user from IndexedDB:", user);
    return user;
  } catch (error) {
    console.error("❌ getUserDB error:", error);
    return null;
  }
};

// ✅ Clear all stored users
export const clearUserDB = async () => {
  try {
    const db = await initDB();
    if (!db) return;

    const tx = db.transaction(USER_STORE, "readwrite");
    await tx.store.clear();
    await tx.done;

    console.log("🧹 Cleared user data from IndexedDB");
  } catch (error) {
    console.error("❌ clearUserDB error:", error);
  }
};
