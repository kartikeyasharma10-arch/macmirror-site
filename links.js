// The only two links to update when launching. Empty = buttons scroll to the pricing card.
const LINKS = {
  buy: "https://test.checkout.dodopayments.com/buy/pdt_0NpwPKD7hzVP7glohdWiZ?quantity=1&redirect_url=https://macmirror.me/thanks.html",      // Dodo Payments checkout link, e.g. "https://checkout.dodopayments.com/buy/pdt_xxx?quantity=1"
  buyPlus: "https://test.checkout.dodopayments.com/buy/pdt_0NpxCPhjLfpQbA2v4ZgG3?quantity=1&redirect_url=https://macmirror.me/thanks.html",
  download: "https://github.com/kartikeyasharma10-arch/macmirror-site/releases/latest/download/MacMirror.dmg", // e.g. "https://github.com/kartikeyasharma10-arch/macmirror-site/releases/latest/download/MacMirror.dmg"
};

for (const el of document.querySelectorAll("[data-link]")) {
  const url = LINKS[el.dataset.link];
  if (url) el.href = url;
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
