// test/emailService.test.ts

import { EmailService } from '../src/services/emailService';

describe('EmailService', () => {
  it('should send email successfully', async () => {
    const emailService = new EmailService();
    await emailService.sendEmail('unique-key', 'test@example.com', 'Test Subject', 'Test Body');
    // Add assertions to validate the behavior
  });

  it('should fail after retrying and switching providers', async () => {
    const emailService = new EmailService();
    jest.spyOn(emailService as any, 'providers').mockImplementation(() => [
      { sendEmail: jest.fn().mockRejectedValue(new Error('Always fails')) },
    ]);

    await expect(
      emailService.sendEmail('unique-key', 'test@example.com', 'Test Subject', 'Test Body')
    ).rejects.toThrow('Failed to send email after all retries');
  });

});
