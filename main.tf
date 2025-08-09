provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "ec2_instance" {
  ami                  = data.aws_ami.ami.id
  instance_type        = var.instance_type
  subnet_id            = var.subnet_id
  iam_instance_profile = var.iam_instance_profile

  vpc_security_group_ids = [var.sg_id]

  tags = merge(
    {
      Name = var.instance_name
    },
    var.tags
  )
}
