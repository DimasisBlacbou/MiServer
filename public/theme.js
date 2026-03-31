(function () {
  function setIcon() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = document.documentElement.classList.contains("dark");
    btn.textContent = isDark ? "🌙" : "☀️";
  }
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
    setIcon();
  }
  document.addEventListener("DOMContentLoaded", function () {
    setIcon();
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", toggle);
  });
})();
