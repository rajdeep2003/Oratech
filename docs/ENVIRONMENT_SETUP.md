# Backend Environment Setup Guide

## Local Development

1. Copy `.env.example` to `.env.local`
2. Update values with your local configuration
3. Never commit `.env.local` to version control

### Required Environment Variables

- `NODE_ENV`: Set to 'development' for local development
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens (min 32 characters)

### Optional Services

- Email service (SMTP configuration)
- Cloud services (Google Cloud, AWS)

## Production Deployment

### Vercel (for Mobile)
- Set environment variables in Vercel dashboard
- Use EAS Build for native builds

### Google Cloud / AWS EC2 (for Backend)
- Set environment variables in deployment platform
- Use health check endpoint: `/api/health`
