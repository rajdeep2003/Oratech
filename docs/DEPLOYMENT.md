# Deployment Guide

## Prerequisites

- Node.js 16+
- npm/yarn
- Expo CLI (for mobile)
- Git

## Mobile App Deployment (Expo + Vercel)

### 1. Build with EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS project
eas build:configure

# Build for production
eas build --platform ios
eas build --platform android
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from mobile directory
cd apps/mobile
vercel --prod
```

### Environment Variables
- Set in Expo Dashboard and Vercel Dashboard
- `EXPO_PUBLIC_API_URL`: Production API URL
- `EXPO_PUBLIC_ENVIRONMENT`: "production"

## Backend Deployment

### Option 1: Google Cloud Run

```bash
# Create app.yaml
cat > app.yaml << EOF
runtime: nodejs18
env: standard

env_variables:
  NODE_ENV: "production"
  PORT: "3000"
EOF

# Deploy
gcloud app deploy

# View logs
gcloud app logs read -f
```

### Option 2: AWS EC2

```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance

# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name "ora-api"
pm2 startup
pm2 save
```

### Environment Variables
Create `.env.production` with production values:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://...
JWT_SECRET=...
```

## Monitoring

### Logging
- Use structured logging in production
- Log level: info or error

### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "environment": "production"
}
```

### Error Tracking
- Integrate Sentry or similar for error tracking
- Monitor API response times
- Set up alerts for errors

## Database

### MongoDB Atlas

```javascript
// Connection string
mongodb+srv://username:password@cluster.mongodb.net/db-name
```

### Backups
- Enable automated backups
- Test restore process regularly

## CI/CD

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run test
      # Deploy steps...
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set security headers (Helmet)
- [ ] Enable CORS for allowed origins only
- [ ] Use environment variables for secrets
- [ ] Enable database authentication
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Keep dependencies updated

