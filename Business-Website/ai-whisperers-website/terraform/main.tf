# AI-Whisperers AWS Infrastructure Configuration
# Terraform configuration for AWS services supporting the Next.js application

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  # Backend configuration for state storage
  backend "s3" {
    bucket = "ai-whisperers-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}

# AWS Provider Configuration
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "AI-Whisperers"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "ai-whisperers.com"
}

# S3 Buckets for Static Assets
resource "aws_s3_bucket" "assets" {
  bucket = "ai-whisperers-assets-${var.environment}"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "assets" {
  bucket = aws_s3_bucket.assets.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.assets.arn}/*"
        Condition = {
          StringLike = {
            "aws:Referer" = [
              "https://${var.domain_name}/*",
              "https://*vercel.app/*",
              "https://localhost:3000/*"
            ]
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_cors_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = [
      "https://${var.domain_name}",
      "https://*vercel.app",
      "https://localhost:3000"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket for Backups (Private)
resource "aws_s3_bucket" "backups" {
  bucket = "ai-whisperers-backups-${var.environment}"
}

resource "aws_s3_bucket_public_access_block" "backups" {
  bucket = aws_s3_bucket.backups.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "backup_lifecycle"
    status = "Enabled"

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}

# CloudFront Distribution for Assets
resource "aws_cloudfront_distribution" "assets" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.assets.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.assets.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "AI-Whisperers ${var.environment} assets CDN"
  default_root_object = "index.html"

  aliases = var.environment == "production" ? ["assets.${var.domain_name}"] : []

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.assets.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    compress = true
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.environment != "production"
    
    dynamic "viewer_certificate" {
      for_each = var.environment == "production" ? [1] : []
      content {
        acm_certificate_arn = aws_acm_certificate.assets[0].arn
        ssl_support_method  = "sni-only"
      }
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "assets" {
  comment = "AI-Whisperers ${var.environment} assets OAI"
}

# ACM Certificate for CloudFront (only for production)
resource "aws_acm_certificate" "assets" {
  count           = var.environment == "production" ? 1 : 0
  domain_name     = "assets.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# SES Configuration for Email Services
resource "aws_ses_domain_identity" "main" {
  count  = var.environment == "production" ? 1 : 0
  domain = var.domain_name
}

resource "aws_ses_domain_dkim" "main" {
  count  = var.environment == "production" ? 1 : 0
  domain = aws_ses_domain_identity.main[0].domain
}

resource "aws_ses_email_identity" "support" {
  count = var.environment == "production" ? 1 : 0
  email = "support@${var.domain_name}"
}

resource "aws_ses_email_identity" "noreply" {
  count = var.environment == "production" ? 1 : 0
  email = "noreply@${var.domain_name}"
}

resource "aws_ses_email_identity" "courses" {
  count = var.environment == "production" ? 1 : 0
  email = "courses@${var.domain_name}"
}

# IAM Role for Lambda Functions
resource "aws_iam_role" "lambda_role" {
  name = "ai-whisperers-lambda-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "lambda_ses" {
  name = "lambda-ses-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

# Lambda Function for Course Enrollment Processing
resource "aws_lambda_function" "enrollment_processor" {
  filename         = "enrollment-processor.zip"
  function_name    = "ai-whisperers-enrollment-processor-${var.environment}"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  source_code_hash = data.archive_file.enrollment_processor.output_base64sha256
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      ENVIRONMENT = var.environment
      SES_REGION  = var.aws_region
      DOMAIN_NAME = var.domain_name
    }
  }
}

data "archive_file" "enrollment_processor" {
  type        = "zip"
  output_path = "enrollment-processor.zip"
  source {
    content = templatefile("${path.module}/lambda/enrollment-processor.js", {
      environment = var.environment
    })
    filename = "index.js"
  }
}

# Lambda Function for Payment Webhook Processing
resource "aws_lambda_function" "payment_processor" {
  filename         = "payment-processor.zip"
  function_name    = "ai-whisperers-payment-processor-${var.environment}"
  role            = aws_iam_role.lambda_role.arn
  handler         = "webhook.handler"
  source_code_hash = data.archive_file.payment_processor.output_base64sha256
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      ENVIRONMENT = var.environment
    }
  }
}

data "archive_file" "payment_processor" {
  type        = "zip"
  output_path = "payment-processor.zip"
  source {
    content = templatefile("${path.module}/lambda/payment-processor.js", {
      environment = var.environment
    })
    filename = "webhook.js"
  }
}

# Outputs
output "s3_assets_bucket" {
  description = "S3 bucket name for assets"
  value       = aws_s3_bucket.assets.bucket
}

output "s3_assets_domain" {
  description = "S3 bucket domain for assets"
  value       = aws_s3_bucket.assets.bucket_domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.assets.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.assets.domain_name
}

output "lambda_enrollment_processor_arn" {
  description = "ARN of the enrollment processor Lambda function"
  value       = aws_lambda_function.enrollment_processor.arn
}

output "lambda_payment_processor_arn" {
  description = "ARN of the payment processor Lambda function"
  value       = aws_lambda_function.payment_processor.arn
}