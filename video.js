// Loads the YouTube player only when the visitor presses play (no YouTube requests before that).
document.querySelectorAll(".video-facade").forEach((el) => {
  el.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${el.dataset.yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    frame.title = "Mac Mirror in 70 seconds";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    el.replaceChildren(frame);
    el.style.cursor = "default";
  }, { once: true });
});
