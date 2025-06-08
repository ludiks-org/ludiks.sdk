# Ludiks SDK

Le SDK JavaScript officiel de [Ludiks](https://ludiks.io) — une solution simple pour intégrer de la gamification dans votre produit sans complexité technique.

## 🚀 Installation

```bash
npm install ludiks-sdk
# ou
yarn add ludiks-sdk
````

## 🔧 Utilisation

```ts
import { Ludiks } from 'ludiks-sdk';

// Initialisation
const sdk = Ludiks.create({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'Jane Doe',
    email: 'jane@example.com',
    metadata: { plan: 'pro' }
  }
});

// Tracking d'un événement
sdk.trackEvent({
  eventName: 'onboarding_completed',
  value: 1
});
```

## 📦 Méthodes

### `Ludiks.create(options: InitOptions): Ludiks`

Crée une instance SDK avec les informations de l'utilisateur et le `apiKey` de votre projet.

### `sdk.trackEvent(options: TrackEventOptions): Promise<void>`

Envoie un événement de progression (nom, valeur, timestamp).

## 💡 Cas d’usage

* Suivre la progression de vos utilisateurs dans des parcours (onboarding, activation…)
* Alimenter des parcours gamifiés sans modifier l'architecture produit
* Construire une stratégie de rétention avec des analytics exploitables

## ⚙️ Paramètres facultatifs

Vous pouvez surcharger l’`apiUrl` pour l’environnement de développement :

```ts
Ludiks.create({
  apiKey: 'clé',
  baseUrl: 'http://localhost:3001',
  user: {
    id: 'abc',
    full_name: 'Alice'
  }
})
```

🧪 Compatible avec les environnements modernes (Next.js, React, Vue, etc.)