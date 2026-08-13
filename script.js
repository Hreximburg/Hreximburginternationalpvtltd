(function () {
  "use strict";

  var form = document.getElementById("applicationForm");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var totalSteps = steps.length;
  var currentStep = 1;

  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var submitBtn = document.getElementById("submitBtn");
  var stepPosition = document.getElementById("stepPosition");
  var routeFill = document.getElementById("routeFill");
  var routeStops = document.querySelectorAll("#routeStops li");
  var mobileStepLabel = document.getElementById("mobileStepLabel");
  var mobileBarFill = document.getElementById("mobileBarFill");

  var stepLabels = [
    "Applying For", "Personal", "Family", "Financial", "Education",
    "Experience", "Location", "Future Plans", "Misc.", "Declaration"
  ];

  /* ---------- Application ID ---------- */
  function generateAppId() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "";
    for (var i = 0; i < 8; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    return "APP-" + out;
  }
  var appId = generateAppId();
  document.getElementById("appIdDisplay").textContent = appId;
  document.getElementById("applicationIdField").value = appId;

  /* Default declaration date = today */
  var dEl = document.getElementById("declareDate");
  if (dEl) dEl.value = new Date().toISOString().slice(0, 10);

  /* ---------- "Other" post applied ---------- */
  var postApplied = document.getElementById("postApplied");
  var postOtherWrap = document.getElementById("postOtherWrap");
  postApplied.addEventListener("change", function () {
    postOtherWrap.style.display = this.value === "Other" ? "block" : "none";
  });

  /* ---------- Step rendering ---------- */
  function showStep(n) {
    steps.forEach(function (s) {
      s.style.display = (parseInt(s.dataset.step, 10) === n) ? "block" : "none";
    });

    prevBtn.disabled = n === 1;
    stepPosition.textContent = n + " / " + totalSteps;
    mobileStepLabel.textContent = "Step " + n + " of " + totalSteps + " — " + stepLabels[n - 1];

    var pct = ((n - 1) / (totalSteps - 1)) * 100;
    routeFill.style.width = pct + "%";
    mobileBarFill.style.width = (n / totalSteps) * 100 + "%";

    routeStops.forEach(function (li) {
      var s = parseInt(li.dataset.step, 10);
      li.classList.toggle("is-done", s < n);
      li.classList.toggle("is-active", s === n);
    });

    if (n === totalSteps) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline-block";
    } else {
      nextBtn.style.display = "inline-block";
      submitBtn.style.display = "none";
    }

    window.scrollTo({ top: form.offsetTop - 20, behavior: "smooth" });
  }

  function currentStepEl() {
    return steps[currentStep - 1];
  }

  function validateCurrentStep() {
    // Hidden fields (other steps) are excluded from constraint validation by the browser.
    var invalid = currentStepEl().querySelector(":invalid");
    if (invalid) {
      currentStepEl().reportValidity ? currentStepEl().reportValidity() : invalid.reportValidity();
      invalid.focus();
      return false;
    }
    return true;
  }

  nextBtn.addEventListener("click", function () {
    if (!validateCurrentStep()) return;
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  showStep(currentStep);

  /* ---------- Add-another-row buttons ---------- */
  document.querySelectorAll(".add-row-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var table = document.getElementById(btn.dataset.target);
      var hiddenRow = table.querySelector(".repeat-row[hidden]");
      if (hiddenRow) {
        hiddenRow.hidden = false;
      }
      if (!table.querySelector(".repeat-row[hidden]")) {
        btn.setAttribute("disabled", "disabled");
      }
    });
  });

  /* ---------- Submit via AJAX to Netlify ---------- */
  var successPanel = document.getElementById("successPanel");

  form.addEventListener("submit", function (e) {
    if (!validateCurrentStep()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    var formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData
    })
      .then(function () {
        document.getElementById("successAppId").textContent = appId;
        document.querySelector(".route").style.display = "none";
        document.querySelector(".mobile-progress").style.display = "none";
        form.style.display = "none";
        document.querySelector(".step-nav").style.display = "none";
        successPanel.hidden = false;
        successPanel.scrollIntoView({ behavior: "smooth" });
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Application";
        alert("Something went wrong sending your application. Please check your internet connection and try again.");
      });
  });
})();
