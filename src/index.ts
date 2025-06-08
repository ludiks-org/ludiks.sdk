interface SetupOptions {
    apiKey: string;
    user: {
        id: string;
        full_name: string;
        email?: string;
        picture?: string;
        metadata?: Record<string, any>;
    };
    baseUrl?: string;
  }
  
  interface TrackEventOptions {
    eventName: string;
    value?: number;
    timestamp?: Date;
  }
  
  class Ludiks {
    private apiKey: string = '';
    private user: SetupOptions['user'] = {
        id: '',
        full_name: '',
        email: '',
        picture: '',
        metadata: {},
    };
    private baseUrl: string = 'https://api.ludiks.io';
  
    static async setup(options: SetupOptions): Promise<Ludiks> {
        const baseUrl = options.baseUrl ?? 'https://api.ludiks.io';
    
        const res = await fetch(`${baseUrl}/end-user`, {
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
    
        const ludiks = new Ludiks();

        ludiks.user = options.user;
        ludiks.baseUrl = baseUrl;
        ludiks.apiKey = options.apiKey;

        return ludiks;
      }
  
    async trackEvent(options: TrackEventOptions): Promise<void> {
      try {
        const res = await fetch(`${this.baseUrl}/tracking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            userId: this.user.id,
            eventName: options.eventName,
            value: options.value,
            timestamp: options.timestamp,
          }),
        });
  
        if (!res.ok) {
          throw new Error(`Failed to track event: ${res.status}`);
        }
      } catch (err) {
        console.error('Ludiks trackEvent error:', err);
      }
    }
  }
  
  export { Ludiks, SetupOptions, TrackEventOptions };
  