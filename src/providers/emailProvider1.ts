// src/providers/emailProvider1.ts

export class EmailProvider1 {
    async sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean }> {
      if (Math.random() < 0.5) {
        throw new Error('EmailProvider1 failed');
      }
      console.log('Email sent by Provider 1');
      return { success: true };
    }
  }
  