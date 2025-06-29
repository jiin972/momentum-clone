import img01 from "./assets/img/img01.jpg";
import img02 from "./assets/img/img02.jpg";
import img03 from "./assets/img/img03.jpg";

const img = [img01, img02, img03];

const chosenImage = img[Math.floor(Math.random() * img.length)];

const bgImage = document.createElement("img");

bgImage.src = chosenImage;
document.body.appendChild(bgImage);

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);
