variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "instance_name" {
  description = "Name of the instance"
  type        = string
}

variable "instance_type" {
  description = "AWS instance type"
  type        = string
}

variable "subnet_id" {
  description = "AWS subnet ID"
  type        = string
}

variable "sg_id" {
  description = "AWS security group ID"
  type        = string
}

variable "ami_id" {
  description = "AWS AMI id"
  type        = string
}

variable "iam_instance_profile" {
  description = "AWS IAM instance profile"
  type        = string
}

variable "tags" {
  description = "Map of tags"
  type        = map(string)
}
