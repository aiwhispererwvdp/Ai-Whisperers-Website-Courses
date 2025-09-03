# Staging Environment Configuration for AI-Whisperers

environment = "staging"
aws_region  = "us-east-1"
domain_name = "staging.ai-whisperers.com"

# Staging-specific settings
enable_deletion_protection = false
enable_backup_lifecycle    = true
cloudfront_price_class     = "PriceClass_100"

# Staging resource sizing (production-like but smaller)
lambda_memory_size = 256
lambda_timeout     = 60

# Staging environment tags
tags = {
  Environment = "staging"
  Project     = "AI-Whisperers"
  ManagedBy   = "Terraform"
  Owner       = "DevOps Team"
  CostCenter  = "Testing"
}