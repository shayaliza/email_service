// src/utils/exponentialBackoff.ts

export async function exponentialBackoff(attempt: number): Promise<void> {
    const delay = Math.pow(2, attempt) * 100; // Exponential backoff with jitter
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
  