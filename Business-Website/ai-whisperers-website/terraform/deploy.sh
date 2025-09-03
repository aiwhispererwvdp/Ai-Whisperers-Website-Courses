#!/bin/bash

# AI-Whisperers AWS Infrastructure Deployment Script
# Usage: ./deploy.sh [environment] [action]
# Examples:
#   ./deploy.sh development plan
#   ./deploy.sh production apply
#   ./deploy.sh staging destroy

set -e

# Configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_NAME="ai-whisperers"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [environment] [action]"
    echo ""
    echo "Environments:"
    echo "  development  - Development environment"
    echo "  staging      - Staging environment"
    echo "  production   - Production environment"
    echo ""
    echo "Actions:"
    echo "  plan         - Show what will be created/changed"
    echo "  apply        - Apply the infrastructure changes"
    echo "  destroy      - Destroy the infrastructure"
    echo "  init         - Initialize Terraform"
    echo "  validate     - Validate Terraform configuration"
    echo "  output       - Show Terraform outputs"
    echo ""
    echo "Examples:"
    echo "  $0 development plan"
    echo "  $0 production apply"
    echo "  $0 staging destroy"
}

# Validate input parameters
if [ $# -lt 2 ]; then
    print_status $RED "Error: Missing required parameters"
    show_usage
    exit 1
fi

ENVIRONMENT=$1
ACTION=$2

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    print_status $RED "Error: Invalid environment. Must be: development, staging, or production"
    exit 1
fi

# Validate action
if [[ ! "$ACTION" =~ ^(plan|apply|destroy|init|validate|output)$ ]]; then
    print_status $RED "Error: Invalid action. Must be: plan, apply, destroy, init, validate, or output"
    exit 1
fi

# Set environment-specific variables
TFVARS_FILE="environments/${ENVIRONMENT}.tfvars"

# Check if tfvars file exists
if [[ ! -f "$SCRIPT_DIR/$TFVARS_FILE" ]]; then
    print_status $RED "Error: Environment configuration file not found: $TFVARS_FILE"
    exit 1
fi

print_status $BLUE "🚀 AI-Whisperers Infrastructure Deployment"
print_status $BLUE "========================================="
print_status $YELLOW "Environment: $ENVIRONMENT"
print_status $YELLOW "Action: $ACTION"
print_status $YELLOW "Working Directory: $SCRIPT_DIR"

# Change to terraform directory
cd "$SCRIPT_DIR"

# Function to check if AWS CLI is configured
check_aws_config() {
    if ! command -v aws &> /dev/null; then
        print_status $RED "Error: AWS CLI is not installed. Please install and configure it."
        exit 1
    fi

    if ! aws sts get-caller-identity &> /dev/null; then
        print_status $RED "Error: AWS credentials not configured. Please run 'aws configure'."
        exit 1
    fi

    local account_id=$(aws sts get-caller-identity --query Account --output text)
    print_status $GREEN "✓ AWS CLI configured (Account ID: $account_id)"
}

# Function to initialize Terraform
terraform_init() {
    print_status $YELLOW "Initializing Terraform..."
    
    # Create backend bucket if it doesn't exist (only for production setup)
    if [[ "$ENVIRONMENT" == "production" ]]; then
        local bucket_name="${PROJECT_NAME}-terraform-state"
        if ! aws s3 ls "s3://$bucket_name" 2>/dev/null; then
            print_status $YELLOW "Creating Terraform state bucket: $bucket_name"
            aws s3 mb "s3://$bucket_name" --region us-east-1
            aws s3api put-bucket-versioning --bucket "$bucket_name" --versioning-configuration Status=Enabled
            aws s3api put-bucket-encryption --bucket "$bucket_name" --server-side-encryption-configuration '{
                "Rules": [
                    {
                        "ApplyServerSideEncryptionByDefault": {
                            "SSEAlgorithm": "AES256"
                        }
                    }
                ]
            }'
        fi
    fi
    
    terraform init
    print_status $GREEN "✓ Terraform initialized"
}

# Function to validate Terraform configuration
terraform_validate() {
    print_status $YELLOW "Validating Terraform configuration..."
    terraform validate
    print_status $GREEN "✓ Terraform configuration is valid"
}

# Function to run terraform plan
terraform_plan() {
    print_status $YELLOW "Creating Terraform execution plan for $ENVIRONMENT..."
    terraform plan -var-file="$TFVARS_FILE" -out="${ENVIRONMENT}.tfplan"
    print_status $GREEN "✓ Terraform plan created: ${ENVIRONMENT}.tfplan"
}

# Function to apply terraform changes
terraform_apply() {
    print_status $YELLOW "Applying Terraform changes for $ENVIRONMENT..."
    
    # Check if plan file exists
    if [[ -f "${ENVIRONMENT}.tfplan" ]]; then
        print_status $YELLOW "Using existing plan file: ${ENVIRONMENT}.tfplan"
        terraform apply "${ENVIRONMENT}.tfplan"
    else
        print_status $YELLOW "No plan file found, running apply with auto-approve"
        terraform apply -var-file="$TFVARS_FILE" -auto-approve
    fi
    
    print_status $GREEN "✓ Terraform apply completed"
    
    # Clean up plan file
    if [[ -f "${ENVIRONMENT}.tfplan" ]]; then
        rm "${ENVIRONMENT}.tfplan"
    fi
}

# Function to destroy infrastructure
terraform_destroy() {
    print_status $RED "⚠️  WARNING: This will destroy all infrastructure for $ENVIRONMENT!"
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        print_status $RED "⚠️  PRODUCTION ENVIRONMENT DETECTED!"
        read -p "Are you absolutely sure you want to destroy production infrastructure? Type 'yes' to confirm: " confirm
        if [[ "$confirm" != "yes" ]]; then
            print_status $YELLOW "Destruction cancelled"
            exit 0
        fi
    else
        read -p "Are you sure you want to destroy $ENVIRONMENT infrastructure? Type 'yes' to confirm: " confirm
        if [[ "$confirm" != "yes" ]]; then
            print_status $YELLOW "Destruction cancelled"
            exit 0
        fi
    fi
    
    terraform destroy -var-file="$TFVARS_FILE" -auto-approve
    print_status $GREEN "✓ Infrastructure destroyed"
}

# Function to show outputs
terraform_output() {
    print_status $YELLOW "Showing Terraform outputs for $ENVIRONMENT..."
    terraform output
}

# Main execution
main() {
    # Check prerequisites
    check_aws_config
    
    case $ACTION in
        init)
            terraform_init
            ;;
        validate)
            terraform_validate
            ;;
        plan)
            terraform_init
            terraform_validate
            terraform_plan
            ;;
        apply)
            terraform_init
            terraform_validate
            terraform_apply
            ;;
        destroy)
            terraform_destroy
            ;;
        output)
            terraform_output
            ;;
    esac
    
    print_status $GREEN "🎉 Deployment action '$ACTION' completed successfully for $ENVIRONMENT!"
}

# Run main function
main