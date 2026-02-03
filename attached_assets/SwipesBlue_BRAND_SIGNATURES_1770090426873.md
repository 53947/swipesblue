# SwipesBlue Brand Signatures Guide

## CRITICAL RULE

**Platform names are NEVER typed in regular font.** Every time a platform name appears anywhere on any site, it MUST use the brand signature format:

**Logo + Styled Company Name**

This applies to:
- Footer "Platforms" column
- Dashboard sidebars
- Any cross-references between sites
- Headers, navigation, anywhere the name appears

---

## The Four Platforms

### 1. SwipesBlue
**Logo:** SwipesBlue icon (credit card with blue swoosh)
**Text format:** `swipes` (gray #09080E) + `blue` (blue #1844A6)
**Full signature:** [SwipesBlue Icon] swipesblue
**URL:** swipesblue.com

### 2. HostsBlue
**Logo:** HostsBlue icon (browser window with globe and blue swoosh)
**Text format:** `hosts` (teal-green #008060) + `blue` (blue #1844A6)
**Full signature:** [HostsBlue Icon] hostsblue
**URL:** hostsblue.com

⚠️ **COLOR CHANGE:** HostsBlue is NO LONGER purple. The "hosts" portion is now **Teal-Green #008060**

### 3. BusinessBlueprint
**Logo:** BusinessBlueprint icon (lightbulb with grid/blueprint and blue swoosh)
**Text format:** `business` (orange #FF6B00) + `blueprint` (blue #1844A6)
**Full signature:** [BusinessBlueprint Icon] businessblueprint
**URL:** businessblueprint.io

### 4. TriadBlue
**Logo:** TriadBlue icon (red triangle with blue swoosh) — **Logo goes BETWEEN the two words**
**Text format:** `Triad` (blue #1844A6) + [LOGO] + `Blue` (blue #1844A6)
**Full signature:** Triad[TriadBlue Icon]Blue
**URL:** triadblue.com

⚠️ **SPECIAL:** TriadBlue is the ONLY platform where the logo goes between the words, not before them.

---

## Color Reference

| Platform | First Word Color | Second Word Color |
|----------|------------------|-------------------|
| swipesblue | #09080E (dark gray) | #1844A6 (blue) |
| hostsblue | #008060 (teal-green) | #1844A6 (blue) |
| businessblueprint | #FF6B00 (orange) | #1844A6 (blue) |
| TriadBlue | #1844A6 (blue) | #1844A6 (blue) |

---

## CSS Implementation

```css
/* SwipesBlue signature */
.brand-swipesblue .brand-first { color: #09080E; }
.brand-swipesblue .brand-second { color: #1844A6; }

/* HostsBlue signature */
.brand-hostsblue .brand-first { color: #008060; }
.brand-hostsblue .brand-second { color: #1844A6; }

/* BusinessBlueprint signature */
.brand-businessblueprint .brand-first { color: #FF6B00; }
.brand-businessblueprint .brand-second { color: #1844A6; }

/* TriadBlue signature */
.brand-triadblue .brand-first { color: #1844A6; }
.brand-triadblue .brand-second { color: #1844A6; }
```

---

## HTML Implementation Examples

### SwipesBlue (logo before name)
```html
<a href="https://swipesblue.com" class="brand-signature brand-swipesblue">
  <img src="/images/logos/swipesblue-icon.png" alt="" class="brand-icon" />
  <span class="brand-first">swipes</span><span class="brand-second">blue</span>.com
</a>
```

### HostsBlue (logo before name)
```html
<a href="https://hostsblue.com" class="brand-signature brand-hostsblue">
  <img src="/images/logos/hostsblue-icon.png" alt="" class="brand-icon" />
  <span class="brand-first">hosts</span><span class="brand-second">blue</span>.com
</a>
```

### BusinessBlueprint (logo before name)
```html
<a href="https://businessblueprint.io" class="brand-signature brand-businessblueprint">
  <img src="/images/logos/businessblueprint-icon.png" alt="" class="brand-icon" />
  <span class="brand-first">business</span><span class="brand-second">blueprint</span>.io
</a>
```

### TriadBlue (logo BETWEEN words)
```html
<a href="https://triadblue.com" class="brand-signature brand-triadblue">
  <span class="brand-first">Triad</span>
  <img src="/images/logos/triadblue-icon.png" alt="" class="brand-icon-inline" />
  <span class="brand-second">Blue</span>.com
</a>
```

---

## Footer "Platforms" Column (Exact Format)

```
Platforms
─────────────────────────
[TriadBlue Icon between] Triad[icon]Blue.com ↗
[SwipesBlue Icon] swipesblue.com ↗
[HostsBlue Icon] hostsblue.com ↗
[BusinessBlueprint Icon] businessblueprint.io ↗
```

Each line includes:
1. The platform icon
2. The styled company name (two-tone text)
3. The TLD (.com or .io)
4. External link indicator (↗)

---

## Logo Files Required

The builder needs these logo files (transparent PNG):

| File | Description |
|------|-------------|
| `swipesblue-icon.png` | Credit card with blue swoosh |
| `hostsblue-icon.png` | Browser/globe with blue swoosh |
| `businessblueprint-icon.png` | Lightbulb with blueprint grid and blue swoosh |
| `triadblue-icon.png` | Red triangle with blue swoosh |

All logos are on transparent/black backgrounds and should be used at approximately 20-24px height in navigation/footer contexts.

---

## WRONG vs RIGHT Examples

### ❌ WRONG (plain text)
```
triadblue.com
swipesblue.com
hostsblue.com
businessblueprint.io
```

### ❌ WRONG (styled text but no logo)
```
swipesblue.com
hostsblue.com
```

### ❌ WRONG (TriadBlue logo in wrong position)
```
[icon] TriadBlue.com
```

### ✅ CORRECT
```
[icon] swipesblue.com (logo before, two-tone text)
[icon] hostsblue.com (logo before, two-tone text with NEW teal-green)
[icon] businessblueprint.io (logo before, two-tone text)
Triad[icon]Blue.com (logo BETWEEN words)
```

---

## Summary

1. **NEVER** type platform names in plain font
2. **ALWAYS** use logo + styled two-tone text
3. **HostsBlue** color changed from purple to **#008060 teal-green**
4. **TriadBlue** logo goes **BETWEEN** the words, not before
5. These are "brand signatures" — treat them as sacred
