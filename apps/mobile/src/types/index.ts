// Re-export all types from shared package
export * from '@shared/types';

// Add mobile-specific types here
export interface MobileAppState {
  isLoading: boolean;
  error: string | null;
}
