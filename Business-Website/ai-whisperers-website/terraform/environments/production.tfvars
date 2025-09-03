# Production Environment Configuration for AI-Whisperers

environment = "production"
aws_region  = "us-east-1"
domain_name = "ai-whisperers.com"

# Production-specific settings
enable_deletion_protection = true
enable_backup_lifecycle    = true
cloudfront_price_class     = "PriceClass_All"

# Production resource sizing (optimized for performance)
lambda_memory_size = 512
lambda_timeout     = 180

# Production environment tags
tags = {
  Environment = "production"
  Project     = "AI-Whisperers"
  ManagedBy   = "Terraform"
  Owner       = "Platform Team"
  CostCenter  = "Production"
  BackupPolicy = "Daily"
  MonitoringLevel = "Critical"
}