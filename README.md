# ImmoTrainer

Application d'entraînement à l'estimation immobilière. L'utilisateur doit deviner le prix de 5 biens immobiliers et accumule un score selon la précision de ses estimations.

---

## Architecture

```
immotrainer/
├── docker-compose.yml
├── backend/          # API REST Symfony 7
│   ├── src/
│   │   ├── Controller/   # Endpoints API
│   │   ├── Entity/       # Entité Doctrine
│   │   ├── Repository/   # Requêtes base de données
│   │   └── DataFixtures/ # Données de test
│   └── migrations/       # Migrations Doctrine
└── frontend/         # App React 18 + TypeScript
    └── src/
        ├── App.tsx         # Logique du jeu
        └── components/     # MapView, GuessForm, ResultPanel, FinalScreen
```

### Flux de données

```
Browser → Vite (proxy /api) → Symfony PHP → MySQL
```

Le frontend ne communique jamais directement avec la base de données. Toute la logique métier (scoring, prix réel) reste côté backend.

---

## Stack technique

### Backend
- **PHP 8.3** + **Symfony 7** (skeleton)
- **Doctrine ORM** — entité `Listing`, migrations
- **MySQL 8** — base de données
- **API REST JSON** — 2 endpoints

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **React-Bootstrap 5** — composants UI (Navbar, Card, Badge, Carousel, Button, InputGroup…)
- **Leaflet** — carte interactive avec marker
- `useState` / `useEffect` uniquement, pas de librairie de state management
- `fetch` natif, pas de React Query

### Infrastructure
- **Docker Compose** — 3 services : `backend`, `frontend`, `mysql`
- Serveur PHP built-in pour le développement
- Vite dev server avec proxy vers le backend

---

## Lancer le projet

```bash
# Démarrer tous les services
docker compose up

# Charger les données (première fois)
docker compose run --rm backend php bin/console doctrine:fixtures:load
# 96 vraies annonces de Hyères et Toulon (scrapées depuis Bien'ici)
```

- Frontend : http://localhost:5173
- Backend API : http://localhost:8000

---

## API

### `GET /api/listings/random?count=5`

Retourne N annonces aléatoires **sans le prix**.

```json
[
  {
    "id": 1,
    "title": "Appartement 75m²",
    "city": "Hyères",
    "lat": 43.12,
    "lng": 6.13,
    "surfaceM2": 75,
    "rooms": 3,
    "imageUrl": "https://...",
    "photos": ["https://photo1.jpg", "https://photo2.jpg"],
    "description": "Magnifique appartement..."
  }
]
```

### `POST /api/guess`

```json
// Body
{ "listingId": 1, "guessPrice": 450000 }

// Réponse
{ "actualPrice": 480000, "deltaPercent": 6.25, "score": 937 }
```

**Formule de scoring :**
```
delta        = abs(estimation - prix_réel) / prix_réel
deltaPercent = delta * 100
score        = max(0, 1000 * (1 - delta))
```

---

## Choix techniques

**Pas de JWT ni d'authentification** — l'application est publique par nature, aucune donnée sensible.

**Serveur PHP built-in** — suffisant pour le développement, évite une couche Nginx inutile à ce stade.

**Fetch natif** — React Query ou Axios auraient été surdimensionnés pour 2 appels API.

**useState/useEffect uniquement** — pas besoin de Redux ou Zustand pour un état aussi simple.

**Leaflet** — solution légère et open source pour l'affichage de cartes, sans clé API contrairement à Google Maps.

---

## Données

Les annonces proviennent d'un scraping de **Bien'ici** (via reverse-engineering de leur API interne) sur les villes de **Hyères** et **Toulon**. Les photos sont hébergées directement sur les serveurs des agences immobilières (Capifrance, IAD, etc.).

---

## Axes d'amélioration

- **Refresh automatique des données** — relancer le scraping périodiquement pour garder les annonces fraîches
- **Nouvelles villes** — étendre le jeu à d'autres marchés immobiliers
- **Mode daily** — une partie par jour avec les mêmes annonces pour tous
- **Leaderboard** — classement des meilleurs scores
- **Authentification** — pour sauvegarder l'historique des parties
- **Nginx** — remplacer le serveur PHP built-in pour la production
- **Tests** — PHPUnit côté backend, Vitest côté frontend
