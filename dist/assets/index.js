(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const n of e)
      if (n.type === "childList")
        for (const a of n.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const n = {};
    return (
      e.integrity && (n.integrity = e.integrity),
      e.referrerPolicy && (n.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const n = s(e);
    fetch(e.href, n);
  }
})();
const b = document.querySelector(".todo-form"),
  h = b.querySelector("input"),
  J = document.querySelector(".todo-form__list"),
  m = document.querySelector(".todo-form__done-list"),
  p = document.querySelector(".toggle-done-list"),
  O = "todos",
  _ = "doneTodos";
let c = [],
  i = [];
function f() {
  localStorage.setItem(_, JSON.stringify(i));
}
function u() {
  localStorage.setItem(O, JSON.stringify(c));
}
function l(t, o = "todo") {
  const s = document.createElement("li");
  s.id = t.id;
  const r = document.createElement("span");
  (r.innerText = t.text),
    o === "done" &&
      ((r.style.textDecoration = "line-through"), (r.style.opacity = "0.7"));
  const e = document.createElement("button");
  if (
    ((e.innerText = "X"),
    (e.type = "button"),
    e.addEventListener("click", F),
    o === "done")
  ) {
    const n = document.createElement("button");
    (n.innerText = "↩"),
      (n.type = "button"),
      n.addEventListener("click", y),
      s.appendChild(r),
      s.appendChild(n),
      s.appendChild(e);
  } else {
    const n = document.createElement("button");
    (n.innerText = "✅"),
      (n.type = "button"),
      n.addEventListener("click", y),
      s.appendChild(r),
      s.appendChild(n),
      s.appendChild(e);
  }
  o === "done" ? m.appendChild(s) : J.appendChild(s);
}
function A(t) {
  m.classList.toggle("show"),
    m.classList.contains("show")
      ? (p.textContent = "완료된 목록 숨기기")
      : (p.textContent = "완료된 목록 보기");
}
function y(t) {
  const o = t.target.parentElement,
    s = parseInt(o.id),
    r = c.find((e) => e.id === s);
  if (r)
    (c = c.filter((e) => e.id !== s)),
      u(),
      i.push(r),
      f(),
      o.remove(),
      l(r, "done");
  else {
    const e = i.find((n) => n.id === s);
    e &&
      ((i = i.filter((n) => n.id !== s)),
      f(),
      c.push(e),
      u(),
      o.remove(),
      l(e, "todo"));
  }
}
function F(t) {
  const o = t.target.parentElement;
  o.remove();
  const s = parseInt(o.id);
  (c = c.filter((r) => r.id !== s)),
    u(),
    (i = i.filter((r) => r.id !== s)),
    f();
}
function P(t) {
  t.preventDefault();
  const o = h.value;
  h.value = "";
  const s = { text: o, id: Date.now() };
  c.push(s), l(s), u();
}
b.addEventListener("submit", P);
p.addEventListener("click", A);
const S = localStorage.getItem(O),
  v = localStorage.getItem(_);
if (S !== null) {
  const t = JSON.parse(S);
  (c = t), t.forEach((o) => l(o, "todo"));
}
if (v !== null) {
  const t = JSON.parse(v);
  (i = t), t.forEach((o) => l(o, "done"));
}
const g = document.querySelector(".login-form"),
  j = document.querySelector(".login-form input"),
  q = document.querySelector(".greeting"),
  T = document.querySelector(".todo-form__container"),
  E = document.querySelector(".todo-form__done-container"),
  d = "hidden",
  x = "username";
