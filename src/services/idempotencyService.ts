// src/services/idempotencyService.ts

export class IdempotencyService {
    private sentEmails = new Set<string>();
  
    public isDuplicate(idempotencyKey: string): boolean {
      return this.sentEmails.has(idempotencyKey);
    }
  
    public markSent(idempotencyKey: string): void {
      this.sentEmails.add(idempotencyKey);
    }
  }
  