import { openDB } from "idb";

const DB_NAME = "myAppDB";
const DB_VERSION = 9;
export const USER_STORE = "user";
export const ROLE_STORE = "userRolePermissions";
export const PERMISSION = "permissions";

export const initDB = async () => {
  if (typeof window === "undefined") return null;

  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(ROLE_STORE)) {
        db.createObjectStore(ROLE_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(PERMISSION)) {
        db.createObjectStore(PERMISSION, { keyPath: "id" });
      }
    },
  });
};

// Save data
export const saveData = async (storeName: string, data: any) => {
  const db = await initDB();
  const tx = db?.transaction(storeName, "readwrite");
  await tx?.store.put(data);
  await tx?.done;
};

// Get all data
export const getAllData = async (storeName: string) => {
  const db = await initDB();
  const tx = db?.transaction(storeName, "readonly");
  const result = await tx?.store.getAll();
  await tx?.done;
  return result;
};