function K(t) {
  t.preventDefault();
  const o = j.value;
  g.classList.add(d), localStorage.setItem(x, o), I(o);
}
function I(t) {
  (q.innerText = `안녕하세요. ${t}`),
    q.classList.remove(d),
    T && T.classList.remove(d),
    E && E.classList.remove(d);
}
const D = localStorage.getItem(x);
D === null ? (g.classList.remove(d), g.addEventListener("submit", K)) : I(D);
const Y = "9ce72f66b259976e4507f0a43d9e61d6";
function G(t) {
  const o = t.coords.latitude,
    s = t.coords.longitude,
    r = `https://api.openweathermap.org/data/2.5/weather?lat=${o}&lon=${s}&appid=${Y}&units=metric`;
  fetch(r)
    .then((e) => e.json())
    .then((e) => {
      const n = document.querySelector(".weather span:first-child"),
        a = document.querySelector(".weather span:last-child");
      (n.innerText = e.name),
        (a.innerText = `${e.weather[0].main} / ${e.main.temp}`);
    });
}
function H() {
  alert("Can`t find you. No weather service for you.");
}
navigator.geolocation.getCurrentPosition(G, H);
const k = document.querySelector("h2#date__time"),
  U = document.querySelector("h3#date__date");
function Q() {
  const t = new Date(),
    o = t.getFullYear(),
    s = t.getMonth(),
    e = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[s],
    n = t.getDate(),
    a = t.getDay(),
    B = "Sun Mon Tue Wed Thu Fri Sat".split(" ")[a];
  U.innerText = `${B} ${n} ${e} ${o}`;
}
function M() {
  const t = new Date(),
    o = String(t.getHours()).padStart(2, "0"),
    s = String(t.getMinutes()).padStart(2, "0"),
    r = String(t.getSeconds()).padStart(2, "0");
  k.innerText = `${o}:${s}:${r}`;
}
Q();
M();
setInterval(M, 1e3);
const L = [
    {
      quote: "가장 어두운 밤에도 해는 뜨고, 가장 힘든 겨울에도 봄은 온다.",
      author: "빅터 위고",
    },
    {
      quote: "어제로부터 배우고, 오늘을 살며, 내일을 희망하라.",
      author: "알버트 아인슈타인",
    },
    {
      quote:
        "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 계속하려는 용기다.",
      author: "윈스턴 처칠",
    },
    {
      quote: "네가 할 수 있다고 믿든 할수 없다고 믿든, 네 믿는 대로 될 것이다.",
      author: "헨리포드",
    },
    {
      quote:
        "인생은 자전거를 타는 것과 같다. 균형을 유지하려면 계속 움직여야 한다.",
      author: "알버트 아인슈타인",
    },
    {
      quote:
        "가장 큰 영광은 결코 넘어지지 않는데 있는 것이 아니라 넘어질 때마다 일어서는 데 있다.",
      author: "공자",
    },
    {
      quote: "미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다.",
      author: "아브라함 링컨",
    },
    {
      quote:
        "시간은 가장 소중한 선물이다. 다른 사람의 삶을 살면서 시간을 낭비하지 마라.",
      author: "스티브 잡스",
    },
    {
      quote:
        "성공한 사람이 되려고 노력하기보다 가치 있는 사람이 되려고 노력하라.",
      author: "알버트 아인슈타인",
    },
    {
      quote: "자신을 빋어라. 그러면 어떻게 살아야 할지 알게 될 것이다.",
      author: "요한 볼프강 폰 괴테",
    },
  ],
  R = document.querySelector(".quotes span:first-child"),
  W = document.querySelector(".quotes span:last-child"),
  w = L[Math.floor(Math.random()) * L.length];
R.innerText = w.quote;
W.innerText = w.author;
const X = "/momentum-clone/assets/img01-Ccda1bml.jpg",
  Z = "/momentum-clone/assets/img02-BHhiBstk.jpg",
  z = "/momentum-clone/assets/img03-BOEdZSJ4.jpg",
  C = [X, Z, z],
  V = C[Math.floor(Math.random() * C.length)],
  N = document.createElement("img");
N.src = V;
document.body.appendChild(N);
const $ = document.createElement("div");
$.className = "overlay";
document.body.appendChild($);
