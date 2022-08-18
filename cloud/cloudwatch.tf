resource "aws_cloudwatch_log_group" "add_course" {
  name = "/aws/lambda/${aws_lambda_function.add_course.function_name}"
  retention_in_days = "5"
}
