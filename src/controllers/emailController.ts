// src/controllers/emailController.ts

import { Request, Response } from 'express';
import { EmailService } from './../services/emailService.js';

const emailService = new EmailService();

export async function sendEmail(req: Request, res: Response): Promise<void> {
  const { idempotencyKey, to, subject, body } = req.body;

  try {
    await emailService.sendEmail(idempotencyKey, to, subject, body);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).send({ error: "An unknown error occurred" });
  }
}
