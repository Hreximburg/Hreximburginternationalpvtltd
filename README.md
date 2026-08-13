# Eximburg International — Digital Job Application Form

A section-wise (multi-step) job application form for Eximburg International Pvt. Ltd.
Candidates fill it on their phone or laptop; every submission is captured automatically —
no backend or database needed.

**Live sections:** Applying For → Personal → Family → Financial → Education → Work
Experience → Location & Travel → Future Plans → Miscellaneous → Declaration.

---

## 1. Put this on GitHub

1. Go to [github.com](https://github.com) and log in (create a free account if you don't have one).
2. Click the **+** icon top-right → **New repository**.
3. Name it something like `eximburg-application-form` → set to **Public** or **Private**, both work → **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Drag in all the files from this folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `thank-you.html`
   - `netlify.toml`
   - `README.md`
6. Scroll down → **Commit changes**.

---

## 2. Deploy on Netlify (free)

1. Go to [netlify.com](https://www.netlify.com) and log in (you can sign up using your GitHub account — easiest option).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub**, then select the `eximburg-application-form` repository.
4. Build settings — leave everything as-is (there is nothing to build, it's already plain HTML). Click **Deploy site**.
5. In about 30 seconds, Netlify gives you a live link like `https://eximburg-hiring.netlify.app`. Share this link with candidates, or on WorkIndia/Naukri/Facebook job posts.
6. (Optional) Under **Site settings → Domain management**, you can rename the free subdomain (e.g. `eximburg-careers.netlify.app`) or connect a real domain like `careers.eximburg.com` if you own one.

**Important:** Netlify auto-detects the `data-netlify="true"` attribute on the form during deploy and turns on **Netlify Forms** for you — no extra setup needed.

---

## 3. Where do the applications go?

1. In your Netlify dashboard, open the site → **Forms** tab.
2. You'll see a form called **eximburg-application** — every submission (including the uploaded resume file) appears here as a row, and can be exported to CSV/Excel any time (**Forms → eximburg-application → Export**).
3. To get an email every time someone applies:
   - **Forms → Settings and usage → Form notifications → Add notification → Email notification**.
   - Enter `hr.eximburg@gmail.com` (or any inbox you want) → Save.
4. To stop spam bots: this form already has a hidden honeypot field built in, so no extra setup is needed.

> Netlify's free plan includes 100 form submissions/month. If you expect more applicants than that, upgrade to Netlify's Pro plan or ask me to wire this form to Google Sheets or an Excel-based flow instead.

---

## 4. Editing the form later

Everything lives in plain files, so any of these edits are quick:

- **Add/remove a job role** in the dropdown → open `index.html`, find `id="postApplied"`, add or remove an `<option>` line.
- **Change colors** → open `style.css`, top of file under `:root`, edit `--navy` and `--orange`.
- **Add a new question** → copy an existing `<div class="field">...</div>` block inside the relevant `<fieldset class="step" data-step="...">` section and change the label/name.
- **Add more repeatable rows** (e.g. a 5th family member) → duplicate one of the hidden `.repeat-row` blocks in the Family/Work Experience/References sections, bump the number in every `name="..."` attribute, and add a matching hidden row.

After editing, just commit the change on GitHub (or drag the updated file back into the repo) — Netlify automatically redeploys the site within a minute.

---

## 5. What candidates see

- A clean, mobile-first, section-by-section form (like a wizard) — one topic per screen, with a progress bar so they know how much is left.
- An auto-generated **Application No.** (e.g. `APP-7F3KQ92X`) shown at the top and again on the confirmation screen, matching your existing application-tracking format.
- A confirmation screen after submitting — no page reload, no confusion about whether it went through.
- Resume upload is optional, so candidates without a soft copy can still apply.

---

## Files in this folder

| File | Purpose |
|---|---|
| `index.html` | The entire form, all 10 sections |
| `style.css` | Eximburg brand styling (navy `#092327` / orange `#F0821F`) |
| `script.js` | Step navigation, add-row buttons, submit handling |
| `thank-you.html` | Fallback confirmation page |
| `netlify.toml` | Netlify deploy settings |
