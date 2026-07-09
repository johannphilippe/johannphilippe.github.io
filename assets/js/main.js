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

    // Three treatments, matched most-specific first (an element is claimed once):
    //  reveal-lead : main section titles / home tagline -> accelerating flicker
    //  reveal-soft : pictures & players -> calm fade (flicker looks like a bug here)
    //  reveal      : headings, quotes, code, feed rows, events -> stepped flicker
    var groups = [
      { sel: "[data-kind='section'] .post-head h1, [data-kind='home'] .eyebrow", cls: "reveal-lead" },
      { sel: ".cover, .gallery, .embed, .prose img", cls: "reveal-soft" },
      { sel: ".feed li, .event, .prose h2, .prose h3, .prose blockquote, .prose pre", cls: "reveal" }
    ];

    var all = [];
    groups.forEach(function (g) {
      var i = 0;
      document.querySelectorAll(g.sel).forEach(function (el) {
        if (el.dataset.reveal) return;      // already claimed by a more specific group
        el.dataset.reveal = "1";
        el.classList.add(g.cls);
        var d = Math.min(i * 60, 360) + "ms";
        el.style.animationDelay = d;
        el.style.transitionDelay = d;
        i++;
        all.push(el);
      });
    });

    // Force one reflow so the hidden state is committed to the paint before any
    // element is flipped to visible — otherwise above-the-fold items would jump
    // straight to their final state with no animation.
    void root.offsetHeight;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    all.forEach(function (el) { io.observe(el); });
  }

  // --- #6 Cursor-reactive grain ---------------------------------------------
  // The grain overlay drifts with the cursor and thickens toward the bottom of
  // the screen. Off on touch devices and under reduced-motion; only if grain is on.
  var coarse = window.matchMedia("(pointer: coarse)");
  if (!reduce.matches && !coarse.matches && root.dataset.grain === "on") {
    var ticking = false, mx = 0.5, my = 0.5;

    // Restore the last cursor-driven grain level across navigation, so a section
    // click (a full page load) doesn't snap the overlay back to the CSS default.
    try {
      var saved = sessionStorage.getItem("grainLevel");
      if (saved !== null) {
        my = parseFloat(saved);
        root.style.setProperty("--grain-level", my.toFixed(3));
      }
    } catch (e) {}

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
          try { sessionStorage.setItem("grainLevel", my.toFixed(3)); } catch (e) {}
          ticking = false;
        });
      }
    }, { passive: true });
  }
})();
