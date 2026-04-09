import pouringGif from '../assets/bowl-pouring.gif';

export default function Step4Pouring() {
  return (
    <div className="flex-1 flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-white animate-pulse mb-6">
          กำลังรดน้ำดำหัว...
        </p>
        <img
          src={pouringGif}
          alt="กำลังรดน้ำดำหัว"
          className="w-80 sm:w-96 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
