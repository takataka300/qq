// KNEC Hub — static site shared JS
(function () {
  // ===== Data =====
  const KCSE_SUBJECTS = [
    "Mathematics Alt A","Mathematics Alt B","English Paper 1","English Paper 2","English Paper 3",
    "Kiswahili Karatasi 1","Kiswahili Karatasi 2","Kiswahili Karatasi 3",
    "Biology Paper 1","Biology Paper 2","Biology Paper 3",
    "Chemistry Paper 1","Chemistry Paper 2","Chemistry Paper 3",
    "Physics Paper 1","Physics Paper 2","Physics Paper 3",
    "Geography Paper 1","Geography Paper 2",
    "History & Government P1","History & Government P2",
    "CRE Paper 1","CRE Paper 2","IRE Paper 1","IRE Paper 2","Hindu Religious Education",
    "Agriculture Paper 1","Agriculture Paper 2",
    "Business Studies P1","Business Studies P2",
    "Computer Studies P1","Computer Studies P2",
    "Home Science Paper 1","Home Science Paper 2",
    "Art & Design Paper 1","Art & Design Paper 2",
    "Music Paper 1","Music Paper 2",
    "French Paper 1","French Paper 2","German Paper 1","Arabic Paper 1",
    "Aviation Technology","Building Construction","Power Mechanics","Electricity",
    "Drawing & Design","Woodwork","Metalwork","Marking Scheme Bundle"
  ];
  const KJSEA_PAPERS = [
    "KJSEA 2025 Mathematics","KJSEA 2025 English","KJSEA 2025 Kiswahili",
    "KJSEA 2025 Integrated Science","KJSEA 2025 Social Studies","KJSEA 2025 Pre-Technical",
    "KJSEA 2025 Agriculture & Nutrition","KJSEA 2025 Creative Arts & Sports",
    "KJSEA 2025 Religious Education","KJSEA 2025 Marking Scheme"
  ];
  const KPSEA_PAPERS = [
    "KPSEA 2025 Mathematics","KPSEA 2025 English","KPSEA 2025 Kiswahili / KSL",
    "KPSEA 2025 Science & Tech","KPSEA 2025 Social Studies & RE",
    "KPSEA 2025 Creative Arts","KPSEA 2025 Marking Scheme"
  ];
  const COLLEGE_PAPERS = [
    "TVET Diploma in ICT","TVET Business Management","TVET Electrical Engineering",
    "TVET Mechanical Engineering","TVET Building & Civil","TVET Food & Beverage",
    "TVET Hairdressing & Beauty","Diploma in Education (ECDE)","Diploma in Nursing (KMTC)",
    "Diploma in Clinical Medicine","Diploma in Pharmacy","Diploma in Accounting (KASNEB)",
    "CPA Section 1–6","ATD Level I–III","Diploma in Journalism (KIMC)",
    "Diploma in Cooperative Mgmt","Diploma in Agriculture","Marking Schemes Bundle"
  ];

  const ALL_PAPERS = []
    .concat(KCSE_SUBJECTS.map(s => ({ name: "KCSE 2025 — " + s, label: s, group: "KCSE" })))
    .concat(KJSEA_PAPERS.map(s => ({ name: s, label: s.replace("KJSEA 2025 ", ""), group: "KJSEA" })))
    .concat(KPSEA_PAPERS.map(s => ({ name: s, label: s.replace("KPSEA 2025 ", ""), group: "KPSEA" })))
    .concat(COLLEGE_PAPERS.map(s => ({ name: "College 2025 — " + s, label: s, group: "College" })));

  window.KNEC_DATA = {
    KCSE_SUBJECTS, KJSEA_PAPERS, KPSEA_PAPERS, COLLEGE_PAPERS, ALL_PAPERS
  };

  const downloadIcon = '<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

  // ===== Payment modal =====
  const TILL = "0734002689";
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
            <li>Confirm. Access is sent within minutes.</li>
          </ol>
          <button class="btn btn-block" id="pay-confirm">I have paid</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
    const backdrop = document.getElementById("pay-modal");
    backdrop.addEventListener("click", () => closeModal());
    document.getElementById("pay-confirm").addEventListener("click", closeModal);
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
    btn.className = "btn btn-block " + (cls === "kuccps" ? "btn-kuccps" : cls === "stream" ? "btn-stream" : "btn-knec");
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
      const label = s.replace(/^(KJSEA|KPSEA) 2025 /, "");
      return `<button class="paper-chip" data-name="${name.replace(/"/g, "&quot;")}">${label}${downloadIcon}</button>`;
    }).join("");
    el.querySelectorAll(".paper-chip").forEach((b) => {
      b.addEventListener("click", () => openModal(b.getAttribute("data-name"), { theme: "knec" }));
    });
  }

  function initIndexPage() {
    if (!document.getElementById("kcse-grid")) return;
    renderChips("kcse-grid", KCSE_SUBJECTS, s => "KCSE 2025 — " + s);
    renderChips("kjsea-grid", KJSEA_PAPERS, s => s);
    renderChips("kpsea-grid", KPSEA_PAPERS, s => s);
    renderChips("college-grid", COLLEGE_PAPERS, s => "College 2025 — " + s);

    const input = document.getElementById("paper-search");
    const out = document.getElementById("search-results");
    if (!input || !out) return;
    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) { out.innerHTML = ""; out.style.display = "none"; return; }
      const matches = ALL_PAPERS.filter(p =>
        (p.label + " " + p.name + " " + p.group).toLowerCase().includes(q.toLowerCase())
      ).slice(0, 12);
      out.style.display = "block";
      if (matches.length > 0) {
        out.innerHTML =
          `<div class="heading">${matches.length} match${matches.length === 1 ? "" : "es"}</div>` +
          matches.map(m => `
            <button class="result-row" data-name="${m.name.replace(/"/g, "&quot;")}">
              <span><span class="badge">${m.group}</span><span style="font-weight:500">${m.label}</span></span>
              ${downloadIcon}
            </button>`).join("");
        out.querySelectorAll(".result-row").forEach(b => {
          b.addEventListener("click", () => openModal(b.getAttribute("data-name"), { theme: "knec" }));
        });
      } else if (q.length > 1) {
        out.innerHTML = `
          <button class="no-result-card" id="request-paper">
            <span class="no-result-icon">📄</span>
            <span class="no-result-body">
              <div class="no-result-title">Can't find "${escapeHtml(q)}"?</div>
              <div class="no-result-desc">Click here to request this paper. Pay to unlock — we'll source it and email you the PDF within 24 hours.</div>
            </span>
            <span class="no-result-cta">Request →</span>
          </button>`;
        document.getElementById("request-paper").addEventListener("click", () => {
          openModal('Request paper: "' + q + '"', { theme: "knec" });
        });
      } else {
        out.innerHTML = ""; out.style.display = "none";
      }
    });
  }

  // ===== KUCCPS page =====
  function initKuccpsPage() {
    const sel = document.getElementById("tool-select");
    if (!sel) return;
    const finder = document.getElementById("tool-finder");
    const results = document.getElementById("tool-results");
    sel.addEventListener("change", () => {
      const v = sel.value;
      finder.style.display = v === "finder" ? "block" : "none";
      results.style.display = v === "results" ? "block" : "none";
    });
    const btn = document.getElementById("courses-btn");
    if (btn) btn.addEventListener("click", () => openModal("KUCCPS Course Finder access", { theme: "kuccps", amount: 300 }));

    const form = document.getElementById("placement-form");
    const msg = document.getElementById("placement-msg");
    const msgBody = document.getElementById("placement-msg-body");
    if (form) {
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
  }

  // ===== App / KnecStream page =====
  function initAppPage() {
    document.querySelectorAll("[data-stream-pay]").forEach(b => {
      b.addEventListener("click", () => openModal("KnecStream app access", { theme: "stream", amount: 300 }));
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIndexPage();
    initKuccpsPage();
    initAppPage();
  });
})();
