data "aws_iam_policy_document" "lambda_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "swing_tracker_lambda_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_role_policy.json

  inline_policy {
    name   = "lambda_role_policy"
    policy = jsonencode(
      {
        Statement = [
          {
            Action = [
              "logs:CreateLogStream",
              "logs:CreateLogGroup",
              "logs:PutLogEvents"
            ]
            Effect = "Allow"
            Resource = "*"
          }
        ]
        Version = "2012-10-17"
      }
    )
  }
}