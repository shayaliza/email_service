# Email Sending Service

### Prerequisites

- Node.js
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

### Install dependencies:

```
pnpm install
```

### Development

To start the development server and watch for changes:

```
pnpm run watch
```

```
pnpm tsc
```

```
pnpm run dev
```

It should run on localhost:3000

- Go to psotman

```
http://localhost:3000/send-email
```

- Post Request - Raw Data Json

```
{
  "idempotencyKey": "unique-key",
  "to": "recipient@example.com",
  "subject": "Subject",
  "body": "Email body"
}
```

- Success Response

```
{
    "message": "Email sent successfully"
}
```
