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
import { Ludiks, TrackEventResponse, Profile } from '@ludiks/sdk';

// Initialize or update a user
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    fullName: 'Jane Doe',
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

// Get user profile with all progressions
const profile: Profile = await Ludiks.getProfile({
  apiKey: 'your-api-key',
  userId: 'user-123'
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

Creates or updates a user in your Ludiks project. This method also calculates the user's login streak, so it should be called whenever the user logs in to your application.

```ts
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    fullName: 'Jane Doe',
    email: 'jane@example.com'
  },
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

### `Ludiks.getProfile(options: GetProfileOptions): Promise<Profile>`

Retrieves a complete user profile including all circuit progressions, even for circuits not yet started.

```ts
const profile = await Ludiks.getProfile({
  apiKey: 'your-api-key',
  userId: 'user-123',
});

// Profile structure:
// {
//   id: string,
//   fullName: string,
//   email?: string,
//   picture?: string,
//   metadata: Record<string, any>,
//   progressions: Array<CircuitProgression>,
//   rewards: Array<UserReward>,
//   currentStreak: number,
//   longestStreak: number,
//   createdAt: string,
//   lastLogin: string
// }
```

## 🎯 Framework Examples

### React Hook Example
```tsx
import { Ludiks, TrackEventResponse, Profile } from '@ludiks/sdk';

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

  const getProfile = async (userId: string): Promise<Profile> => {
    return await Ludiks.getProfile({ apiKey, userId });
  };

  return { initUser, trackEvent, getProfile };
};
```

### Vue Composition Example
```ts
import { Ludiks, TrackEventResponse, Profile } from '@ludiks/sdk';

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

  const getProfile = async (userId: string): Promise<Profile> => {
    return await Ludiks.getProfile({ apiKey, userId });
  };

  return { initUser, trackEvent, getProfile };
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

### `Profile`
```ts
interface LudiksProfile {
  id: string;                                    // User ID
  fullName: string;                             // User's full name
  email?: string;                               // User's email (optional)
  picture?: string;                             // User's profile picture (optional)
  metadata: Record<string, any>;                // User metadata
  progressions: Array<CircuitProgression>;      // All circuit progressions
  rewards: Array<UserReward>;                   // All obtained rewards
  currentStreak: number;                        // Current login streak
  longestStreak: number;                        // Longest login streak achieved
  createdAt: string;                            // User account creation date
  lastLogin: string;                            // Last login date
}
```

### `UserReward`
```ts
interface UserReward {
  id: string;                                   // Reward ID
  name: string;                                 // Reward name
  description: string;                          // Reward description
  obtainedAt: string;                          // When the reward was obtained
  stepId?: string;                             // Associated step ID (if step-specific)
  stepName?: string;                           // Associated step name (if step-specific)
  circuitId: string;                           // Associated circuit ID
  circuitName: string;                         // Associated circuit name
  unlockOnCircuitCompletion: boolean;          // Whether unlocked on circuit completion
}
```

### `CircuitProgression`
```ts
interface CircuitProgression {
  id: string;                                   // Circuit ID
  name: string;                                 // Circuit name
  points: number;                               // Points earned in this circuit
  type: string;                                 // "actions" | "objective" | "points" type of circuit
  status: 'not_started' | 'in_progress' | 'completed';
  startDate: string | null;                     // When the circuit was started
  completedAt: string | null;                   // When the circuit was completed
  stepProgressions: Array<StepProgression>;     // All step progressions
}
```

### `StepProgression`
```ts
interface StepProgression {
  id: string;                                   // Step ID
  name: string;                                 // Step name
  points: number;                               // Points earned for this step
  status: string;                               // Step status
  completedAt: string | null;                   // When the step was completed
  completionThreshold: number;                  // Points/actions needed to complete
}
```

🧪 Compatible with modern environments (Next.js, React, Vue, etc.)