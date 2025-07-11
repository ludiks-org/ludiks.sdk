export interface User {
  id: string;
  full_name: string;
  email?: string;
  picture?: string;
  metadata?: Record<string, any>;
}

export interface InitUserOptions {
  apiKey: string;
  user: User;
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
        full_name: options.user.full_name,
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
          user_id: options.userId,
          event_name: options.eventName,
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
}
