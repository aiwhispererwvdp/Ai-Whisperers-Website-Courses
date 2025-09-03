# AI-Whisperers AWS Infrastructure

This directory contains the Terraform configuration for the AWS infrastructure supporting the AI-Whisperers website.

## Overview

The infrastructure includes:

- **S3 Buckets**: Static asset storage and backups
- **CloudFront**: CDN for global content delivery
- **SES**: Email services for course notifications
- **Lambda**: Serverless functions for enrollment and payment processing
- **IAM**: Security roles and policies

## Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Vercel        │    │  CloudFront  │    │   S3 Buckets    │
│  (Primary App)  │────│   (CDN)      │────│  (Assets)       │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Services                             │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Lambda    │  │     SES      │  │    Route 53     │   │
│  │ Functions   │  │   (Email)    │  │    (DNS)        │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
   ```bash
   aws configure
   ```

2. **Terraform** installed (>= 1.0)
   ```bash
   # macOS
   brew install terraform
   
   # Windows
   choco install terraform
   
   # Linux
   curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
   sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
   sudo apt-get update && sudo apt-get install terraform
   ```

3. **AWS Permissions** - Your AWS account needs the following permissions:
   - S3: Full access for bucket management
   - CloudFront: Full access for CDN management
   - SES: Full access for email services
   - Lambda: Full access for function management
   - IAM: Role and policy management
   - ACM: Certificate management (production only)
   - Route 53: DNS management (production only)

## Quick Start

### 1. Initialize Infrastructure

```bash
# Development environment
./deploy.sh development init

# Staging environment
./deploy.sh staging init

# Production environment
./deploy.sh production init
```

### 2. Plan Deployment

```bash
# See what will be created
./deploy.sh development plan
./deploy.sh staging plan
./deploy.sh production plan
```

### 3. Deploy Infrastructure

```bash
# Deploy to development
./deploy.sh development apply

# Deploy to staging
./deploy.sh staging apply

# Deploy to production
./deploy.sh production apply
```

## Environment Configuration

### Development (`environments/development.tfvars`)
- **Domain**: `dev.ai-whisperers.com`
- **Cost Optimization**: Smaller resources, no deletion protection
- **Features**: Basic S3, CloudFront, minimal Lambda resources

### Staging (`environments/staging.tfvars`)
- **Domain**: `staging.ai-whisperers.com` 
- **Production-like**: Similar to production but smaller scale
- **Features**: Full feature set for testing

### Production (`environments/production.tfvars`)
- **Domain**: `ai-whisperers.com`
- **High Availability**: Full redundancy and backup
- **Features**: All services with production optimization

## Manual Configuration Steps

After deploying the infrastructure, you'll need to complete these manual steps:

### 1. Domain Configuration (Production Only)

1. **Route 53 Hosted Zone**: 
   - Update your domain registrar to use Route 53 name servers
   - The hosted zone will be created automatically

2. **SSL Certificate**:
   - ACM certificate will be created automatically
   - Verify the domain ownership through DNS validation

### 2. SES Email Setup (Production Only)

1. **Domain Verification**:
   ```bash
   # Get the verification TXT record
   terraform output ses_verification_token
   
   # Add the TXT record to your domain's DNS
   ```

2. **DKIM Setup**:
   ```bash
   # Get DKIM tokens
   terraform output ses_dkim_tokens
   
   # Add CNAME records for DKIM verification
   ```

3. **Move out of SES Sandbox**:
   - Request production access through AWS Console
   - Required for sending emails to non-verified addresses

### 3. Environment Variables

Add these to your `.env.local` and Vercel environment variables:

```bash
# S3 Configuration
AWS_S3_BUCKET=ai-whisperers-assets-production
AWS_REGION=us-east-1

# CloudFront CDN
AWS_CLOUDFRONT_DOMAIN=d1234567890.cloudfront.net

# SES Email
SES_REGION=us-east-1

# Lambda Functions
ENROLLMENT_PROCESSOR_ARN=arn:aws:lambda:us-east-1:...
PAYMENT_PROCESSOR_ARN=arn:aws:lambda:us-east-1:...
```

## Usage Examples

### Deploy Development Environment
```bash
# Full deployment workflow
./deploy.sh development init
./deploy.sh development plan
./deploy.sh development apply
```

### Update Staging Environment
```bash
# Update existing infrastructure
./deploy.sh staging plan
./deploy.sh staging apply
```

