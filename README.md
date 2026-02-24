# Print Studio – Design Catalog

A modern, responsive Print Shop Design Catalog built with **React (Vite)**, **Tailwind CSS**, and **React Router**. Customers can browse design samples by category and order via WhatsApp.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Features

- **Home**: Hero, CTA, and 4 category cards (Visiting Card, Wedding Card, Shop Banner, Flex Printing).
- **Category pages**: Filterable gallery (All / Modern / Premium / Traditional), design cards with code and hover preview.
- **Design modal**: Large preview, paper type, size, and “Order on WhatsApp” with pre-filled design code.
- **UI**: Sticky navbar, scroll-to-top on route change, image loading state, smooth modal (scale + fade), hover zoom on cards.
- **Footer**: Shop name, phone, WhatsApp, address, © 2026.

## Config

- **WhatsApp number**: Edit `WHATSAPP_NUMBER` in `src/components/DesignModal.jsx` and `src/components/Footer.jsx` (replace `91XXXXXXXXXX`).
- **Design data**: Edit `src/data/designs.js` to add/change categories and designs (images use Unsplash URLs).

## Tech stack

- React 18, Vite 5, React Router 6, Tailwind CSS 3.
