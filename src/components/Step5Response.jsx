import { useState, useEffect } from 'react';
import directorImg from '../assets/director/director.png';

export default function Step5Response({ nickname, selectedBlessing, onReset }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // เริ่ม fade-in หลัง mount เล็กน้อย
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-center relative min-h-0 overflow-hidden">

      {/* ─── มือถือ (แนวตั้ง): กล่องบนสุด → รูปล่าง | จอใหญ่ (sm+): เรียงแนวนอน กลางจอ ─── */}

      {/* ── กล่องข้อความ (มือถือ: บนสุด / sm: ซ้ายกลางจอ) ── */}
      <div
        className={`z-10 px-3 pt-4 sm:pt-0 sm:w-96 shrink-0 sm:self-center sm:mr-4 transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl rounded-br-none shadow-2xl p-4 sm:p-6 space-y-3">
          <p className="text-gray-700 leading-loose text-xs sm:text-sm tracking-wide font-semibold">
            ขอขอบคุณในไมตรีจิตที่มอบให้ค่ะ
          </p>
          <p className="text-gray-800 leading-relaxed text-xs sm:text-sm tracking-wide">
            เนื่องในเทศกาลสงกรานต์ ขออาราธนาคุณพระศรีรัตนตรัย
            ดลบันดาลให้{' '}
            <span className="font-bold text-teal-600 text-sm sm:text-base">{nickname}</span>{' '}
            ประสบแต่ความสุข ความสำเร็จ และมีสุขภาพพลานามัยที่สมบูรณ์แข็งแรงตลอดไปค่ะ
          </p>
          {selectedBlessing && (
            <p className="text-[9px] sm:text-[11px] text-gray-400 italic border-l-2 border-teal-200 pl-2 leading-relaxed">
              "{selectedBlessing}"
            </p>
          )}
          <div className="pt-2 border-t border-gray-100 text-right space-y-0.5">
            <p className="text-[11px] sm:text-xs font-bold text-green-700 tracking-wide">นางอทิตาธร วันไชยธนวงศ์</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 tracking-wide">นายกองค์การบริหารส่วนจังหวัดเชียงราย</p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={onReset}
            className="px-5 py-2 rounded-full bg-white/20 backdrop-blur text-white font-bold text-xs sm:text-sm border border-white/40 hover:bg-white/30 active:scale-95 transition-all shadow-lg"
          >
            🔄 เริ่มใหม่
          </button>
        </div>
      </div>

      {/* ── รูปนายก (มือถือ: ล่างสุดชิดขวา / sm: ขวากลางจอ) ── */}
      <div
        className={`mt-auto flex justify-end items-end sm:mt-0 pointer-events-none transition-all duration-1000 delay-300 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <img
          src={directorImg}
          alt="นายก อบจ.เชียงราย"
          className="h-[58dvh] sm:h-[85dvh] w-auto object-contain object-bottom drop-shadow-2xl"
        />
      </div>

    </div>
  );
}
