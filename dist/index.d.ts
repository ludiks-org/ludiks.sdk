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
};
export type CircuitProgression = {
    id: string;
    name: string;
    type: string;
    points: number;
    status: 'not_started' | 'in_progress' | 'completed';
    startDate: string | null;
    completedAt: string | null;
    stepProgressions: Array<StepProgression>;
};
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
};
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
};
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
export declare class Ludiks {
    private static defaultBaseUrl;
    private static globalApiKey;
    private static globalBaseUrl;
    /**
     * Configure global API key and base URL for all SDK calls
     * @param apiKey Your Ludiks API key
     * @param baseUrl Optional custom base URL (defaults to https://api.ludiks.io)
     */
    static configure(apiKey: string, baseUrl?: string): void;
    /**
     * Get the current global configuration
     */
    private static getConfig;
    static initUser(options: InitUserOptions): Promise<void>;
    static initUser(user: User): Promise<void>;
    static trackEvent(options: TrackEventOptions): Promise<TrackEventResponse>;
    static trackEvent(userId: string, eventName: string, value?: number, timestamp?: Date): Promise<TrackEventResponse>;
    static getProfile(options: GetProfileOptions): Promise<LudiksProfile>;
    static getProfile(userId: string): Promise<LudiksProfile>;
}
