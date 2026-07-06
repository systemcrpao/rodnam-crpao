# 💦 ระบบรดน้ำดำหัวออนไลน์ อบจ.เชียงราย (Rodnam CRPAO)

แอปพลิเคชันเว็บไซต์สำหรับร่วมสืบสานประเพณีสงกรานต์ (ปีใหม่เมือง) ผ่านระบบรดน้ำดำหัวออนไลน์ขององค์การบริหารส่วนจังหวัดเชียงราย (อบจ.เชียงราย) ผู้ใช้งานสามารถเลือกขันน้ำ พิมพ์ชื่อ เลือกคำอวยพร และรับชมแอนิเมชันการรดน้ำดำหัวได้ผ่านหน้าเว็บไซต์

## ✨ ฟีเจอร์หลัก (Features)

* **ระบบการทำงาน 5 ขั้นตอน**: แบ่งเป็น เลือกขันน้ำ, กรอกชื่อ, เลือกคำอวยพร, รับชมแอนิเมชันรดน้ำ, และหน้าขอบคุณ
* **ตัวเลือกขันน้ำ 3 รูปแบบ**: มีขันเงินสลักลาย, ขันทองเหลือง, และขันแก้ววิจิตร
* **ระบบป้องกันสแปม (Rate Limit)**: จำกัดการส่งคำอวยพรสูงสุด 3 ครั้ง ต่อ 10 นาทีต่อผู้ใช้งาน (ตรวจสอบผ่าน Local Storage)
* **แสดงผลคำอวยพรแบบ Real-time**: เชื่อมต่อฐานข้อมูลเพื่อดึงข้อความอวยพรจากผู้ใช้งานท่านอื่นมาแสดงผลทันที
* **รองรับการแสดงผลทุกหน้าจอ**: มีการใช้รูปภาพพื้นหลังที่ปรับเปลี่ยนตามขนาดหน้าจอ (Desktop และ Mobile)
* **ระบบจัดการหลังบ้าน (Admin Page)**: มีหน้าสำหรับผู้ดูแลระบบ เข้าถึงผ่าน URL path `#/admin`

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

* **Framework:** React (เวอร์ชัน 19.x)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS พร้อม Autoprefixer
* **Database & Backend:** Firebase (เวอร์ชัน 12.x)
* **Linting:** ESLint

## 🚀 การติดตั้งและเรียกใช้งาน (Installation & Setup)

1. **Clone repository และเข้าไปที่โฟลเดอร์โปรเจกต์**
   ```bash
   git clone <repository-url>
   cd rodnam-crpao
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   ```

3. **ตั้งค่า Firebase**
   * โปรเจกต์นี้จำเป็นต้องใช้งาน Firebase สำหรับบันทึกและดึงข้อมูลคำอวยพร
   * (ผู้พัฒนาต้องเพิ่มไฟล์ `src/firebase.js` และใส่ Configuration ของ Firebase ก่อนรันโปรเจกต์)

4. **รันเซิร์ฟเวอร์สำหรับการพัฒนา (Development Server)**
   ```bash
   npm run dev
   ```

5. **การ Build สำหรับใช้งานจริง (Production)**
   ```bash
   npm run build
   ```

## 📂 โครงสร้างที่สำคัญ (Key Structure)

* `src/App.jsx`: ไฟล์หลักที่จัดการ State การทำงานทั้ง 5 ขั้นตอน, ระบบ Rate Limit, และ Routing อย่างง่าย
* `src/components/`: โฟลเดอร์เก็บ Component แยกตามแต่ละขั้นตอน (เช่น `Step1BowlSelect`, `Step2Nickname`, `AdminPage` เป็นต้น)
* `src/firebase.js`: ไฟล์สำหรับจัดการการเชื่อมต่อฐานข้อมูล (เช่น `saveBlessing`, `subscribeBlessings`)

## 📜 Scripts

* `npm run dev`: เริ่มต้น Development server ผ่าน Vite
* `npm run build`: สร้างไฟล์ Production ready
* `npm run lint`: ตรวจสอบความถูกต้องของโค้ดด้วย ESLint
* `npm run preview`: จำลองการทำงานของไฟล์ที่ Build แล้วในเครื่อง
