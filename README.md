# Ludiks SDK

The official JavaScript SDK for [Ludiks](https://ludiks.io) — a simple solution to integrate gamification into your product without technical complexity.

## 🚀 Installation

```bash
npm install @ludiks/sdk
# or
yarn add @ludiks/sdk
```

## 🔧 Usage

```ts
import { Ludiks, TrackEventResponse } from '@ludiks/sdk';

// Initialize or update a user
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'Jane Doe',
    email: 'jane@example.com', // optional
    picture: 'https://avatar-url.com', // optional
    metadata: { plan: 'pro' } // optional
  }
});

// Track an event
const response: TrackEventResponse = await Ludiks.trackEvent({
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'onboarding_completed',
  value: 1
});

// Check the response
if (response.success) {
  console.log('Points earned:', response.points);
  console.log('Step completed:', response.stepCompleted);
  console.log('Circuit completed:', response.circuitCompleted);
  console.log('Rewards:', response.rewards);
}
```

## 📦 Methods

### `Ludiks.initUser(options: InitUserOptions): Promise<void>`

Creates or updates a user in your Ludiks project.

```ts
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'Jane Doe',
    email: 'jane@example.com'
  },
  baseUrl: 'https://api.ludiks.io' // optional, defaults to production
});
```

### `Ludiks.trackEvent(options: TrackEventOptions): Promise<TrackEventResponse>`

Tracks a progression event for a specific user and returns detailed response data.

```ts
const response = await Ludiks.trackEvent({
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'level_completed',
  value: 5,
  timestamp: new Date(), // optional
  baseUrl: 'https://api.ludiks.io' // optional, defaults to production
});

// Response structure:
// {
//   success: boolean,
//   updated: boolean,
//   message?: string,
//   stepCompleted: boolean,
//   circuitCompleted: boolean,
//   alreadyCompleted: boolean,
//   points?: number,
//   rewards: Array<{ name: string }>
// }
```

## 🎯 Framework Examples

### React Hook Example
```tsx
import { Ludiks, TrackEventResponse } from '@ludiks/sdk';

const useLudiks = (apiKey: string) => {
  const initUser = async (user: User) => {
    await Ludiks.initUser({ apiKey, user });
  };

  const trackEvent = async (
    userId: string, 
    eventName: string, 
    value?: number
  ): Promise<TrackEventResponse> => {
    return await Ludiks.trackEvent({ apiKey, userId, eventName, value });
  };

  return { initUser, trackEvent };
};
```

### Vue Composition Example
```ts
import { Ludiks, TrackEventResponse } from '@ludiks/sdk';

export const useLudiks = (apiKey: string) => {
  const initUser = async (user: User) => {
    await Ludiks.initUser({ apiKey, user });
  };

  const trackEvent = async (
    userId: string, 
    eventName: string, 
    value?: number
  ): Promise<TrackEventResponse> => {
    return await Ludiks.trackEvent({ apiKey, userId, eventName, value });
  };

  return { initUser, trackEvent };
};
```

## 📋 Response Types

### `TrackEventResponse`
```ts
interface TrackEventResponse {
  success: boolean;           // Whether the operation was successful
  updated: boolean;           // Whether the progression was updated
  message?: string;           // Optional error or info message
  stepCompleted: boolean;     // Whether a step was completed
  circuitCompleted: boolean;  // Whether the entire circuit was completed
  alreadyCompleted: boolean;  // Whether the circuit was already completed
  points?: number;           // Current total points (if applicable)
  rewards: Array<{           // Rewards earned from this event
    name: string;
  }>;
}
```

🧪 Compatible with modern environments (Next.js, React, Vue, etc.)