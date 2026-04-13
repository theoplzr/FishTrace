# FishTrace — Application de traçabilité pêche durable

> Projet scolaire · Bloc Innovation · FISA INFO A4 · CESI Nancy · 2025–2026  
> Groupe "L'eau" — MaréeForce

## Stack
- React 19 + Vite
- Tailwind CSS v3
- React Router v6
- Déploiement : Vercel (gratuit)

## Pages
| Route | Description |
|---|---|
| `/` | Landing page — présentation MaréeForce |
| `/scan` | Scanner un code-barre (caméra + démo) |
| `/resultat/:id` | Score A→F + analyse détaillée |
| `/alternatives/:id` | Alternatives durables (paywall freemium) |
| `/pecheur/:id` | Profil pêcheur artisanal certifié |
| `/abonnement` | Plans tarifaires + FAQ |

## Lancer en local
```bash
npm install
npm run dev
```

## Déployer sur Vercel
1. Push sur GitHub
2. Importer le repo sur vercel.com
3. Aucune configuration requise — le `vercel.json` gère le routing SPA

## Personas
- **Théo** — consommateur engagé, scanne ses poissons
- **Marco Ferreira** — pêcheur artisan à Douarnenez
- **Karl Brandt** — adversaire (lobbying industriel)

## Sources
- IFREMER, 2023
- CNPMEM, 2023
- FranceAgriMer, 2023
- Bloom Association, 2024
