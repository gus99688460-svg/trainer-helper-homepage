/* =====================================================================
   트레이너 헬퍼 — main.js
   - APP_URL 단일 설정 지점 (운영 앱 URL 확정 시 이 한 줄만 교체)
   - data-app-link / data-app-path href 주입
   - 모바일 햄버거 메뉴 토글 (aria, ESC/외부클릭/링크클릭 닫힘, 스크롤 락)
   - IntersectionObserver 스크롤 리빌 (reduced-motion 즉시 표시)
   - FAQ는 <details>로 구현되어 JS 없이도 동작 (점진적 향상)
   ===================================================================== */

const APP_URL = "https://web-production-237fa.up.railway.app"; // 운영 앱 (베이스 오리진, 끝 슬래시 없음)

(function () {
  "use strict";

  /* ---------- 1. CTA / 약관 링크 주입 ---------- */
  // APP_URL + 경로 안전 결합 (APP_URL 미정이면 "#")
  function appUrl(path) {
    if (APP_URL === "#" || APP_URL === "") return "#";
    return APP_URL.replace(/\/+$/, "") + (path || "");
  }

  function injectAppLinks() {
    // 메인 CTA: data-app-link → 앱 진입(/app). 비로그인 시 앱이 로그인으로 보냄
    document.querySelectorAll("a[data-app-link]").forEach(function (a) {
      a.setAttribute("href", appUrl("/app"));
    });

    // 로그인·약관/개인정보/환불 등: data-app-path → APP_URL + 경로 (APP_URL 미정이면 "#")
    document.querySelectorAll("a[data-app-path]").forEach(function (a) {
      a.setAttribute("href", appUrl(a.getAttribute("data-app-path")));
    });
  }

  /* ---------- 2. 모바일 햄버거 메뉴 ---------- */
  function initHamburger() {
    var btn = document.getElementById("hamburger");
    var menu = document.getElementById("mobile-menu");
    var overlay = document.getElementById("menu-overlay");
    if (!btn || !menu) return;

    function openMenu() {
      menu.hidden = false;
      if (overlay) overlay.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "메뉴 닫기");
      document.body.classList.add("no-scroll");
    }

    function closeMenu() {
      menu.hidden = true;
      if (overlay) overlay.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "메뉴 열기");
      document.body.classList.remove("no-scroll");
    }

    function isOpen() {
      return btn.getAttribute("aria-expanded") === "true";
    }

    btn.addEventListener("click", function () {
      isOpen() ? closeMenu() : openMenu();
    });

    // 메뉴 내 링크 클릭 시 닫힘
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // 오버레이(외부) 클릭 시 닫힘
    if (overlay) overlay.addEventListener("click", closeMenu);

    // ESC 닫힘
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        closeMenu();
        btn.focus();
      }
    });

    // 데스크탑으로 리사이즈되면 메뉴 강제 닫힘(상태 꼬임 방지)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && isOpen()) closeMenu();
    });
  }

  /* ---------- 3. 스크롤 리빌 (IntersectionObserver) ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reduced-motion 또는 IO 미지원 → 즉시 표시
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("show");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // 1회만
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- 초기화 ---------- */
  function init() {
    injectAppLinks();
    initHamburger();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
