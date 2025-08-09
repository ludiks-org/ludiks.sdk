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
  private static globalApiKey: string | null = null;
  private static globalBaseUrl: string | null = null;

  /**
   * Configure global API key and base URL for all SDK calls
   * @param apiKey Your Ludiks API key
   * @param baseUrl Optional custom base URL (defaults to https://api.ludiks.io)
   */
  static configure(apiKey: string, baseUrl?: string): void {
    this.globalApiKey = apiKey;
    this.globalBaseUrl = baseUrl || this.defaultBaseUrl;
  }

  /**
   * Get the current global configuration
   */
  private static getConfig(): { apiKey: string; baseUrl: string } {
    if (!this.globalApiKey) {
      throw new Error('Ludiks SDK not configured. Please call Ludiks.configure() first.');
    }
    return {
      apiKey: this.globalApiKey,
      baseUrl: this.globalBaseUrl || this.defaultBaseUrl,
    };
  }

  static async initUser(options: InitUserOptions): Promise<void>;
  static async initUser(user: User): Promise<void>;
  static async initUser(optionsOrUser: InitUserOptions | User): Promise<void> {
    let apiKey: string;
    let baseUrl: string;
    let user: User;

    if ('apiKey' in optionsOrUser) {
      // Legacy format with all options
      apiKey = optionsOrUser.apiKey;
      baseUrl = optionsOrUser.baseUrl ?? this.defaultBaseUrl;
      user = optionsOrUser.user;
    } else {
      // New format using global config
      const config = this.getConfig();
      apiKey = config.apiKey;
      baseUrl = config.baseUrl;
      user = optionsOrUser;
    }

    const res = await fetch(`${baseUrl}/api/end-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        picture: user.picture,
        metadata: user.metadata,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to init user: ${res.status}`);
    }
  }

  static async trackEvent(options: TrackEventOptions): Promise<TrackEventResponse>;
  static async trackEvent(userId: string, eventName: string, value?: number, timestamp?: Date): Promise<TrackEventResponse>;
  static async trackEvent(
    optionsOrUserId: TrackEventOptions | string,
    eventName?: string,
    value?: number,
    timestamp?: Date
  ): Promise<TrackEventResponse> {
    let apiKey: string;
    let baseUrl: string;
    let userId: string;
    let finalEventName: string;
    let finalValue: number | undefined;
    let finalTimestamp: Date | undefined;

    if (typeof optionsOrUserId === 'string') {
      // New format using global config
      const config = this.getConfig();
      apiKey = config.apiKey;
      baseUrl = config.baseUrl;
      userId = optionsOrUserId;
      finalEventName = eventName!;
      finalValue = value;
      finalTimestamp = timestamp;
    } else {
      // Legacy format with all options
      apiKey = optionsOrUserId.apiKey;
      baseUrl = optionsOrUserId.baseUrl ?? this.defaultBaseUrl;
      userId = optionsOrUserId.userId;
      finalEventName = optionsOrUserId.eventName;
      finalValue = optionsOrUserId.value;
      finalTimestamp = optionsOrUserId.timestamp;
    }

    try {
      const res = await fetch(`${baseUrl}/api/tracking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          userId,
          eventName: finalEventName,
          value: finalValue,
          timestamp: finalTimestamp,
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

  static async getProfile(options: GetProfileOptions): Promise<LudiksProfile>;
  static async getProfile(userId: string): Promise<LudiksProfile>;
  static async getProfile(optionsOrUserId: GetProfileOptions | string): Promise<LudiksProfile> {
    let apiKey: string;
    let baseUrl: string;
    let userId: string;

    if (typeof optionsOrUserId === 'string') {
      // New format using global config
      const config = this.getConfig();
      apiKey = config.apiKey;
      baseUrl = config.baseUrl;
      userId = optionsOrUserId;
    } else {
      // Legacy format with all options
      apiKey = optionsOrUserId.apiKey;
      baseUrl = optionsOrUserId.baseUrl ?? this.defaultBaseUrl;
      userId = optionsOrUserId.userId;
    }

    const res = await fetch(`${baseUrl}/api/end-user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get profile: ${res.status}`);
    }

    return await res.json();
  }
}
