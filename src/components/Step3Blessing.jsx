export default function Step3Blessing({ blessings, onSelect }) {
  return (
    <div className="flex-1 flex flex-col justify-end animate-fade-in">
      {/* กล่องคำอวยพร — ไล่ขึ้นบนจากมุมซ้ายล่าง */}
      <div className="flex items-end gap-3 max-w-md">
        {/* ไอคอนคนอยู่มุมซ้ายล่าง */}
        <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center shrink-0 shadow self-end">
          <svg viewBox="0 0 64 64" fill="white" className="w-6 h-6">
            <circle cx="32" cy="18" r="10" />
            <path d="M16 54c0-11 7.2-20 16-20s16 9 16 20" />
          </svg>
        </div>
        {/* bubble ไล่ขึ้นบน */}
        <div className="bg-white rounded-2xl rounded-bl-none shadow-xl p-4 flex flex-col gap-2 flex-1">
          <p className="text-xs text-gray-400 font-semibold mb-1">เลือกคำอวยพร</p>
          {blessings.map((text) => (
            <button
              key={text}
              onClick={() => onSelect(text)}
              className="text-left text-sm px-3 py-2 rounded-xl border border-gray-100 text-gray-700 hover:bg-teal-50 hover:border-teal-300 active:scale-[0.98] transition-all"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
