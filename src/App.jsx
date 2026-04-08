import { useState, useEffect, useCallback } from 'react';

import bowlSilverImg from './assets/bowls/bowl-silver.png';
import bowlGoldImg from './assets/bowls/bowl-gold.png';
import bowlGlassImg from './assets/bowls/bowl-glass.png';
import bgMobile from './assets/bg-mobile.webp';
import bgDesktop from './assets/bg-desktop.webp';
import logocrpao from './assets/logo-crpao.png';

import Step1BowlSelect from './components/Step1BowlSelect';
import Step2Nickname from './components/Step2Nickname';
import Step3Blessing from './components/Step3Blessing';
import Step4Pouring from './components/Step4Pouring';
import Step5Response from './components/Step5Response';

/* ─── data ─── */
const bowls = [
  { id: 'silver', img: bowlSilverImg, label: 'ขันเงินสลักลาย', desc: 'ให้ความรู้สึกอ่อนช้อยแบบล้านนาแท้', color: 'from-gray-200 to-gray-400' },
  { id: 'gold', img: bowlGoldImg, label: 'ขันทองเหลือง', desc: 'ให้ความรู้สึกเป็นสิริมงคลและหรูหรา', color: 'from-yellow-200 to-yellow-500' },
  { id: 'glass', img: bowlGlassImg, label: 'ขันแก้ววิจิตร', desc: 'ให้ความรู้สึกทันสมัยและสะอาดตา', color: 'from-blue-100 to-cyan-300' },
];

const blessings = [
  'ขออาราธนาคุณพระศรีรัตนตรัยบันดาลให้ท่านนายกฯ มีสุขภาพแข็งแรง',
  'ขอหื้อท่านนายกฯ มีความสุข ความเจริญ สุขีปี๋ใหม่เมืองครับ/ค่ะ',
  'ขอขอบคุณที่ท่านนายกฯ มุ่งมั่นพัฒนาเชียงราย ขอให้ท่านประสบความสำเร็จยิ่งๆ ขึ้นไป',
  'ในศุภมงคลสมัยขึ้นปีใหม่เมือง ขออวยพรให้ท่านและครอบครัวมีความสุขตลอดไป',
  'ขอหื้อท่านนายกฯ แคล้วคลาดปลอดภัย สุขกายสบายใจ',
];

/* ─── main ─── */
export default function App() {
  const [step, setStep] = useState(1);
  const [selectedBowl, setSelectedBowl] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedBlessing, setSelectedBlessing] = useState('');
  const [pouring, setPouring] = useState(false);
  const [pastBlessings, setPastBlessings] = useState([]);

  const bowl = bowls.find((b) => b.id === selectedBowl);

  /* ดึงข้อความอวยพรจาก Firebase */
  useEffect(() => {
    import('./firebase').then(({ subscribeBlessings }) => {
      const unsub = subscribeBlessings(setPastBlessings);
      return () => unsub();
    });
  }, []);

  /* step 4 → auto-advance after 3s + save to Firebase */
  useEffect(() => {
    if (step !== 4) return;
    // save blessing to Firebase
    import('./firebase').then(({ saveBlessing }) => {
      saveBlessing({ nickname, blessing: selectedBlessing, bowl: selectedBowl });
    });
    const raf = requestAnimationFrame(() => setPouring(true));
    const timer = setTimeout(() => setStep(5), 5000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [step]);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedBowl('');
    setNickname('');
    setSelectedBlessing('');
    setPouring(false);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      {/* ─── responsive background ─── */}
      <picture className={`absolute inset-0 z-0 transition-all duration-1000 ${step === 5 ? 'blur-md scale-105' : ''}`}>
        <source media="(min-width: 768px)" srcSet={bgDesktop} />
        <img
          src={bgMobile}
          alt=""
          className="w-full h-full object-cover"
        />
      </picture>
      {/* overlay สำหรับให้ตัวอักษรอ่านง่าย */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${step === 5 ? 'bg-black/50' : 'bg-black/30'}`} />
      {/* ─── header ─── */}
      <header className="px-5 pt-5 pb-2 flex items-center gap-3 shrink-0 z-10">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shadow">
          <img src={logocrpao} alt="Logo CRPAO" className="w-14 h-14" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/50 leading-tight">
            องค์การบริหารส่วนจังหวัดเชียงราย
          </p>
          <p className="text-[13px] text-white/60">ระบบรดน้ำดำหัวออนไลน์</p>
        </div>
      </header>

      {/* ─── content (ทีละหน้า) ─── */}
      <main className="flex-1 flex flex-col px-5 pb-6 z-10">
        {step === 1 && (
          <Step1BowlSelect
            bowls={bowls}
            pastBlessings={pastBlessings}
            onSelect={(id) => { setSelectedBowl(id); setStep(2); }}
          />
        )}
        {step === 2 && (
          <Step2Nickname
            bowl={bowl}
            nickname={nickname}
            setNickname={setNickname}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3Blessing
            blessings={blessings}
            onSelect={(text) => { setSelectedBlessing(text); setStep(4); }}
          />
        )}
        {step === 4 && <Step4Pouring />}
        {step === 5 && (
          <Step5Response
            nickname={nickname}
            selectedBlessing={selectedBlessing}
            onReset={reset}
          />
        )}
      </main>

      {/* decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </div>
  );
}
