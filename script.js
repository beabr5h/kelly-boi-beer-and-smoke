/* Kelly Boi's Beer & Smokes — interactions */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- 21+ age gate (remembers choice for the session) ---- */
  var gate = document.getElementById("ageGate");
  if (gate) {
    var verified = false;
    try { verified = sessionStorage.getItem("kb_age_ok") === "1"; } catch (e) {}
    if (!verified) {
      gate.hidden = false;
      document.body.style.overflow = "hidden";
    }
    var yes = document.getElementById("ageYes");
    if (yes) {
      yes.addEventListener("click", function () {
        gate.hidden = true;
        document.body.style.overflow = "";
        try { sessionStorage.setItem("kb_age_ok", "1"); } catch (e) {}
      });
    }
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close after tapping a link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---- Scroll-aware header ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll (staggered) ---- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // stagger items that share a parent
          var siblings = Array.prototype.slice.call(el.parentElement.children);
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx * 80, 400) + "ms";
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
