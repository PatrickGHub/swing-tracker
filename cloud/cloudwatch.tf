resource "aws_cloudwatch_log_group" "data" {
  name = "/aws/lambda/${aws_lambda_function.data.function_name}"
  retention_in_days = "5"
}
