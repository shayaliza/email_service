// src/services/rateLimiterService.ts

export class RateLimiterService {
    private requestsInLastMinute: number[] = [];
    private rateLimit = 10; // max 10 emails per minute
  
    public allowRequest(): boolean {
      const now = Date.now();
      this.requestsInLastMinute = this.requestsInLastMinute.filter(
        (timestamp) => now - timestamp < 60000
      );
  
      if (this.requestsInLastMinute.length >= this.rateLimit) {
        return false;
      }
  
      this.requestsInLastMinute.push(now);
      return true;
    }
  }
  