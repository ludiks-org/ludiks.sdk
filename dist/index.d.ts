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
export declare class Ludiks {
    private static defaultBaseUrl;
    static initUser(options: InitUserOptions): Promise<void>;
    static trackEvent(options: TrackEventOptions): Promise<TrackEventResponse>;
}
