export default function Step1BowlSelect({ bowls, pastBlessings = [], onSelect }) {
  // map bowl id → image
  const bowlImgMap = Object.fromEntries(bowls.map((b) => [b.id, b.img]));

  // เซ็นเซอร์ชื่อ PDPA: เกิน 8 ตัวอักษร → แสดง 8 ตัวแรก + ****
  const censorName = (name) =>
    name.length > 8 ? name.slice(0, 8) + '*'.repeat(name.length - 8) : name;

  // แบ่งข้อความเป็น 4 สาย
  const rows = [[], [], [], []];
  pastBlessings.forEach((b, i) => rows[i % 4].push(b));

  return (
    <div className="flex-1 flex flex-col justify-end animate-fade-in">
      {/* ─── Marquee ข้อความอวยพร วิ่งตรงกลางจอ ─── */}
      {pastBlessings.length > 0 && (
        <div className="flex-1 flex flex-col justify-center gap-2 overflow-hidden pointer-events-none select-none">
          {rows.map((row, ri) =>
            row.length > 0 && (
              <div key={ri} className="overflow-hidden whitespace-nowrap">
                <div
                  className="inline-flex gap-8 animate-marquee"
                  style={{ animationDuration: `${30 + ri * 8}s`, animationDirection: ri % 2 === 0 ? 'normal' : 'reverse' }}
                >
                  {/* ทำซ้ำ 2 รอบเพื่อ seamless loop */}
                  {[...row, ...row].map((b, i) => (
                    <span
                      key={`${ri}-${i}`}
                      className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs sm:text-sm"
                    >
                      {bowlImgMap[b.bowl] ? (
                        <img src={bowlImgMap[b.bowl]} alt="" className="inline-block w-4 h-4 sm:w-5 sm:h-5 object-contain align-middle mr-1" />
                      ) : '🙏'}{' '}
                      <span className="font-semibold">{censorName(b.nickname)}</span>{' '}
                      <span className="text-white/60">— {b.blessing}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ─── ขัน 3 ใบ ─── */}
      <div className="flex items-end gap-3 sm:gap-5">
        {/* ขันซ้าย */}
        <BowlCard bowl={bowls[0]} onSelect={onSelect} />

        {/* ข้อความตรงกลาง + ขันกลาง */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-center mb-1">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">เลือกขันรดน้ำ</h2>
            <p className="text-[10px] sm:text-xs text-white/60">เลือกขันที่ท่านต้องการใช้รดน้ำดำหัว</p>
          </div>
          <BowlCard bowl={bowls[1]} onSelect={onSelect} />
        </div>

        {/* ขันขวา */}
        <BowlCard bowl={bowls[2]} onSelect={onSelect} />
      </div>
    </div>
  );
}

function BowlCard({ bowl: b, onSelect }) {
  return (
    <button
      onClick={() => onSelect(b.id)}
      className="group flex flex-col items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200"
    >
      {/* รูปขัน — สี่เหลี่ยมผืนผ้า (แนวนอน) */}
      <div
        className={`w-34 h-28 sm:w-38 sm:h-28 rounded-2xl bg-gradient-to-br ${b.color} shadow-lg flex items-center justify-center overflow-hidden ring-2 ring-white/20 group-hover:ring-white/50 transition-all`}
      >
        <img src={b.img} alt={b.label} className="w-full h-full object-contain p-2" />
      </div>
      {/* การ์ดชื่อ + คำอธิบาย */}
      <div className="bg-white/15 backdrop-blur-md rounded-xl px-2 py-1.5 w-26 sm:w-38 text-center shadow">
        <p className="text-xs sm:text-sm font-bold text-white leading-tight">{b.label}</p>
        <p className="text-[10px] sm:text-[11px] text-white/60 mt-0.5 leading-tight">{b.desc}</p>
      </div>
    </button>
  );
}
