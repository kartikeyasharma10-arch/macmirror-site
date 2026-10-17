// Cookie consent + Microsoft Clarity. Clarity only loads after the visitor accepts.
(() => {
  const CLARITY_ID = "yzb8fnxnt1";
  const KEY = "mm-consent";

  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = (v) => { try { localStorage.setItem(KEY, v); } catch {} };

  function loadClarity() {
    if (window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
    window.clarity("consent");
  }

  function banner() {
    if (document.getElementById("consent")) return;
    const el = document.createElement("div");
    el.id = "consent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Cookie consent");
    el.innerHTML = `
      <p>We use <strong>Microsoft Clarity</strong> cookies to see how visitors use this site so we can improve it.
      No ads, no selling data. <a href="privacy.html#analytics">Learn more</a></p>
      <div class="consent-actions">
        <button type="button" class="btn ghost small" data-choice="no">Decline</button>
        <button type="button" class="btn small" data-choice="yes">Accept</button>
      </div>`;
    el.addEventListener("click", (e) => {
      const choice = e.target.closest("[data-choice]")?.dataset.choice;
      if (!choice) return;
      write(choice);
      el.remove();
      if (choice === "yes") loadClarity();
      else if (window.clarity) window.clarity("consent", false);
    });
    document.body.appendChild(el);
  }

  const choice = read();
  if (choice === "yes") loadClarity();
  else if (choice !== "no") banner();

  // Footer "Cookie settings" links reopen the banner.
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); banner(); }
  });
})();
