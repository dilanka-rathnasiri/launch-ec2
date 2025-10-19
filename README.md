# Terraform AWS EC2 Module

A Terraform module to create an AWS EC2 instance

## Usage

```hcl
module "ec2_instance" {
  source = "dilanka-rathnasiri/ec2/aws"
  version = "latest" # Or specify a specific version

  aws_region           = "us-east-1"
  instance_name        = "my-test-instance"
  instance_type        = "t3.nano"
  subnet_id            = "subnet-xxxxxxxxxxx"
  sg_id                = "sg-xxxxxxxxxxx"
  ami_id               = "ami-xxxxxxxxxxxxxxxxx"
  iam_instance_profile = "my-iam-profile"

  tags = {
    Environment = "dev"
    Project     = "my-project"
  }
}
```

## Requirements

| Name                                                                      | Version |
|---------------------------------------------------------------------------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.0  |
| <a name="requirement_aws"></a> [aws](#requirement\_aws)                   | >= 6.0  |

## Providers

| Name                                              | Version |
|---------------------------------------------------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | >= 6.0  |

## Resources

| Name                                                                          | Type         |
|-------------------------------------------------------------------------------|--------------|
| <a name="resource_aws_instance"></a> [aws_instance](#resource\_aws\_instance) | aws_instance |

## Inputs

| Name                                                                                               | Description                    | Type          | Default | Required |
|----------------------------------------------------------------------------------------------------|--------------------------------|---------------|---------|:--------:|
| <a name="input_ami_id"></a> [ami\_id](#input\_ami\_id)                                             | AWS AMI id                     | `string`      | n/a     |   yes    |
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region)                                 | AWS region to deploy resources | `string`      | n/a     |   yes    |
| <a name="input_iam_instance_profile"></a> [iam\_instance\_profile](#input\_iam\_instance\_profile) | AWS IAM instance profile       | `string`      | n/a     |   yes    |
| <a name="input_instance_name"></a> [instance\_name](#input\_instance\_name)                        | Name of the instance           | `string`      | n/a     |   yes    |
| <a name="input_instance_type"></a> [instance\_type](#input\_instance\_type)                        | AWS instance type              | `string`      | n/a     |   yes    |
| <a name="input_sg_id"></a> [sg\_id](#input\_sg\_id)                                                | AWS security group ID          | `string`      | n/a     |   yes    |
| <a name="input_subnet_id"></a> [subnet\_id](#input\_subnet\_id)                                    | AWS subnet ID                  | `string`      | n/a     |   yes    |
| <a name="input_tags"></a> [tags](#input\_tags)                                                     | Map of tags                    | `map(string)` | n/a     |   yes    |

## Outputs

| Name                                                                                  | Description                            |
|---------------------------------------------------------------------------------------|----------------------------------------|
| <a name="output_instance_id"></a> [instance\_id](#output\_instance\_id)               | ID of the EC2 instance                 |
| <a name="output_instance_pvt_ip"></a> [instance\_pvt\_ip](#output\_instance\_pvt\_ip) | Private IP address of the EC2 instance |
