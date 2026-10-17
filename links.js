// The only two links to update when launching. Empty = buttons scroll to the pricing card.
const LINKS = {
  buy: "",      // Dodo Payments checkout link, e.g. "https://checkout.dodopayments.com/buy/pdt_xxx?quantity=1"
  download: "", // e.g. "https://github.com/kartikeyasharma10-arch/macmirror-site/releases/latest/download/MacMirror.dmg"
};

for (const el of document.querySelectorAll("[data-link]")) {
  const url = LINKS[el.dataset.link];
  if (url) el.href = url;
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
