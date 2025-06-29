const img = ["img01.jpg", "img02.jpg", "img03.jpg"];

const chosenImage = img[Math.floor(Math.random() * img.length)];

const bgImage = document.createElement("img");

bgImage.src = `/public/img/${chosenImage}`;
document.body.appendChild(bgImage);

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);
