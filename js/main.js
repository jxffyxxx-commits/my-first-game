// ---------- เตรียมพื้นที่วาด ----------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // ctx = ปากกาที่ใช้วาดทุกอย่าง

// ---------- สถานะของวัตถุในเกม ----------
const player = {
  x: 100,
  y: 200,
  w: 50,
  h: 50,
  speed: 300,      // หน่วย: พิกเซลต่อวินาที
  color: "#00d9ff"
};

// ---------- รับ input จากคีย์บอร์ด ----------
const keys = {}; // เก็บว่าปุ่มไหนถูกกดค้างอยู่
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup",   e => keys[e.key] = false);

// ---------- 1) UPDATE: คำนวณสถานะใหม่ ----------
function update(dt) {
  // dt = เวลาที่ผ่านไปตั้งแต่เฟรมที่แล้ว (วินาที)
  // คูณ dt เพื่อให้ความเร็วเท่ากันทุกเครื่อง ไม่ว่าจอจะ 60Hz หรือ 144Hz
  if (keys["ArrowLeft"]  || keys["a"]) player.x -= player.speed * dt;
  if (keys["ArrowRight"] || keys["d"]) player.x += player.speed * dt;
  if (keys["ArrowUp"]    || keys["w"]) player.y -= player.speed * dt;
  if (keys["ArrowDown"]  || keys["s"]) player.y += player.speed * dt;

  // กันไม่ให้หลุดออกนอกจอ
  player.x = Math.max(0, Math.min(canvas.width  - player.w, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.h, player.y));
}

// ---------- 2) DRAW: วาดภาพ ----------
function draw() {
  // ต้องล้างจอทุกเฟรม ไม่งั้นภาพเก่าจะค้างเป็นรอยยาว
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#fff";
  ctx.font = "16px sans-serif";
  ctx.fillText("ใช้ WASD หรือปุ่มลูกศรเพื่อเคลื่อนที่", 12, 24);
}

// ---------- 3) GAME LOOP: หัวใจของเกม ----------
let lastTime = 0;
function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000; // แปลง ms เป็นวินาที
  lastTime = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop); // เรียกตัวเองซ้ำ ~60 ครั้งต่อวินาที
}
requestAnimationFrame(loop);