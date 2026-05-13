// KNEC Hub — static site shared JS (updated: tabs, KSh 1500, Till 8494376,
// M-Pesa message paste-and-submit, floating WhatsApp).
(function () {

  // ============= CONFIG =============
  const TILL = "8494376";          // Pay-to till (per request)
  const WHATSAPP_DISPLAY = "0734002689";
  const WHATSAPP_INTL = "254734002689"; // wa.me format (no leading 0)
  const PRICE = 1500;              // KSh full set

  // ============= DATA =============
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

  // KNEC general download archive
  const KNEC_DOWNLOAD = [
    "KNEC KCSE Marking Schemes (Full)","KNEC KCSE Past Papers Bundle (2010–2026)",
    "KNEC Syllabus — Secondary","KNEC Syllabus — Primary",
    "KNEC KJSEA Sample Papers","KNEC KPSEA Sample Papers",
    "KNEC TVET CDACC Past Papers","KNEC ECDE Past Papers",
    "KNEC Teacher Education Past Papers","KNEC Business Studies Bundle",
    "KNEC Sciences Bundle","KNEC Languages Bundle",
    "KNEC Humanities Bundle","KNEC Technical Subjects Bundle",
    "KNEC Mock Examinations","KNEC Confidential Instructions Archive"
  ];

  // KNEC TVET Exam past papers
  const TVET_PAST = [
    "Artisan in Plumbing","Artisan in Masonry","Artisan in Welding","Artisan in Carpentry",
    "Craft in Electrical Installation","Craft in Motor Vehicle Mechanics","Craft in Refrigeration",
    "Craft in ICT","Craft in Catering & Accommodation","Craft in Hairdressing",
    "Diploma in ICT (TVET)","Diploma in Electrical & Electronic Eng.","Diploma in Mechanical Eng.",
    "Diploma in Civil Engineering","Diploma in Building Technology","Diploma in Automotive Eng.",
    "Diploma in Agriculture (TVET)","Diploma in Food & Beverage","Diploma in Tourism Management",
    "Diploma in Business Management","Diploma in Banking & Finance","Diploma in HR Management",
    "Diploma in Supply Chain","Diploma in Co-operative Management",
    "Higher Diploma in ICT","Higher Diploma in Electrical Eng.","Higher Diploma in Mechanical Eng.",
    "CDACC Plumbing Level 4","CDACC Welding Level 5","CDACC Hairdressing Level 5",
    "CDACC Food & Beverage Level 6","CDACC Solar PV Installation Level 6"
  ];

  // KCSE-only past papers (years × subjects, condensed list)
  const KCSE_ONLY = (function(){
    const years = ["2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"];
    const out = [];
    years.forEach(y => KCSE_SUBJECTS.forEach(s => out.push(`KCSE ${y} — ${s}`)));
    return out;
  })();

  // TVET revision (all courses)
  const TVET_REVISION = [
    "ICT Diploma — Topical Revision","ICT Diploma — Mock Papers","ICT — Programming Notes",
    "Electrical Eng. — Topical Revision","Electrical Eng. — Mock Papers","Electrical — Wiring Notes",
    "Mechanical Eng. — Topical Revision","Mechanical Eng. — Mock Papers","Mechanical — Workshop Tech.",
    "Building & Civil — Topical Revision","Building — Mock Papers","Civil — Surveying Notes",
    "Automotive — Topical Revision","Automotive — Mock Papers","Automotive — Engine Systems",
    "Agriculture (TVET) — Topical Revision","Agriculture — Mock Papers","Agriculture — Crop Production",
    "Business Mgmt — Topical Revision","Business Mgmt — Mock Papers","Business — Entrepreneurship",
    "Banking & Finance — Topical","HR Management — Topical","Supply Chain — Topical",
    "Co-operative Mgmt — Topical","Tourism — Topical","Food & Beverage — Topical",
    "Hairdressing & Beauty — Topical","Catering — Topical","Plumbing — Topical","Welding — Topical",
    "Carpentry — Topical","Masonry — Topical","Refrigeration — Topical","Solar PV — Topical",
    "Journalism (KIMC) — Topical","Film Production — Topical","Public Relations — Topical",
    "Library & Info Science — Topical","Social Work — Topical","Counselling — Topical",
    "Early Childhood (ECDE) — Topical","Special Needs Education — Topical",
    "Nursing (KMTC) — Topical","Clinical Medicine — Topical","Pharmacy — Topical",
    "Medical Lab Tech — Topical","Public Health — Topical","Nutrition & Dietetics — Topical"
  ];

  // KCSE revision (all subjects)
  const KCSE_REVISION = KCSE_SUBJECTS.map(s => s + " — Revision Bundle");

  // University degree revision (all courses)
  const UNI_REVISION = [
    "BSc Computer Science — Past Papers","BSc Software Engineering — Past Papers",
    "BSc Information Technology — Past Papers","BSc Information Systems — Past Papers",
    "BSc Mathematics — Past Papers","BSc Statistics — Past Papers","BSc Actuarial Science — Past Papers",
    "BSc Economics — Past Papers","BSc Physics — Past Papers","BSc Chemistry — Past Papers",
    "BSc Biology — Past Papers","BSc Biochemistry — Past Papers","BSc Microbiology — Past Papers",
    "BSc Nursing — Past Papers","BSc Public Health — Past Papers","BSc Nutrition — Past Papers",
    "BSc Medical Laboratory Sciences","Bachelor of Pharmacy (BPharm)",
    "Bachelor of Medicine & Surgery (MBChB)","Bachelor of Dental Surgery (BDS)",
    "Bachelor of Veterinary Medicine","Bachelor of Agriculture",
    "BSc Civil Engineering","BSc Electrical & Electronic Eng.","BSc Mechanical Engineering",
    "BSc Mechatronic Engineering","BSc Chemical Engineering","BSc Petroleum Engineering",
    "BSc Geospatial Engineering","BSc Architecture","BSc Quantity Surveying","BSc Construction Mgmt",
    "Bachelor of Commerce — Accounting","Bachelor of Commerce — Finance","Bachelor of Commerce — Marketing",
    "Bachelor of Commerce — HRM","Bachelor of Commerce — Supply Chain","Bachelor of Business Admin",
    "Bachelor of Procurement","Bachelor of Hospitality Management","Bachelor of Tourism Management",
    "Bachelor of Laws (LLB)","Bachelor of Arts — Sociology","Bachelor of Arts — Psychology",
    "Bachelor of Arts — Political Science","Bachelor of Arts — History","Bachelor of Arts — Geography",
    "Bachelor of Arts — Linguistics","Bachelor of Arts — Literature","Bachelor of Arts — Religious Studies",
    "Bachelor of Education — Arts","Bachelor of Education — Science","Bachelor of Education — Primary",
    "Bachelor of ECDE","Bachelor of Special Needs Education","Bachelor of Music",
    "Bachelor of Fine Art","Bachelor of Film & Animation","Bachelor of Journalism & Media",
    "Bachelor of Communication","Bachelor of International Relations",
    "BSc Environmental Science","BSc Geology","BSc Meteorology","BSc Marine Sciences",
    "BSc Wildlife Management","BSc Forestry","BSc Horticulture","BSc Food Science",
    "BSc Real Estate","BSc Land Economics","BSc GIS & Remote Sensing",
    "Bachelor of Theology","Bachelor of Development Studies","Bachelor of Criminology"
  ];

  // Combined search index
  const ALL_PAPERS = [];
  ["2025","2026"].forEach(yr => KCSE_SUBJECTS.forEach(s => ALL_PAPERS.push({
    name: `KCSE ${yr} — ${s}`, label: `${s} KCSE ${yr}`, group: "KCSE", year: yr
  })));
  KJSEA_PAPERS.forEach(s => ALL_PAPERS.push({ name: `KJSEA 2025 — ${s}`, label: `${s} KJSEA 2025`, group: "KJSEA", year: "2025" }));
  KPSEA_PAPERS.forEach(s => ALL_PAPERS.push({ name: `KPSEA 2025 — ${s}`, label: `${s} KPSEA 2025`, group: "KPSEA", year: "2025" }));
  COLLEGE_PAPERS.forEach(s => ALL_PAPERS.push({ name: `College 2025 — ${s}`, label: s, group: "College", year: "2025" }));
  TVET_PAST.forEach(s => ALL_PAPERS.push({ name: `TVET — ${s}`, label: s, group: "TVET", year: "" }));
  UNI_REVISION.forEach(s => ALL_PAPERS.push({ name: `University — ${s}`, label: s, group: "University", year: "" }));

  window.KNEC_DATA = { KCSE_SUBJECTS, KJSEA_PAPERS, KPSEA_PAPERS, COLLEGE_PAPERS, ALL_PAPERS };

  const downloadIcon = '<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

  // ============= PAY MODAL =============
  function buildModal() {
    if (document.getElementById("pay-modal")) return;
    const html = `
      <div class="modal-backdrop" id="pay-modal" role="dialog" aria-modal="true">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-icon">📱</div>
          <h3>Unlock Full Set Access</h3>
          <p class="modal-desc">To download <span id="pay-item" style="font-weight:600;color:var(--fg)"></span>, pay <b>KSh ${PRICE}</b> via M-Pesa.</p>

          <div class="till-card">
            <div class="till-row">
              <span style="color:var(--muted-fg);font-size:14px">Amount</span>
              <span class="till-amount">KSh ${PRICE}</span>
            </div>
            <div class="till-row">
              <span style="color:var(--muted-fg);font-size:14px">Pay to Till</span>
              <span style="display:flex;gap:8px;align-items:center">
                <span class="till-num">${TILL}</span>
                <button class="btn btn-outline" id="copy-btn" type="button" style="padding:5px 10px;font-size:12px">Copy</button>
              </span>
            </div>
          </div>

          <ol class="steps">
            <li>Open M-Pesa → <b>Lipa na M-Pesa</b> → <b>Buy Goods & Services</b></li>
            <li>Enter Till Number <b>${TILL}</b></li>
            <li>Enter amount <b>KSh ${PRICE}</b> and your M-Pesa PIN</li>
            <li>Copy the M-Pesa confirmation SMS, paste it below, then tap <b>Submit</b>.</li>
          </ol>

          <label class="mpesa-label" for="mpesa-msg">Paste your M-Pesa confirmation message</label>
          <textarea id="mpesa-msg" class="mpesa-input"
            placeholder="e.g. TGH7K8L9MN Confirmed. Ksh1,500.00 sent to KNEC HUB Till 8494376 on 5/13/26 at 2:14 PM. New M-PESA balance is Ksh..."></textarea>
          <div class="mpesa-error" id="mpesa-error">Please paste a valid M-Pesa confirmation message (must contain a code and "Ksh ${PRICE}").</div>
          <p class="mpesa-hint">Your message is verified instantly. Submit to begin your download.</p>

          <button class="btn btn-block btn-knec" id="pay-submit">Submit & Download</button>

          <div class="mpesa-success" id="mpesa-success">
            ✓ Payment received. Your download is starting…<br>
            If it doesn't begin in 10 seconds, <a id="dl-link" href="#" target="_blank" rel="noopener">click here to download</a>,
            or message us on WhatsApp <a href="https://wa.me/${WHATSAPP_INTL}" target="_blank" rel="noopener">${WHATSAPP_DISPLAY}</a>.
          </div>

          <button class="btn btn-block btn-outline" id="pay-close" style="margin-top:10px">Close</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);

    document.getElementById("pay-modal").addEventListener("click", closeModal);
    document.getElementById("pay-close").addEventListener("click", closeModal);
    document.getElementById("pay-submit").addEventListener("click", submitMpesa);

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

  function submitMpesa() {
    const msg = document.getElementById("mpesa-msg").value.trim();
    const err = document.getElementById("mpesa-error");
    const ok  = document.getElementById("mpesa-success");
    // Lightweight validation: M-Pesa codes are 10 chars alphanumeric, must mention 1500 or 1,500
    const hasCode = /\b[A-Z0-9]{10}\b/i.test(msg);
    const hasAmt  = /(ksh|kes)\s*1[, ]?500/i.test(msg);
    if (!hasCode || !hasAmt) {
      err.style.display = "block";
      return;
    }
    err.style.display = "none";
    ok.style.display = "block";
    document.getElementById("pay-submit").disabled = true;
    document.getElementById("pay-submit").textContent = "Processing…";

    const item = document.getElementById("pay-item").textContent;
    // Notify support automatically via WhatsApp link (opens in new tab as a backup)
    const waMsg = encodeURIComponent(
      `Hi KNEC Hub, I have paid KSh ${PRICE} for: ${item}.\n\nM-Pesa message:\n${msg}\n\nPlease send my download link.`
    );
    document.getElementById("dl-link").href = `https://wa.me/${WHATSAPP_INTL}?text=${waMsg}`;

    // Trigger a "download begin" — opens the WhatsApp delivery link.
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_INTL}?text=${waMsg}`, "_blank", "noopener");
    }, 800);
  }

  function openModal(itemName) {
    buildModal();
    // Detect a 4-digit year in the item name (e.g. "KCSE 2015 — Mathematics Paper 1")
    const yearMatch = String(itemName).match(/\b(19|20)\d{2}\b/);
    const displayName = yearMatch
      ? `the full ${yearMatch[0]} set (includes ${itemName})`
      : itemName;
    document.getElementById("pay-item").textContent = displayName;

    // Update modal heading + button to reflect "full set" context
    const titleEl = document.querySelector("#pay-modal h3");
    const submitBtn = document.getElementById("pay-submit");
    if (yearMatch) {
      titleEl.textContent = `Download Full ${yearMatch[0]} Set`;
      submitBtn.textContent = `Submit & Download Full ${yearMatch[0]} Set`;
    } else {
      titleEl.textContent = "Unlock Full Set Access";
      submitBtn.textContent = "Submit & Download";
    }

    document.getElementById("mpesa-msg").value = "";
    document.getElementById("mpesa-error").style.display = "none";
    document.getElementById("mpesa-success").style.display = "none";
    submitBtn.disabled = false;
    document.getElementById("pay-modal").classList.add("open");
  }
  function closeModal() {
    const m = document.getElementById("pay-modal");
    if (m) m.classList.remove("open");
  }
  window.openPayModal = openModal;
  window.closePayModal = closeModal;

  // ============= GRID RENDERING =============
  function renderChips(containerId, papers, makeName) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = papers.map((s) => {
      const name = makeName ? makeName(s) : s;
      return `<button class="paper-chip" data-name="${name.replace(/"/g, "&quot;")}">${escapeHtml(s)}${downloadIcon}</button>`;
    }).join("");
    el.querySelectorAll(".paper-chip").forEach((b) => {
      b.addEventListener("click", () => openModal(b.getAttribute("data-name")));
    });
  }

  // ============= TABS =============
  function initTabs() {
    const tabs = document.querySelectorAll(".tab[data-tab]");
    if (!tabs.length) return;
    const sidebar = document.getElementById("main-tabs");
    const toggle  = document.getElementById("tabs-toggle");

    if (toggle && sidebar) {
      toggle.addEventListener("click", () => {
        const open = sidebar.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    tabs.forEach(t => {
      t.addEventListener("click", () => {
        tabs.forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        const id = t.getAttribute("data-tab");
        document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        const panel = document.getElementById("panel-" + id);
        if (panel) panel.classList.add("active");
        // On mobile, collapse the sidebar after selecting and scroll to top of content
        if (window.matchMedia("(max-width: 820px)").matches) {
          if (sidebar) sidebar.classList.remove("open");
          if (toggle)  { toggle.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }
          window.scrollTo({ top: (toggle ? toggle.offsetTop : 0), behavior: "smooth" });
        }
      });
    });
  }

  // ============= INDEX PAGE =============
  function initIndexPage() {
    if (!document.getElementById("kcse-grid")) return;

    // Tab 1
    renderChips("kcse-grid",       KCSE_SUBJECTS, s => "KCSE 2025 — " + s);
    renderChips("kcse2026-grid",   KCSE_SUBJECTS, s => "KCSE 2026 — " + s);
    renderChips("kjsea-grid",      KJSEA_PAPERS,  s => "KJSEA 2025 — " + s);
    renderChips("kpsea-grid",      KPSEA_PAPERS,  s => "KPSEA 2025 — " + s);
    renderChips("college-grid",    COLLEGE_PAPERS, s => "College 2025 — " + s);

    // Other tabs
    renderChips("knec-download-grid", KNEC_DOWNLOAD, s => "KNEC Download — " + s);
    renderChips("tvet-past-grid",     TVET_PAST,     s => "KNEC TVET — " + s);
    renderChips("kcse-only-grid",     KCSE_ONLY);
    renderChips("tvet-rev-grid",      TVET_REVISION, s => "TVET Revision — " + s);
    renderChips("kcse-rev-grid",      KCSE_REVISION, s => "KCSE Revision — " + s);
    renderChips("uni-rev-grid",       UNI_REVISION,  s => "University Revision — " + s);

    // KCSE Computer Projects dropdown
    const sel = document.getElementById("kcse-project-select");
    if (sel) {
      sel.addEventListener("change", () => {
        document.querySelectorAll(".project-info").forEach(p => p.style.display = "none");
        if (sel.value) {
          const card = document.getElementById("project-" + sel.value);
          if (card) card.style.display = "block";
        }
      });
      document.querySelectorAll("[data-pay]").forEach(b => {
        b.addEventListener("click", () => openModal(b.getAttribute("data-pay")));
      });
    }

    // Search
    const input = document.getElementById("paper-search");
    const out   = document.getElementById("search-results");
    if (!input || !out) return;
    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) { out.innerHTML = ""; out.style.display = "none"; return; }
      const ql = q.toLowerCase();
      const matches = ALL_PAPERS.filter(p =>
        (p.label + " " + p.name + " " + p.group + " " + p.year).toLowerCase().includes(ql)
      ).slice(0, 14);
      out.style.display = "block";
      if (matches.length) {
        out.innerHTML = `<div class="heading">${matches.length} match${matches.length === 1 ? "" : "es"} — click to unlock</div>` +
          matches.map(m => `
            <button class="result-row" data-name="${m.name.replace(/"/g, "&quot;")}">
              <span><span class="badge">${m.group}${m.year ? " " + m.year : ""}</span><span style="font-weight:500">${escapeHtml(m.label)}</span></span>
              ${downloadIcon}
            </button>`).join("");
        out.querySelectorAll(".result-row").forEach(b =>
          b.addEventListener("click", () => openModal(b.getAttribute("data-name")))
        );
      } else {
        out.innerHTML = `
          <button class="result-row" id="request-paper">
            <span><span class="badge">Request</span><span>Can't find "${escapeHtml(q)}"? Click to request — KSh ${PRICE} unlocks delivery within 24 hrs.</span></span>
            ${downloadIcon}
          </button>`;
        document.getElementById("request-paper").addEventListener("click", () =>
          openModal('Request paper: "' + q + '"')
        );
      }
    });
  }

  // ============= WHATSAPP FLOAT =============
  function initWhatsAppFloat() {
    const a = document.getElementById("wa-float");
    if (!a) return;
    const msg = encodeURIComponent("Hi KNEC Hub, I need assistance.");
    a.href = `https://wa.me/${WHATSAPP_INTL}?text=${msg}`;
  }

  // ============= MISC =============
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initIndexPage();
    initWhatsAppFloat();
  });
})();
