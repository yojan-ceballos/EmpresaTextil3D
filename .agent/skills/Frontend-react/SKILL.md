---
name: frontend-react
description: Premium React frontend standards for a luxury editorial digital fashion platform with real-time 3D avatars.
---

# Frontend-React Skill (Luxury Editorial Edition)

This skill defines the frontend architecture, UI behavior, and real-time 3D visualization standards for a **high-end digital fashion showroom**, not a game and not a traditional e-commerce interface.

The experience must feel like a **luxury editorial magazine brought to life in real-time 3D**.

---

## CORE PHILOSOPHY

• Fashion realism over technology showcase  
• Editorial elegance over UI visibility  
• Cinematic motion over interactivity gimmicks  
• Avatar-first, interface-almost-invisible  

This platform is:
**“The operating system of digital fashion.”**

---

## TECH STACK

- **Framework**: React 18.x (secure, stable)
- **3D Engine**:  
  - Three.js via React Three Fiber **OR**  
  - Babylon.js (clean scene graph, PBR-first)
- **Styling**: TailwindCSS (used with restraint, no utility clutter)

🚫 Explicitly avoid React versions 19.0.0 – 19.2.2 (security constraint)

---

## 3D CANVAS & SCENE MANAGEMENT

### Canvas Strategy
- The 3D canvas is **persistent**.
- Never mount/unmount the canvas unnecessarily.
- The avatar scene lives at layout level, not per-route.
- UI changes must **never reset the avatar**.

### Asset Loading
- Use `React.Suspense` for async loading.
- GLB models with:
  - Draco compression (WASM)
  - Optimized textures (KTX2 / WebP if possible)
- Implement **LOD (Level of Detail)** for garments and accessories.

### Memory Discipline
- Dispose geometries, materials, and textures on unmount.
- Zero tolerance for WebGL memory leaks.

---

## AVATAR PRESENTATION (NON-NEGOTIABLE)

The avatar is the **dominant visual element**, like a model in a global luxury campaign.

• Full-body 3D avatar  
• Always perfectly centered  
• Neutral, confident runway pose  
• Subtle idle motion (breathing, micro posture shifts)  
• Soft diffused studio lighting  
• Natural soft floor shadow  
• Hyper-realistic skin & fabric materials  
• Visible textile quality: stitching, weave, drape, weight  

🚫 No fantasy  
🚫 No gaming glow  
🚫 No sci-fi aesthetics  

The avatar must feel **alive, editorial, wearable**.

---

## CAMERA & MOTION LANGUAGE

• No OrbitControls for the end user  
• Camera behavior is **editorial**, not technical  
• Soft micro-movements only  
• Smooth runway-style transitions when switching garments  
• Occasional looped cinematic fashion-film motion  

The camera observes — it never plays.

---

## GARMENT & LOOK SYSTEM

### Customization Structure (Editorial, Not Game-Like)

#### Body Zones
Hair, Head, Face, Eyes, Ears, Neck, Torso, Arms, Hands, Waist, Legs, Feet

#### Clothing
Tops, Bottoms, Dresses, Tailoring, Outerwear, Activewear, Streetwear, Formalwear, Casualwear, Seasonal Collections

#### Footwear
Sneakers, Boots, Heels, Sandals, Formal Shoes

#### Accessories
Bags, Belts, Scarves, Gloves, Jewelry, Watches, Eyewear, Headwear, Tech Wearables

#### Complete Looks (Key Feature)
Curated runway-style outfits:
Formal Looks, Street Looks, Minimal Looks, Avant-Garde, Sport Luxe, Seasonal Drops

This feels like selecting looks from a **designer runway**, not bundling products.

---

## UI & INTERFACE DESIGN LANGUAGE

Luxury editorial system inspired by fashion magazines and concept stores.

• Generous white space  
• Thin dividers & soft gray hairlines  
• Elegant grid system  
• Floating typography  
• No heavy panels  
• No boxed UI  
• No dashboards or HUD elements  

UI must **disappear emotionally**.

---

## COLOR & MATERIAL SYSTEM (UI)

• Soft whites  
• Warm light grays  
• Stone tones  
• Charcoal typography  
• Extremely subtle accents only when necessary  

🚫 No neon  
🚫 No saturated UI colors  
🚫 No techy gradients  

Everything feels calm, tactile, premium.

---

## TYPOGRAPHY

• Modern serif **or** refined minimalist sans-serif  
• Thin to regular weights  
• High letter spacing  
• Editorial hierarchy  
• Magazine-like composition  

Text must feel like a **global fashion publication**, not software.

---

## LIGHTING & RENDER STYLE

• Soft studio lighting  
• Diffused highlights  
• No harsh shadows  
• Natural color response  
• Neutral background (off-white / light gray gradient)  

Rendering should feel **commercially viable**, not experimental.

---

## PERFORMANCE STANDARDS

• Code splitting by route  
• Lazy loading UI modules  
• Stable 60 FPS target on mid-tier devices  
• GPU-friendly materials  
• Minimal draw calls  

Luxury must feel **effortless**, never heavy.

---

## FRONTEND SECURITY

• Avoid `dangerouslySetInnerHTML` unless strictly necessary  
• Tokens stored in memory or HttpOnly cookies  
• If LocalStorage is used, explicitly acknowledge XSS risks  

---

## FINAL EXPERIENCE GOAL

When a user opens the platform, the reaction should be:

> “This looks like the future of fashion retail.”

The avatar dominates.  
The motion feels cinematic.  
The interface disappears.  
Everything feels real, wearable, and refined.

This is not a configurator.  
This is a **luxury digital fashion showroom**.
