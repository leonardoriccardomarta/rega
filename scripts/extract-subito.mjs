const res = await fetch("https://impresapiu.subito.it/shops/60152-regantini");
const html = await res.text();
const matches = [...html.matchAll(/https?:\/\/(?:www\.)?subito\.it\/auto\/[^"'\\\s]+/g)].map(
  (m) => m[0],
);
console.log([...new Set(matches)].join("\n") || "none");
