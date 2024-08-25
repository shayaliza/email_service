import { Request, Response } from 'express';
import { EmailService } from '../services/emailService.js';

const emailService = new EmailService();

export async function sendEmail(req: Request, res: Response): Promise<void> {
  const { idempotencyKey, to, subject, body } = req.body;

  try {
    await emailService.sendEmail(idempotencyKey, to, subject, body);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Duplicate email send attempt':
          res.status(409).send({ error: 'Duplicate email send attempt' });
          break;
        case 'Rate limit exceeded':
          res.status(429).send({ error: 'Rate limit exceeded' });
          break;
        case 'Failed to send email after all retries':
          res.status(500).send({ error: 'Failed to send email after all retries' });
          break;
        default:
          res.status(500).send({ error: 'An unknown error occurred' });
          break;
      }
    } else {
      res.status(500).send({ error: 'An unknown error occurred' });
    }
  }
}
