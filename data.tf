data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "image-id"
    values = [var.ami_id]
  }
}
