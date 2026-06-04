# FILL.md — Make a new client site in ~15 minutes

> **Theme variant: BARBERSHOP (dark / masculine).** This is the dark theme of the
> same template — condensed Oswald signage type, whiskey-amber accent, squared
> buttons, grain texture, B/W-ish photo treatment. Use this folder for
> barbershops / men's grooming. Use the **beauty-light** folder for salons,
> nails, lashes, etc. Everything below (the data.js system) is identical across
> both variants — only the look differs.

You only ever edit **one file**: `js/data.js`. Never touch the HTML/CSS/JS.
Open `js/data.js` in any text editor and replace the values. Below is exactly
which value comes from where on a **Google Maps business card**.

---

## 1. From the Google Maps listing → data.js

Open the client's Google Maps listing in a browser. Map each field:

| Google Maps card                         | Edit this in `data.js`                          |
|------------------------------------------|-------------------------------------------------|
| Business name (big title)                | `business.name`                                 |
| Category line ("Hair salon")             | `business.type`                                 |
| Star rating (e.g. **4.9**)               | `business.rating`                               |
| Review count (e.g. **(327)**)            | `business.reviewCount`                          |
| Phone number                             | `business.phone` **and** `business.phoneTel`    |
| Address                                  | `business.address`                              |
| Map pin coordinates                      | `business.lat` / `business.lng` (see below)     |
| "Hours" dropdown                         | `hours[]` (one line per day)                     |
| Services & prices (menu / website)       | `services[]`                                     |
| Reviews you want to feature              | `reviews[]`                                      |
| Photos                                   | `hero.image`, `gallery[]`, `team[].photo`        |

### Phone — two fields, why?
- `phone` = what visitors **see**: `"(415) 555-0148"`
- `phoneTel` = what the phone **dials**: digits only with country code: `"+14155550148"`
  (no spaces, dashes, or parentheses — this powers the tap-to-call links).

### Map pin (`lat` / `lng`)
1. Right-click the red pin on Google Maps → the first item is two numbers
   like `37.7599, -122.4214`. Click it to copy.
2. First number → `business.lat`, second → `business.lng`.
   (If you skip this, the map still works off the address — but coordinates are exact.)

---

## 2. Brand color — one value recolors the whole site

In `data.js`, the `theme` block:

```js
theme: {
  brand:     "#A85751",   // main color: buttons, links, prices, accents
  brandDark: "#7E3E3A",   // a few shades darker — used on hover
  accent:    "#C9A24B",   // small details: stars, sparkle
}
```

Pick the client's color for `brand`, then make `brandDark` a noticeably darker
version of it (drag the brightness down in any color picker). That's it — every
button, link, and highlight updates automatically.

**Quick palette ideas:**
- Barbershop: `brand:"#1f2a37"`, `brandDark:"#0f1620"`, `accent:"#c79a3e"`
- Nail salon: `brand:"#c45d7a"`, `brandDark:"#9c4760"`, `accent:"#e0b94d"`
- Lash/brow: `brand:"#7d5a4f"`, `brandDark:"#5c4038"`, `accent:"#caa24b"`
- Pet grooming: `brand:"#3a8a86"`, `brandDark:"#2a6663"`, `accent:"#e3a857"`

---

## 3. Services & prices

Each category is a group; each service is one line:

```js
services: [
  {
    category: "Hair",
    items: [
      { name: "Women's Cut & Style", price: "$75+", duration: "60 min",
        desc: "Consultation, cut, and a finish you can recreate at home." },
      // ...add as many as you like
    ],
  },
  // ...more categories
],
```

- `price` is free text — `"$75+"`, `"$120"`, `"From $40"` all work.
- `duration` and `desc` are optional (leave `""` to hide).
- The **Home page** shows the first 6 services automatically; the **Services page**
  shows everything, grouped by category.

---

## 4. Photos (swap the placeholders)

The template ships with elegant on-brand placeholder images in `/img` so it
looks great in a live demo **before** you have real photos. To use real photos:

1. Drop the client's photos into the `/img` folder.
2. Point `data.js` at them. You can keep the same filenames to skip editing:
   - Replace `img/hero.svg` → a wide photo (1600×1000+). Update `hero.image`.
   - Replace `img/gallery-1.svg … gallery-8.svg` → work photos. Update `gallery[]`.
   - Replace `img/team-1.svg … team-4.svg` → staff headshots. Update `team[].photo`.
3. JPG/PNG/WEBP all work — e.g. `hero.image: "img/hero.jpg"`.

**No team yet?** Set `team: []` and the Team page shows a tasteful
"your team here" placeholder instead of cards.

---

## 5. The booking / contact form (works with NO server)

Two ways it can deliver leads — set in `business`:

### Option A — Email app (default, zero setup)
Leave `formEndpoint: ""`. When a visitor submits, their email app opens with the
request pre-filled, addressed to `business.email`. Works everywhere, no account.

### Option B — Lead lands in your inbox automatically (recommended for clients)
1. Go to **https://formspree.io** → free account → **New form**.
2. Copy the form's endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `business.formEndpoint`.
4. Submit a test from the live site once to confirm/verify the address.

Now submissions are POSTed straight to Formspree, which emails the client. The
visitor just sees "Request sent!" — no redirect, no email app.

> Set `business.bookingLink` to a Vagaro/Booksy/Square URL if the client uses an
> external booking system — the "Book Now" buttons will point there instead.

---

## 6. Social links

In `business.social`, paste the client's profile URLs. **Delete or empty** any the
client doesn't have — only the ones with a value show up in the footer.

```js
social: { instagram:"https://instagram.com/theclient", facebook:"", tiktok:"", yelp:"" }
```

---

## 7. Final check before handoff

- [ ] Business name, type, phone (both fields), address, hours all correct
- [ ] Brand color set; site recolored
- [ ] Services & prices match the client's real menu
- [ ] 2–3 real reviews pasted in
- [ ] Real photos dropped in `/img` (or placeholders kept for the demo)
- [ ] Form delivery set (Formspree endpoint or email)
- [ ] Open `index.html` and click through Home → Services → Gallery → Team → Contact
- [ ] Open it on a **phone** — everything should look great

When it's ready, see **DEPLOY.md** to publish it.
