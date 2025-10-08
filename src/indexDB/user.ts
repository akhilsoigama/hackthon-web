import { initDB, USER_STORE } from "./DBConnect";

export const setUserDB = async (user: any) => {
  const db = await initDB();
  if (!db) return;
  const toStore = { ...user, id: user.id || `user-${Date.now()}` };
  await db.put(USER_STORE, toStore);
};

export const getUserDB = async () => {
  const db = await initDB();
  if (!db) return null;
  const all = await db.getAll(USER_STORE);
  return all[0] || null;
};

export const clearUserDB = async () => {
  const db = await initDB();
  if (!db) return;
  await db.clear(USER_STORE);
};
