// Progressive enhancement only. With JS off, everything is fully visible and static.
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  // --- #1 Reveal on scroll ---------------------------------------------------
  // Feed rows, covers, galleries, embeds and events fade up as they enter view,
  // like a print developing. Text (prose) is never touched, so reading is instant.
  // Runs even under reduced-motion: the CSS then degrades it to a gentle
  // opacity-only fade with no movement (accessibility-safe).
  if ("IntersectionObserver" in window) {
    root.classList.add("js-reveal");

    var els = document.querySelectorAll(
      ".feed li, .cover, .gallery, .embed, .event, " +
      ".prose h2, .prose h3, .prose blockquote, .prose img, .prose pre, .prose figure"
    );

    // Apply the hidden state and a per-item stagger up front.
    els.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i * 70, 420) + "ms";
    });

    // Force one reflow so the hidden state is committed to the paint before any
    // element is flipped to visible — otherwise above-the-fold items would jump
    // straight to their final state with no transition.
    void root.offsetHeight;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    els.forEach(function (el) { io.observe(el); });
  }

  // --- #6 Cursor-reactive grain ---------------------------------------------
  // The grain overlay drifts with the cursor and thickens toward the bottom of
  // the screen. Off on touch devices and under reduced-motion; only if grain is on.
  var coarse = window.matchMedia("(pointer: coarse)");
  if (!reduce.matches && !coarse.matches && root.dataset.grain === "on") {
    var ticking = false, mx = 0.5, my = 0.5;
    window.addEventListener("pointermove", function (e) {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          root.style.setProperty("--grain-px", ((mx * 60) - 30).toFixed(1) + "px");
          root.style.setProperty("--grain-py", ((my * 60) - 30).toFixed(1) + "px");
          // Normalised 0..1; CSS maps it to a per-theme opacity range.
          root.style.setProperty("--grain-level", my.toFixed(3));
          ticking = false;
        });
      }
    }, { passive: true });
  }
})();
