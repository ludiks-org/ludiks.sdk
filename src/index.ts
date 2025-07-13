export interface User {
  id: string;
  fullName: string;
  email?: string;
  picture?: string;
  metadata?: Record<string, any>;
}

export type StepProgression = {
  id: string;
  name: string;
  points: number;
  status: string;
  completedAt: string | null;
  completionThreshold: number;
}

export type CircuitProgression = {
  id: string;
  name: string;
  type: string;
  points: number;
  status: 'not_started' | 'in_progress' | 'completed';
  startDate: string | null;
  completedAt: string | null;
  stepProgressions: Array<StepProgression>;
}

export type UserReward = {
  id: string;
  name: string;
  description: string;
  obtainedAt: string;
  stepId?: string;
  stepName?: string;
  circuitId: string;
  circuitName: string;
  unlockOnCircuitCompletion?: boolean;
}

export type LudiksProfile = {
  id: string;
  fullName: string;
  email?: string;
  picture?: string;
  metadata: Record<string, any>;
  progressions: Array<CircuitProgression>;
  rewards: Array<UserReward>;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  lastLogin: string;
}

export interface InitUserOptions {
  apiKey: string;
  user: User;
  baseUrl?: string;
}

export interface GetProfileOptions {
  apiKey: string;
  userId: string;
  baseUrl?: string;
}

export interface TrackEventOptions {
  apiKey: string;
  userId: string;
  eventName: string;
  value?: number;
  timestamp?: Date;
  baseUrl?: string;
}

export interface TrackEventResponse {
  success: boolean;
  updated: boolean;
  message?: string;
  stepCompleted: boolean;
  circuitCompleted: boolean;
  alreadyCompleted: boolean;
  points?: number;
  rewards: Array<{
    name: string;
  }>;
}

export class Ludiks {
  private static defaultBaseUrl = 'https://api.ludiks.io';

  static async initUser(options: InitUserOptions): Promise<void> {
    const baseUrl = options.baseUrl ?? this.defaultBaseUrl;

    const res = await fetch(`${baseUrl}/api/end-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`,
      },
      body: JSON.stringify({
        id: options.user.id,
        fullName: options.user.fullName,
        email: options.user.email,
        picture: options.user.picture,
        metadata: options.user.metadata,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to init user: ${res.status}`);
    }
  }

  static async trackEvent(options: TrackEventOptions): Promise<TrackEventResponse> {
    const baseUrl = options.baseUrl ?? this.defaultBaseUrl;

    try {
      const res = await fetch(`${baseUrl}/api/tracking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${options.apiKey}`,
        },
        body: JSON.stringify({
          userId: options.userId,
          eventName: options.eventName,
          value: options.value,
          timestamp: options.timestamp,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to track event: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error('Ludiks trackEvent error:', err);
      throw err;
    }
  }

  static async getProfile(options: GetProfileOptions): Promise<LudiksProfile> {
    const baseUrl = options.baseUrl ?? this.defaultBaseUrl;

    const res = await fetch(`${baseUrl}/api/end-user/${options.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get profile: ${res.status}`);
    }

    return await res.json();
  }
}
