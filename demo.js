// Animated hero demo: shows the four ways to open Mac Mirror.
(() => {
  const root = document.getElementById("demo");
  if (!root) return;
  const screen = root.querySelector(".screen");
  const cursor = root.querySelector(".cursor");
  const ring = root.querySelector(".ring");
  const key = (k) => root.querySelector(`kbd[data-k="${k}"]`);
  const tabs = [...root.querySelectorAll(".demo-tabs button")];
  const caption = root.querySelector(".demo-caption");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const captions = {
    hover: "Rest your pointer on the floating icon and the mirror pops open. Move away and it disappears.",
    hold: "Hold ⌘ on its own for a moment, from any app. Hold it again (or click away) to close.",
    shortcut: "Press ⌥⌘M anywhere, even over full-screen apps, to toggle the mirror.",
    click: "Click the icon to pin the mirror open. Click anywhere else to close it.",
  };
  const order = Object.keys(captions);
  const ICON = [88.5, 37]; // cursor tip on the icon, in % of the screen

  let run = 0, mode = "hover", userPicked = false;
  const wait = (ms, id) => new Promise((ok, stop) => setTimeout(() => (id === run ? ok() : stop()), ms));
  const at = (x, y) => { cursor.style.left = x + "%"; cursor.style.top = y + "%"; };
  const set = (cls, on) => screen.classList.toggle(cls, on);
  const press = async (id) => { cursor.classList.add("press"); await wait(140, id); cursor.classList.remove("press"); };

  function reset() {
    screen.className = "screen";
    cursor.classList.remove("press");
    cursor.style.transition = "none"; at(28, 78); void cursor.offsetWidth; cursor.style.transition = "";
    ring.classList.remove("fill");
    root.querySelectorAll("kbd").forEach((k) => k.classList.remove("shown", "down"));
  }

  const scenes = {
    async hover(id) {
      set("show-cursor", true); await wait(350, id);
      at(...ICON); await wait(950, id);
      set("hovering", true); await wait(350, id);
      set("open", true); await wait(2300, id);
      at(36, 70); await wait(600, id);
      set("hovering", false); set("open", false); await wait(900, id);
    },
    async hold(id) {
      key("cmd").classList.add("shown"); set("show-keys", true); await wait(500, id);
      for (const opening of [true, false]) {
        key("cmd").classList.add("down"); ring.classList.add("fill"); await wait(650, id);
        set("open", opening); await wait(300, id);
        key("cmd").classList.remove("down"); ring.classList.remove("fill"); await wait(opening ? 2000 : 900, id);
      }
    },
    async shortcut(id) {
      ["opt", "cmd", "m"].forEach((k) => key(k).classList.add("shown")); set("show-keys", true); await wait(500, id);
      for (const opening of [true, false]) {
        for (const k of ["opt", "cmd", "m"]) { key(k).classList.add("down"); await wait(130, id); }
        set("open", opening); await wait(250, id);
        ["opt", "cmd", "m"].forEach((k) => key(k).classList.remove("down")); await wait(opening ? 2000 : 900, id);
      }
    },
    async click(id) {
      set("show-cursor", true); await wait(350, id);
      at(...ICON); await wait(950, id);
      set("hovering", true); await press(id);
      set("open", true); set("pinned", true); await wait(1800, id);
      set("hovering", false); at(24, 48); await wait(1000, id);
      await press(id); set("open", false); set("pinned", false); await wait(900, id);
    },
  };

  function select(next, byUser) {
    mode = next;
    if (byUser) userPicked = true;
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.mode === mode)));
    caption.textContent = captions[mode];
    play();
  }

  async function play() {
    const id = ++run;
    reset();
    if (reduced) { set("open", true); return; }
    try {
      await scenes[mode](id);
      await wait(300, id);
      select(userPicked ? mode : order[(order.indexOf(mode) + 1) % order.length]);
    } catch { /* superseded by a newer run */ }
  }

  tabs.forEach((t) => t.addEventListener("click", () => select(t.dataset.mode, true)));
  // Only animate while the demo is on screen.
  new IntersectionObserver(([e]) => { if (e.isIntersecting) select(mode); else run++; }).observe(root);
})();
