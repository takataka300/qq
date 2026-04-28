// KNEC Hub — static site shared JS
(function () {
  // ===== Real KNEC subjects (KCSE) =====
  const KCSE_SUBJECTS = [
    "Mathematics Alt A","Mathematics Alt B",
    "English Paper 1","English Paper 2","English Paper 3",
    "Kiswahili Karatasi 1","Kiswahili Karatasi 2","Kiswahili Karatasi 3",
    "Biology Paper 1","Biology Paper 2","Biology Paper 3",
    "Chemistry Paper 1","Chemistry Paper 2","Chemistry Paper 3",
    "Physics Paper 1","Physics Paper 2","Physics Paper 3",
    "Geography Paper 1","Geography Paper 2",
    "History & Government Paper 1","History & Government Paper 2",
    "CRE Paper 1","CRE Paper 2",
    "IRE Paper 1","IRE Paper 2",
    "Hindu Religious Education Paper 1","Hindu Religious Education Paper 2",
    "Agriculture Paper 1","Agriculture Paper 2",
    "Business Studies Paper 1","Business Studies Paper 2",
    "Computer Studies Paper 1","Computer Studies Paper 2",
    "Home Science Paper 1","Home Science Paper 2",
    "Art & Design Paper 1","Art & Design Paper 2",
    "Music Paper 1","Music Paper 2","Music Paper 3",
    "French Paper 1","French Paper 2","French Paper 3",
    "German Paper 1","German Paper 2","German Paper 3",
    "Arabic Paper 1","Arabic Paper 2","Arabic Paper 3",
    "Aviation Technology Paper 1","Aviation Technology Paper 2",
    "Building Construction Paper 1","Building Construction Paper 2",
    "Power Mechanics Paper 1","Power Mechanics Paper 2",
    "Electricity Paper 1","Electricity Paper 2",
    "Drawing & Design Paper 1","Drawing & Design Paper 2",
    "Woodwork Paper 1","Woodwork Paper 2",
    "Metalwork Paper 1","Metalwork Paper 2"
  ];
  const KJSEA_PAPERS = [
    "Mathematics","English","Kiswahili","Integrated Science","Social Studies",
    "Pre-Technical Studies","Agriculture & Nutrition","Creative Arts & Sports",
    "Religious Education"
  ];
  const KPSEA_PAPERS = [
    "Mathematics","English","Kiswahili / KSL","Science & Technology",
    "Social Studies & Religious Education","Creative Arts"
  ];
  const COLLEGE_PAPERS = [
    "TVET Diploma in ICT","TVET Business Management","TVET Electrical Engineering",
    "TVET Mechanical Engineering","TVET Building & Civil Engineering",
    "TVET Food & Beverage","TVET Hairdressing & Beauty",
    "Diploma in ECDE","KMTC Diploma in Nursing","KMTC Diploma in Clinical Medicine",
    "KMTC Diploma in Pharmacy","KASNEB Diploma in Accounting",
    "CPA Section 1","CPA Section 2","CPA Section 3","CPA Section 4","CPA Section 5","CPA Section 6",
    "ATD Level I","ATD Level II","ATD Level III",
    "KIMC Diploma in Journalism","Diploma in Cooperative Management","Diploma in Agriculture"
  ];

  // Build full catalogue with year + group
  const ALL_PAPERS = [];
  ["2025","2026"].forEach(yr => {
    KCSE_SUBJECTS.forEach(s => ALL_PAPERS.push({
      name: `KCSE ${yr} — ${s}`, label: `${s} KCSE ${yr}`, group: "KCSE", year: yr
    }));
  });
  KJSEA_PAPERS.forEach(s => ALL_PAPERS.push({
    name: `KJSEA 2025 — ${s}`, label: `${s} KJSEA 2025`, group: "KJSEA", year: "2025"
  }));
  KPSEA_PAPERS.forEach(s => ALL_PAPERS.push({
    name: `KPSEA 2025 — ${s}`, label: `${s} KPSEA 2025`, group: "KPSEA", year: "2025"
  }));
  COLLEGE_PAPERS.forEach(s => ALL_PAPERS.push({
    name: `College 2025 — ${s}`, label: s, group: "College", year: "2025"
  }));

  window.KNEC_DATA = { KCSE_SUBJECTS, KJSEA_PAPERS, KPSEA_PAPERS, COLLEGE_PAPERS, ALL_PAPERS };

  const downloadIcon = '<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

  // ===== Payment modal =====
  const TILL = "0734002689";
  const WHATSAPP = "254734002689";

  function buildModal() {
    if (document.getElementById("pay-modal")) return;
    const html = `
      <div class="modal-backdrop" id="pay-modal" role="dialog" aria-modal="true">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-icon" id="pay-modal-icon">📱</div>
          <h3>Unlock Access</h3>
          <p class="modal-desc">To download <span id="pay-item" style="font-weight:600;color:var(--fg)"></span>, complete a one-time payment.</p>
          <div class="till-card">
            <div class="till-row">
              <span style="color:var(--muted-fg);font-size:14px">Amount</span>
              <span class="till-amount">KSh <span id="pay-amount">300</span></span>
            </div>
            <div class="till-row">
              <span style="color:var(--muted-fg);font-size:14px">Send M-Pesa to</span>
              <span style="display:flex;gap:8px;align-items:center">
                <span class="till-num">${TILL}</span>
                <button class="btn btn-outline" id="copy-btn" type="button" style="padding:5px 10px;font-size:12px">Copy</button>
              </span>
            </div>
          </div>
          <ol class="steps">
            <li>Open M-Pesa → Send Money</li>
            <li>Enter number <b>${TILL}</b></li>
            <li>Enter amount <b>KSh <span class="pay-amt-2">300</span></b></li>
            <li>Tap "I have paid" then forward your M-Pesa confirmation SMS to our WhatsApp to start your download.</li>
          </ol>
          <button class="btn btn-block" id="pay-confirm">I have paid</button>
          <div id="pay-step2" style="display:none;margin-top:18px">
            <div class="placement-msg" style="margin-top:0;display:flex">
              <span style="color:var(--knec);flex-shrink:0">✓</span>
              <div style="flex:1">
                <div style="font-weight:600;color:var(--fg)">Almost done — forward your M-Pesa SMS</div>
                <p style="color:var(--muted-fg);margin:6px 0 0;font-size:13px">
                  Forward the M-Pesa confirmation message to WhatsApp <b style="color:var(--fg);font-family:monospace">${TILL}</b>.
                  Your download link will be sent within minutes.
                </p>
              </div>
            </div>
            <a id="pay-wa-btn" class="btn btn-block" style="margin-top:12px;background:#25D366;color:white" target="_blank" rel="noopener">
              💬 Open WhatsApp to forward payment
            </a>
            <button class="btn btn-block btn-outline" id="pay-close" style="margin-top:8px">Close</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
    const backdrop = document.getElementById("pay-modal");
    backdrop.addEventListener("click", () => closeModal());
    document.getElementById("pay-confirm").addEventListener("click", showStep2);
    document.getElementById("pay-close").addEventListener("click", closeModal);
    document.getElementById("copy-btn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(TILL);
        const b = document.getElementById("copy-btn");
        const old = b.textContent; b.textContent = "Copied";
        setTimeout(() => (b.textContent = old), 1600);
      } catch {}
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }
  function showStep2() {
    document.getElementById("pay-confirm").style.display = "none";
    document.getElementById("pay-step2").style.display = "block";
    const item = document.getElementById("pay-item").textContent;
    const amt = document.getElementById("pay-amount").textContent;
    const msg = encodeURIComponent(
      `Hi, I have paid KSh ${amt} for: ${item}.\nPlease find my M-Pesa confirmation message forwarded below. Kindly send my download link.`
    );
    document.getElementById("pay-wa-btn").href = `https://wa.me/${WHATSAPP}?text=${msg}`;
  }
  function openModal(itemName, opts) {
    buildModal();
    opts = opts || {};
    document.getElementById("pay-item").textContent = itemName;
    document.getElementById("pay-amount").textContent = opts.amount || 300;
    document.querySelectorAll(".pay-amt-2").forEach(el => el.textContent = opts.amount || 300);
    const cls = opts.theme === "kuccps" ? "kuccps" : opts.theme === "stream" ? "stream" : "";
    const ic = document.getElementById("pay-modal-icon");
    ic.className = "modal-icon" + (cls ? " " + cls : "");
    const btn = document.getElementById("pay-confirm");
    btn.style.display = "inline-flex";
    btn.className = "btn btn-block " + (cls === "kuccps" ? "btn-kuccps" : cls === "stream" ? "btn-stream" : "btn-knec");
    document.getElementById("pay-step2").style.display = "none";
    document.getElementById("pay-modal").classList.add("open");
  }
  function closeModal() {
    const m = document.getElementById("pay-modal");
    if (m) m.classList.remove("open");
  }
  window.openPayModal = openModal;
  window.closePayModal = closeModal;

  // ===== Past Papers (index page) =====
  function renderChips(containerId, papers, makeName) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = papers.map((s) => {
      const name = makeName(s);
      const label = s;
      return `<button class="paper-chip" data-name="${name.replace(/"/g, "&quot;")}">${label}${downloadIcon}</button>`;
    }).join("");
    el.querySelectorAll(".paper-chip").forEach((b) => {
      b.addEventListener("click", () => openModal(b.getAttribute("data-name"), { theme: "knec" }));
    });
  }

  function initIndexPage() {
    if (!document.getElementById("kcse-grid")) return;
    renderChips("kcse-grid", KCSE_SUBJECTS, s => "KCSE 2025 — " + s);
    renderChips("kcse2026-grid", KCSE_SUBJECTS, s => "KCSE 2026 — " + s);
    renderChips("kjsea-grid", KJSEA_PAPERS, s => "KJSEA 2025 — " + s);
    renderChips("kpsea-grid", KPSEA_PAPERS, s => "KPSEA 2025 — " + s);
    renderChips("college-grid", COLLEGE_PAPERS, s => "College 2025 — " + s);

    const input = document.getElementById("paper-search");
    const out = document.getElementById("search-results");
    if (!input || !out) return;

    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) { out.innerHTML = ""; out.style.display = "none"; return; }
      const ql = q.toLowerCase();
      const matches = ALL_PAPERS.filter(p =>
        (p.label + " " + p.name + " " + p.group + " " + p.year).toLowerCase().includes(ql)
      ).slice(0, 14);

      out.style.display = "block";

      if (matches.length > 0) {
        out.innerHTML =
          `<div class="heading">${matches.length} match${matches.length === 1 ? "" : "es"} — click to unlock</div>` +
          matches.map(m => `
            <button class="result-row" data-name="${m.name.replace(/"/g, "&quot;")}">
              <span><span class="badge">${m.group} ${m.year}</span><span style="font-weight:500">${m.label}</span></span>
              ${downloadIcon}
            </button>`).join("");
        out.querySelectorAll(".result-row").forEach(b => {
          b.addEventListener("click", () => openModal(b.getAttribute("data-name"), { theme: "knec" }));
        });
      } else {
        // Validate it looks like a real paper request (must mention a real subject keyword)
        const SUBJECT_KEYWORDS = [
          "math","english","kiswahili","biology","chemistry","physics","geography",
          "history","cre","ire","hindu","agriculture","business","computer",
          "home science","art","music","french","german","arabic","aviation",
          "building","power","electricity","drawing","woodwork","metalwork",
          "kcse","kjsea","kpsea","cpa","atd","kasneb","kmtc","tvet","diploma",
          "nursing","pharmacy","clinical","ecde","journalism","ict","accounting",
          "science","social","religious","creative","integrated","pre-technical"
        ];
        const isRealLooking = SUBJECT_KEYWORDS.some(k => ql.includes(k)) && q.length >= 3;
        if (isRealLooking) {
          out.innerHTML = `
            <button class="no-result-card" id="request-paper">
              <span class="no-result-icon">📄</span>
              <span class="no-result-body">
                <div class="no-result-title">Can't find "${escapeHtml(q)}"?</div>
                <div class="no-result-desc">Click here to request this paper. Pay to unlock — we'll source the official KNEC paper and email you the PDF within 24 hours.</div>
              </span>
              <span class="no-result-cta">Request →</span>
            </button>`;
          document.getElementById("request-paper").addEventListener("click", () => {
            openModal('Request paper: "' + q + '"', { theme: "knec" });
          });
        } else {
          out.innerHTML = `
            <div class="no-result-card" style="border-style:solid;border-color:var(--border);background:var(--muted);cursor:default">
              <span class="no-result-icon" style="background:var(--muted-fg)">?</span>
              <span class="no-result-body">
                <div class="no-result-title">"${escapeHtml(q)}" doesn't look like a KNEC paper</div>
                <div class="no-result-desc">Try a real subject — e.g. "Physics Paper 2", "KCSE 2026 Mathematics", "KJSEA Integrated Science", "CPA Section 4".</div>
              </span>
            </div>`;
        }
      }
    });
  }

  // ===== KUCCPS pages (each tool now lives on its own /kuccps-... page) =====
  function initKuccpsFinderPage() {
    const btn = document.getElementById("courses-btn");
    if (!btn) return;
    btn.addEventListener("click", () => openModal("KUCCPS Course Finder access", { theme: "kuccps", amount: 300 }));
  }
  function initKuccpsResultsPage() {
    const form = document.getElementById("placement-form");
    if (!form) return;
    const msg = document.getElementById("placement-msg");
    const msgBody = document.getElementById("placement-msg-body");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = document.getElementById("idxno").value.trim();
      const yr = document.getElementById("year").value.trim();
      if (!idx || !yr) return;
      msg.style.display = "flex";
      msgBody.innerHTML = '<div style="font-weight:600">Checking…</div>';
      setTimeout(() => {
        msgBody.innerHTML = `
          <div style="font-weight:600">Placement results not yet released</div>
          <p style="color:var(--muted-fg);margin:6px 0 0">
            KUCCPS placement results for index
            <span style="font-family:monospace;font-weight:600;color:var(--fg)">${escapeHtml(idx)}</span>
            (${escapeHtml(yr)}) have not yet been released. Please check back later once KUCCPS publishes the official placement.
          </p>`;
      }, 1100);
    });
  }

  // ===== App pages =====
  function initStreamPage() {
    document.querySelectorAll("[data-stream-pay]").forEach(b => {
      b.addEventListener("click", () => openModal("KnecStream app access", { theme: "stream", amount: 300 }));
    });
  }
  function initSportsPage() {
    document.querySelectorAll("[data-sports-pay]").forEach(b => {
      b.addEventListener("click", () => openModal("KnecSports app access", { theme: "stream", amount: 300 }));
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIndexPage();
    initKuccpsFinderPage();
    initKuccpsResultsPage();
    initStreamPage();
    initSportsPage();
  });
})();
