// Progressive enhancement only. With JS off, everything is fully visible and static.
(function () {
  "use strict";
  var root = document.documentElement;

  // --- #1 Reveal on scroll ---------------------------------------------------
  // Feed rows, covers, galleries, embeds and events fade up as they enter view,
  // like a print developing. Text (prose) is never touched, so reading is instant.
  // Runs even under reduced-motion: the CSS then degrades it to a gentle
  // opacity-only fade with no movement (accessibility-safe).
  if ("IntersectionObserver" in window) {
    root.classList.add("js-reveal");

    var all = [];
    function claim(el, cls, i) {
      if (el.dataset.reveal) return false;   // already claimed by a more specific group
      el.dataset.reveal = "1";
      el.classList.add(cls);
      var d = Math.min(i * 60, 360) + "ms";
      el.style.animationDelay = d;
      el.style.transitionDelay = d;
      all.push(el);
      return true;
    }

    // Single elements, matched most-specific first:
    //  reveal-lead : main section titles / home tagline -> accelerating flicker
    //  reveal-soft : pictures & players -> calm fade (flicker looks like a bug here)
    //  reveal      : in-article headings, quotes, code -> stepped flicker
    var groups = [
      { sel: "[data-kind='section'] .post-head h1, [data-kind='home'] .eyebrow", cls: "reveal-lead" },
      { sel: ".home-hero img, .cover, .portrait, .gallery, .embed, .prose img", cls: "reveal-soft" },
      { sel: ".prose h2, .prose h3, .prose blockquote, .prose pre", cls: "reveal" }
    ];
    groups.forEach(function (g) {
      var i = 0;
      document.querySelectorAll(g.sel).forEach(function (el) { if (claim(el, g.cls, i)) i++; });
    });

    // Lists (menus, feeds, agenda): only a few items flicker, spread evenly across
    // the list via a Euclidean rhythm — like a neon sign where a few tubes catch.
    // At least one item always stays fixed when the list has more than one item.
    var MAX_FLICKER = 3;
    function euclid(k, n) {                  // indices of k pulses spread evenly over n
      var out = [];
      for (var i = 0; i < n; i++) {
        if (Math.floor(i * k / n) !== Math.floor((i - 1) * k / n)) out.push(i);
      }
      return out;
    }
    function claimList(container, itemSel) {
      var items = container.querySelectorAll(itemSel);
      var n = items.length;
      if (!n) return;
      var k = n <= 1 ? n : Math.min(MAX_FLICKER, n - 1);   // keep >=1 fixed when n>1
      euclid(k, n).forEach(function (idx, order) { claim(items[idx], "reveal", order); });
    }
    document.querySelectorAll(".feed").forEach(function (f) { claimList(f, "li"); });
    document.querySelectorAll(".dates").forEach(function (d) { claimList(d, "li"); });
    document.querySelectorAll(".agenda-group").forEach(function (g) { claimList(g, ".event"); });

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

  // --- Email de-obfuscation --------------------------------------------------
  // Rejoin the split address into a real mailto: link at runtime, so the raw
  // address never appears in the static HTML that harvesting bots scrape.
  document.querySelectorAll("a.email").forEach(function (a) {
    var u = a.getAttribute("data-user"), d = a.getAttribute("data-domain");
    if (u && d) {
      a.setAttribute("href", "mailto:" + u + "@" + d);
      a.removeAttribute("data-user");
      a.removeAttribute("data-domain");
    }
  });
})();
