# Development Environment Configuration for AI-Whisperers

environment = "development"
aws_region  = "us-east-1"
domain_name = "dev.ai-whisperers.com"

# Development-specific settings
enable_deletion_protection = false
enable_backup_lifecycle    = false
cloudfront_price_class     = "PriceClass_100"

# Development resource sizing (smaller/cheaper)
lambda_memory_size = 128
lambda_timeout     = 30

# Development environment tags
tags = {
  Environment = "development"
  Project     = "AI-Whisperers"
  ManagedBy   = "Terraform"
  Owner       = "Development Team"
  CostCenter  = "Development"
}