# Ludiks SDK

The official JavaScript SDK for [Ludiks](https://ludiks.io) — a simple solution to integrate gamification into your product without technical complexity.

## 🚀 Installation

```bash
npm install ludiks-sdk
# or
yarn add ludiks-sdk
````

## 🔧 Usage

```ts
import { Ludiks } from 'ludiks-sdk';

// Init
const sdk = Ludiks.setup({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'Jane Doe',
    email: 'jane@example.com', // optional
    picture: 'https://avatar-url.com', // optional
    metadata: { plan: 'pro' }
  }
});

// Track an event
sdk.trackEvent({
  eventName: 'onboarding_completed',
  value: 1
});
```

## 📦 Methods

### `Ludiks.setup(options: SetupOptions): Ludiks`

Creates an SDK instance with user information and your project `apiKey`.

### `sdk.trackEvent(options: TrackEventOptions): Promise<void>`

Sends a progression event (name, value, timestamp).

```ts
Ludiks.create({
  apiKey: 'key',
  baseUrl: 'http://localhost:3001',
  user: {
    id: 'abc',
    full_name: 'Alice'
  }
})
```

🧪 Compatible with modern environments (Next.js, React, Vue, etc.)