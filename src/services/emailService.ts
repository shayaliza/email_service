// src/services/emailService.ts

import { EmailProvider1 } from '../providers/emailProvider1.js';
import { EmailProvider2 } from '../providers/emailProvider2.js';
import { exponentialBackoff } from '../utils/exponentialBackoff.js';
import { IdempotencyService } from './idempotencyService.js';
import { RateLimiterService } from './rateLimiterService.js';

export class EmailService {
  private providers = [new EmailProvider1(), new EmailProvider2()];
  private currentProviderIndex = 0;
  private retryLimit = 3;
  private idempotencyService = new IdempotencyService();
  private rateLimiterService = new RateLimiterService();

  private switchProvider(): void {
    this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    console.log(`Switched to provider ${this.currentProviderIndex + 1}`);
  }

  public async sendEmail(idempotencyKey: string, to: string, subject: string, body: string): Promise<void> {
    // Idempotency check
    if (this.idempotencyService.isDuplicate(idempotencyKey)) {
      console.log('Duplicate email send attempt, ignoring.');
      throw new Error('Duplicate email send attempt'); 
    }

    // Rate limiting
    if (!this.rateLimiterService.allowRequest()) {
      throw new Error('Rate limit exceeded');
    }

    let attempt = 0;
    let success = false;
    while (attempt < this.retryLimit && !success) {
      try {
        await this.providers[this.currentProviderIndex].sendEmail(to, subject, body);
        success = true;
        this.idempotencyService.markSent(idempotencyKey);
        console.log('Email sent successfully');
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
        } else {
          console.error(`Attempt ${attempt + 1} failed: An unknown error occurred`);
        }
        attempt++;
        await exponentialBackoff(attempt);
        
        if (attempt === this.retryLimit) {
          this.switchProvider();
          attempt = 0;
        }
      }
    }

    if (!success) {
      throw new Error('Failed to send email after all retries');
    }
  }
}
