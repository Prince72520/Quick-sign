const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSize = document.getElementById("fontSize");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Default settings
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;

// Change pen color
colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
});

// Change canvas background color
canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Change pen size
fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

// Drawing logic
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Clear canvas
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem("savedSignature");
});

// Save signature as image
saveButton.addEventListener("click", () => {
  const dataURL = canvas.toDataURL();
  localStorage.setItem("savedSignature", dataURL);

  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = dataURL;
  link.click();
});

// Retrieve saved signature
retrieveButton.addEventListener("click", () => {
  const savedData = localStorage.getItem("savedSignature");
  if (!savedData) {
    alert("No saved signature found!");
    return;
  }

  const img = new Image();
  img.src = savedData;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
});
