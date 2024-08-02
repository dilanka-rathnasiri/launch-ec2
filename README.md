# launch-ec2
Pulumi infrastructure as code for launch ec2

### Launch an ec2
1. create a configs.yaml file with required values in the repository root
2. execute `pulumi install --local` in terminal
3. execute `pulumi install` in terminal
4. execute `export PULUMI_CONFIG_PASSPHRASE=<your passphrase>` in terminal
5. execute `export AWS_REGION=<required aws region>` in terminal
6. execute `pulumi stack init <stack name>` in terminal
7. execute `pulumi preview --json` in terminal (optional)
8. execute `pulumi up --yes` in terminal

### Destroy created ec2 instance
1. execute `export PULUMI_CONFIG_PASSPHRASE=<your passphrase>` in terminal
2. execute `export AWS_REGION=<required aws region>` in terminal
3. execute `pulumi destroy --yes` in terminal

### Configs.yaml file format
```yaml
AMI_NAME: <name of the ami> # wildcard can be used
INSTANCE_NAME: <name of the instance>
INSTANCE_TYPE: <instance type>
SUBNET_ID: <subnet id>
SG_ID: <security group id>
IAM_INSTANCE_PROFILE: <name of the iam instance profile>
TAGS: <map of tags as key value pairs>
```

### Example configs.yaml file
```yaml
AMI_NAME: "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
INSTANCE_NAME: "test-instance"
INSTANCE_TYPE: "t3.nano"
SUBNET_ID: "subnet-xxxxxxxxxxx"
SG_ID: "sg-xxxxxxxxxxx"
IAM_INSTANCE_PROFILE: "test-iam-profile"
TAGS:
    Name: "test-instance"
    Type: "public"
    Version: "v1.0.0"
```