### Production Deployment
```bash
# Production requires extra confirmation
./deploy.sh production plan
./deploy.sh production apply
```

### View Infrastructure Outputs
```bash
./deploy.sh production output
```

## Infrastructure Components

### S3 Buckets

1. **Assets Bucket** (`ai-whisperers-assets-{env}`)
   - Stores course materials, images, videos
   - Public read access with referrer restrictions
   - CORS enabled for web access
   - Versioning enabled

2. **Backups Bucket** (`ai-whisperers-backups-{env}`)
   - Private bucket for backups
   - Lifecycle policies for cost optimization
   - Encryption at rest

### CloudFront Distribution

- **Global CDN** for fast asset delivery
- **Custom caching rules** optimized for course content
- **Compression enabled** for better performance
- **Security headers** for protection

### Lambda Functions

1. **Enrollment Processor**
   - Processes course enrollments
   - Sends welcome emails via SES
   - Integrates with course platform

2. **Payment Webhook Processor**
   - Handles PayPal/Stripe webhooks
   - Validates payments
   - Triggers enrollment process

### SES Email Service

- **Transactional emails** for course enrollment
- **Domain verification** for better deliverability
- **DKIM authentication** for email security
- **Bounce and complaint handling**

## Cost Optimization

### Development Environment
- Estimated monthly cost: **$5-15**
- Minimal resources and data transfer

### Staging Environment  
- Estimated monthly cost: **$10-30**
- Production-like testing with moderate usage

### Production Environment
- Estimated monthly cost: **$25-100**
- Depends on traffic and storage usage

### Cost Optimization Features
- **S3 Intelligent Tiering**: Automatic cost optimization
- **CloudFront PriceClass_100**: Use only cost-effective edge locations
- **Lambda ARM64**: Better price/performance ratio
- **Lifecycle policies**: Automatic cleanup of old data

## Monitoring and Alerts

### CloudWatch Metrics
- S3 request metrics and errors
- CloudFront cache hit ratios
- Lambda function performance
- SES email metrics

### Recommended Alerts
- High error rates (> 5%)
- Unusual traffic patterns
- Cost threshold breaches
- Failed email deliveries

## Security Best Practices

### S3 Security
- **Bucket policies** restrict access by referrer
- **Public access blocks** prevent accidental exposure
- **Encryption at rest** with AES-256
- **Access logging** for audit trail

### CloudFront Security
- **Origin Access Identity** restricts S3 access
- **HTTPS only** enforcement
- **Security headers** for XSS protection
- **WAF integration** (optional, additional cost)

### Lambda Security
- **Least privilege IAM roles**
- **Environment variable encryption**
- **VPC configuration** if needed
- **Function-level permissions**

### SES Security
- **Domain authentication** (SPF, DKIM, DMARC)
- **Bounce and complaint monitoring**
- **Reputation tracking**
- **Email content filtering**

## Troubleshooting

### Common Issues

1. **Terraform State Lock**:
   ```bash
   # Force unlock if stuck
   terraform force-unlock LOCK_ID
   ```

2. **AWS Credentials**:
   ```bash
   # Verify credentials
   aws sts get-caller-identity
   
   # Configure if needed
   aws configure
   ```

3. **S3 Bucket Already Exists**:
   - Bucket names are globally unique
   - Modify the bucket name in tfvars file

4. **Certificate Validation**:
   - Ensure DNS records are added for ACM validation
   - Can take up to 30 minutes to validate

5. **SES Sandbox Limitations**:
   - Can only send to verified email addresses
   - Request production access through AWS Console

### Debugging Commands

```bash
# Check terraform state
terraform show

# Import existing resources
terraform import aws_s3_bucket.assets ai-whisperers-assets

# Refresh state
terraform refresh -var-file="environments/production.tfvars"

# Enable detailed logging
export TF_LOG=DEBUG
./deploy.sh production plan
```

## Cleanup

### Destroy Development Environment
```bash
./deploy.sh development destroy
```

### Destroy Staging Environment
```bash
./deploy.sh staging destroy
```

### Destroy Production Environment
```bash
# Requires confirmation
./deploy.sh production destroy
```

## Support

For questions or issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review AWS CloudWatch logs
3. Contact the development team
4. Create an issue in the project repository

## Contributing

When making changes to the infrastructure:

1. Test in development environment first
2. Review changes in staging
3. Get approval before applying to production
4. Document any manual configuration steps
5. Update cost estimates if adding new resources