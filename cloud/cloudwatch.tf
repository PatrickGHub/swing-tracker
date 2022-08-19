resource "aws_cloudwatch_log_group" "courses" {
  name = "/aws/lambda/${aws_lambda_function.courses.function_name}"
  retention_in_days = "5"
}
