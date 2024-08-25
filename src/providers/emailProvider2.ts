// src/providers/emailProvider2.ts

export class EmailProvider2 {
    async sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean }> {
      if (Math.random() < 0.5) {
        throw new Error('EmailProvider2 failed');
      }
      console.log('Email sent by Provider 2');
      return { success: true };
    }
  }
  