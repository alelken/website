// Global type declarations

declare global {
  interface Window {
    __INITIAL_STATE__?: {
      currentPage: string;
      routeParams: Record<string, any>;
    };
    testRedirects?: () => void;
    simulateCrawlbot?: () => void;
  }
}

export {};