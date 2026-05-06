import { useEffect, useMemo, useState } from 'react';
import logoCrpao from '../assets/logo-crpao.png';

const ADMIN_USER = 'traipop.py@gmail.com';
const ADMIN_PASSWORD = 'Kng2633!';
const ADMIN_SESSION_KEY = 'rodnam_admin_logged_in';

const bowlMeta = {
  silver: {
    label: 'ขันเงินสลักลาย',
    accent: 'from-slate-100 to-slate-300',
    text: 'text-slate-700',
  },
  gold: {
    label: 'ขันทองเหลือง',
    accent: 'from-amber-100 to-yellow-300',
    text: 'text-amber-700',
  },
  glass: {
    label: 'ขันแก้ววิจิตร',
    accent: 'from-cyan-100 to-sky-300',
    text: 'text-cyan-700',
  },
};

function formatDate(value) {
  if (!value) return '-';
  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    return new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return '-';
  }
}

export default function AdminPage({ onBackToCeremony }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) return undefined;

    let active = true;
    setLoading(true);

    let unsubscribe = () => {};
    import('../firebase').then(({ subscribeAllBlessings }) => {
      if (!active) return;
      unsubscribe = subscribeAllBlessings((data) => {
        setItems(data);
        setLoading(false);
      });
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [loggedIn]);

  const stats = useMemo(() => {
    const totalBlessings = items.length;
    const uniqueParticipants = new Set(
      items
        .map((item) => (item.nickname || '').trim())
        .filter(Boolean)
    ).size;

    const bowlCounts = {
      silver: 0,
      gold: 0,
      glass: 0,
    };
    const blessingCounts = new Map();

    items.forEach((item) => {
      if (item.bowl && bowlCounts[item.bowl] !== undefined) {
        bowlCounts[item.bowl] += 1;
      }
      const key = item.blessing || 'ไม่ระบุคำอวยพร';
      blessingCounts.set(key, (blessingCounts.get(key) || 0) + 1);
    });

    const blessingSummary = [...blessingCounts.entries()]
      .map(([blessing, count]) => ({ blessing, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalBlessings,
      uniqueParticipants,
      bowlCounts,
      blessingSummary,
      latestItems: items.slice(0, 20),
    };
  }, [items]);

  function handleLogin(event) {
    event.preventDefault();
    if (email.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setLoggedIn(true);
      setError('');
      return;
    }
    setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
  }

  if (!loggedIn) {
    return (
      <div className="min-h-dvh relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_36%),linear-gradient(135deg,_#0f766e,_#0f172a_58%,_#111827)] px-5 py-8 text-white">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-5xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl md:grid-cols-[1.1fr,0.9fr] print:hidden">
            <section className="relative flex flex-col justify-between p-8 md:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_55%)]" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-lg">
                    <img src={logoCrpao} alt="CRPAO" className="h-14 w-14" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Admin Console</p>
                    <h1 className="mt-1 text-2xl font-bold md:text-3xl">สรุปผลระบบรดน้ำดำหัวออนไลน์</h1>
                  </div>
                </div>
                <p className="max-w-lg text-sm leading-7 text-white/75 md:text-base">
                  หน้า admin สำหรับดูภาพรวมการเข้าร่วมอวยพร ตรวจสอบจำนวนการเลือกขัน สรุปข้อความอวยพร และพิมพ์รายงานจากหน้าจอได้ทันที
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Access</p>
                    <p className="mt-2 text-lg font-semibold">เฉพาะผู้ดูแลระบบ</p>
                    <p className="mt-1 text-sm text-white/65">เข้าสู่ระบบด้วยอีเมลและรหัสผ่านที่กำหนดไว้</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Print Ready</p>
                    <p className="mt-2 text-lg font-semibold">พร้อมพิมพ์รายงาน</p>
                    <p className="mt-1 text-sm text-white/65">แดชบอร์ดถูกจัด layout ให้รองรับการสั่งพิมพ์จาก browser</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onBackToCeremony}
                className="relative mt-8 inline-flex w-fit items-center rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                กลับไปหน้ารดน้ำดำหัว
              </button>
            </section>

            <section className="border-t border-white/10 bg-white/95 p-8 text-slate-900 md:border-l md:border-t-0 md:p-10">
              <div className="max-w-md space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Secure Login</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">เข้าสู่ระบบ admin</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">ใช้บัญชีผู้ดูแลเพื่อดูสรุปผลและพิมพ์รายงานจากระบบ</p>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">อีเมล</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                      placeholder="traipop.py@gmail.com"
                      autoComplete="username"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">รหัสผ่าน</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                      placeholder="รหัสผ่าน"
                      autoComplete="current-password"
                    />
                  </label>
                  {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
                  >
                    เข้าสู่ระบบ
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[linear-gradient(180deg,_#f5f7fb,_#eef6f4_38%,_#f9fafb)] px-4 py-5 text-slate-900 md:px-6 md:py-6 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-7xl space-y-6 print:max-w-none print:space-y-4">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between print:hidden">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30">
              <img src={logoCrpao} alt="CRPAO" className="h-11 w-11" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Admin Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold">รายงานคำอวยพรออนไลน์</h1>
              <p className="mt-1 text-sm text-slate-500">อัปเดตแบบ real-time จาก Firestore พร้อมสรุปผลและรายการล่าสุด</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onBackToCeremony}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              หน้าหลัก
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              พิมพ์รายงาน
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        <div className="hidden print:block">
          <div className="border-b border-slate-200 pb-3">
            <h1 className="text-2xl font-bold">รายงานคำอวยพรออนไลน์</h1>
            <p className="mt-1 text-sm text-slate-500">องค์การบริหารส่วนจังหวัดเชียงราย</p>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="จำนวนผู้เข้าร่วมอวยพร"
            value={stats.uniqueParticipants || stats.totalBlessings}
            detail="นับจากชื่อผู้ร่วมอวยพรที่ไม่ซ้ำกัน"
            accent="from-teal-500/15 to-cyan-500/10"
          />
          <SummaryCard
            title="จำนวนคำอวยพรทั้งหมด"
            value={stats.totalBlessings}
            detail="อัปเดตแบบ real-time"
            accent="from-slate-900/10 to-slate-600/5"
          />
          <SummaryCard
            title="จำนวนข้อความอวยพรที่ต่างกัน"
            value={stats.blessingSummary.length}
            detail="รวมข้อความที่ถูกเลือกทั้งหมด"
            accent="from-amber-500/15 to-yellow-500/10"
          />
          <SummaryCard
            title="รายการล่าสุดที่แสดง"
            value={Math.min(stats.latestItems.length, 20)}
            detail="ตารางด้านล่างแสดง 20 รายการ"
            accent="from-fuchsia-500/15 to-rose-500/10"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] print:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-700">Bowl Summary</p>
                <h2 className="mt-1 text-xl font-bold">จำนวนผู้เลือกขัน</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600">
                รวม {stats.totalBlessings} รายการ
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {Object.entries(bowlMeta).map(([key, meta]) => (
                <div
                  key={key}
                  className={`rounded-[1.5rem] border border-slate-200 bg-gradient-to-br ${meta.accent} p-4`}
                >
                  <p className={`text-sm font-semibold ${meta.text}`}>{meta.label}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">{stats.bowlCounts[key] || 0}</p>
                  <p className="mt-1 text-sm text-slate-500">รายการเลือกขัน</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] print:shadow-none">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-700">Blessing Summary</p>
            <h2 className="mt-1 text-xl font-bold">อวยพรอะไรบ้าง / จำนวน</h2>
            <div className="mt-5 space-y-3">
              {loading && <p className="text-sm text-slate-500">กำลังโหลดข้อมูล...</p>}
              {!loading && stats.blessingSummary.length === 0 && (
                <p className="text-sm text-slate-500">ยังไม่มีข้อมูลคำอวยพร</p>
              )}
              {!loading &&
                stats.blessingSummary.map((item, index) => (
                  <div key={item.blessing} className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm leading-6 text-slate-700">{index + 1}. {item.blessing}</p>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] print:shadow-none">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-700">Latest Entries</p>
              <h2 className="mt-1 text-xl font-bold">ตารางผู้อวยพรล่าสุด</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600">
              แสดง {stats.latestItems.length} รายการ
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ลำดับ</th>
                    <th className="px-4 py-3 font-semibold">ชื่อผู้ร่วมอวยพร</th>
                    <th className="px-4 py-3 font-semibold">ขันที่เลือก</th>
                    <th className="px-4 py-3 font-semibold">คำอวยพร</th>
                    <th className="px-4 py-3 font-semibold">เวลา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {loading && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">กำลังโหลดข้อมูล...</td>
                    </tr>
                  )}
                  {!loading && stats.latestItems.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">ยังไม่มีข้อมูลคำอวยพร</td>
                    </tr>
                  )}
                  {!loading &&
                    stats.latestItems.map((item, index) => (
                      <tr key={item.id} className="align-top">
                        <td className="px-4 py-3 font-semibold text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-900">{item.nickname || '-'}</td>
                        <td className="px-4 py-3 text-slate-600">{bowlMeta[item.bowl]?.label || '-'}</td>
                        <td className="px-4 py-3 text-slate-600">{item.blessing || '-'}</td>
                        <td className="px-4 py-3 text-slate-500">{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, detail, accent }) {
  return (
    <div className={`rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br ${accent} p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] print:shadow-none`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
      <p className="mt-4 text-4xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </div>
  );
}
