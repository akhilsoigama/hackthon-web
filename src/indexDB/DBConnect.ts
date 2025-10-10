import { openDB, deleteDB, IDBPDatabase } from "idb";

const DB_NAME = "myAppDB";
const DB_VERSION = 19;

export const USER_STORE = "users";
export const ROLE_STORE = "userRolePermissions";
export const PERMISSION = "permissions";

let dbPromise: Promise<IDBPDatabase> | null = null;

// ✅ Recreate the DB (optional when schema mismatch or corruption)
export const recreateDB = async () => {
  try {
    await deleteDB(DB_NAME);
    console.log("Old IndexedDB deleted");
  } catch (err) {
    console.warn("DB deletion failed:", err);
  }
  dbPromise = null;
  return initDB();
};

// ✅ Initialize (auto create if not exists)
export const initDB = async () => {
  if (typeof window === "undefined") return null;

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
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
  }

  return dbPromise;
};

// ✅ Save data
export const saveData = async (storeName: string, data: any) => {
  const db = await initDB();
  if (!db) return;
  const tx = db.transaction(storeName, "readwrite");
  await tx.store.put(data);
  await tx.done;
};

// ✅ Get all
export const getAllData = async (storeName: string) => {
  const db = await initDB();
  if (!db) return [];
  const tx = db.transaction(storeName, "readonly");
  const result = await tx.store.getAll();
  await tx.done;
  return result;
};

// ✅ Clear store
export const clearData = async (storeName: string) => {
  const db = await initDB();
  if (!db) return;
  const tx = db.transaction(storeName, "readwrite");
  await tx.store.clear();
  await tx.done;
};
