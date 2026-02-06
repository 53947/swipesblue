# FOOTER BRAND SIGNATURE FIX

## File: `client/src/components/Footer.tsx`

## Problem
All platform TLD colors show green (#10B981). Should follow wrap-around rule where TLD matches first word color.

## Find and Replace

### 1. TriadBlue TLD (line ~175)
**FIND:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
```
(the one right after "triadblue")

**REPLACE WITH:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#1844A6", fontSize: "12px" }}>.com</span>
```

### 2. SwipesBlue TLD (line ~188)
**FIND:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
```
(the one right after "swipesblue")

**REPLACE WITH:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#374151", fontSize: "12px" }}>.com</span>
```

### 3. HostsBlue TLD (line ~202)
**FIND:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
```
(the one right after "hostsblue")

**REPLACE WITH:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#008060", fontSize: "12px" }}>.com</span>
```

### 4. BusinessBlueprint TLD (line ~216)
**FIND:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.io</span>
```
(the one right after "businessblueprint")

**REPLACE WITH:**
```tsx
<span className="font-archivo font-bold lowercase" style={{ color: "#F97316", fontSize: "12px" }}>.io</span>
```

---

## Summary of Correct Colors

| Platform | First Word | "blue"/"blueprint" | TLD |
|----------|-----------|-------------------|-----|
| triadblue.com | #1844A6 | #1844A6 | #1844A6 |
| swipesblue.com | #374151 | #0000FF | #374151 |
| hostsblue.com | #008060 | #0000FF | #008060 |
| businessblueprint.io | #F97316 | #0000FF | #F97316 |

Note: BusinessBlueprint orange in code is #F97316 (close to #FF6B00). Keep consistent with what's already there.
