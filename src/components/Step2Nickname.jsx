export default function Step2Nickname({ bowl, nickname, setNickname, onNext }) {
  return (
    <div className="flex-1 flex flex-col justify-end animate-fade-in">
      {/* ขันที่เลือก + ชื่อ/คำอธิบายอยู่ข้างๆ */}
      {bowl && (
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-32 h-24 sm:w-36 sm:h-28 shrink-0 rounded-2xl bg-gradient-to-br ${bowl.color} shadow-xl flex items-center justify-center overflow-hidden`}
          >
            <img src={bowl.img} alt={bowl.label} className="w-full h-full object-contain p-2" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{bowl.label}</p>
            <p className="text-[12px] text-white/60 mt-0.5 leading-tight">{bowl.desc}</p>
          </div>
        </div>
      )}

      {/* ช่องกรอกชื่อ */}
      <div className="flex items-end gap-3 max-w-sm">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && nickname.trim()) onNext(); }}
          placeholder="ใส่ชื่อเล่น..."
          className="flex-1 px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/50 outline-none border border-white/30 focus:border-white/70 transition-colors text-sm"
        />
        <button
          onClick={() => { if (nickname.trim()) onNext(); }}
          className="px-5 py-2.5 rounded-full bg-white text-teal-700 font-bold text-sm shadow-lg hover:bg-white/90 active:scale-95 transition-all shrink-0"
        >
           ถัดไป  
        </button>
      </div>
    </div>
  );
}
