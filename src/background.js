const img = ["img/img01.jpg", "img/img02.jpg", "img/img03.jpg"];

const chosenImage = img[Math.floor(Math.random() * img.length)];
const bgImage = document.createElement("img");
bgImage.src = chosenImage;
document.body.appendChild(bgImage);

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);
