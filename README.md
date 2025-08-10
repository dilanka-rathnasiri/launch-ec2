# launch-ec2
Terraform infrastructure as code for launching an EC2 instance

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) configured with appropriate credentials
- Required AWS IAM permissions to create EC2 instances

## Usage

#### Initialize Terraform

```bash
terraform init
```

#### Plan and Apply

1. Create a `terraform.tfvars` file with your configuration (see example below)
2. Review the execution plan:
   ```bash
   terraform plan -var-file="values.tfvars"
   ```
3. Apply the configuration to create the EC2 instance:
   ```bash
   terraform apply -var-file="values.tfvars"
   ```

#### Destroy Resources

To destroy the created EC2 instance:

```bash
terraform destroy -var-file="values.tfvars"
```

## Configuration

#### Required Variables

Create a `values.tfvars` file with the following variables:

```hcl
aws_region         = "us-east-1"
instance_name      = "test-instance"
instance_type      = "t3.nano"
subnet_id          = "subnet-xxxxxxxxxxx"
sg_id              = "sg-xxxxxxxxxxx"
ami_id             = "ami-xxxxxxxxxxxxxxxxx"
iam_instance_profile = "test-iam-profile"

tags = {
  Name    = "test-instance"
  Type    = "public"
  Version = "v1.0.0"
}
```

#### Variables Reference

- `aws_region`:
   - AWS region where resources will be created
   - [Available regions](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html#available-regions)
- `instance_name`: Name of the EC2 instance
- `instance_type`:
   - EC2 instance type
   - [Available instance types](https://aws.amazon.com/ec2/instance-types/)
- `subnet_id`: ID of the subnet where the instance will be launched
- `sg_id`: Security group ID to attach to the instance
- `ami_id`:
   - AMI ID to use for the EC2 instance
   - [Find AMIs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html)
- `iam_instance_profile`: IAM instance profile name to attach to the instance
- `tags`: Map of tags to apply to the EC2 instance

## Outputs

After applying the configuration, the following outputs will be available:

- `instance_id`: The ID of the created EC2 instance
- `instance_private_ip`: The private IPv4 address of the instance
