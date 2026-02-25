# Vercel pe deploy kaise karein

## 1. GitHub se connect
- Vercel.com → Add New → Project
- GitHub repo **mohitkumar7895/weeding** select karein
- Import karein

## 2. Build & Output (Settings)
Project open karke **Settings** → **General** → **Build & Development Settings**:

| Setting | Value |
|--------|--------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` (ya khali chhod dein – auto) |
| **Output Directory** | `dist` (ya khali chhod dein – auto) |
| **Install Command** | `npm install` (default) |

## 3. Node version (agar 126 aaye)
- **Settings** → **General** → **Node.js Version** → **24.x** select karein  
  ya  
- **Environment Variables** me add karein:  
  `NODE_VERSION` = `24`

## 4. Deploy
- **Deployments** → latest deployment pe **Redeploy**  
  ya  
- Naya commit push karein, auto deploy chalega

## Agar ab bhi fail ho
Build log me **exact error** (red line) copy karke bhejein.
