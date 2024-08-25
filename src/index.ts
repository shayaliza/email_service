// src/index.ts

import  express from 'express';
import { sendEmail } from './controllers/emailController.js';

const app = express();
app.use(express.json());

app.post('/send-email', sendEmail);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
