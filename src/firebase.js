import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

/* ─── Firebase config ─── */
// TODO: ใส่ค่า config จริงจาก Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB9NAmNn2bqgzfvboOttWg3Pl0uUhdhAa4",
  authDomain: "rodnam-crpao.firebaseapp.com",
  projectId: "rodnam-crpao",
  storageBucket: "rodnam-crpao.firebasestorage.app",
  messagingSenderId: "972003625644",
  appId: "1:972003625644:web:905155d57103f804cb6d09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ─── Collection reference ─── */
const blessingsCol = collection(db, 'blessings');

/**
 * บันทึกข้อความอวยพรลง Firestore
 */
export async function saveBlessing({ nickname, blessing, bowl }) {
  return addDoc(blessingsCol, {
    nickname,
    blessing,
    bowl,
    createdAt: serverTimestamp(),
  });
}

/**
 * Subscribe ข้อความอวยพรล่าสุด (real-time)
 * คืน unsubscribe function
 */
export function subscribeBlessings(callback, maxItems = 50) {
  const q = query(blessingsCol, orderBy('createdAt', 'desc'), limit(maxItems));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(items);
  });
}
