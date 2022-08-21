data "archive_file" "data" {
  type        = "zip"
  source_dir  = "./lambdas/data/compiled"
  output_path = "data.zip"
}

resource "aws_lambda_function" "data" {
  function_name = "data"
  runtime = "nodejs16.x"
  role = aws_iam_role.lambda_role.arn

  source_code_hash = data.archive_file.data.output_base64sha256
  filename = data.archive_file.data.output_path
  handler = "index.handler"
  timeout = 15
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.data.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.swing_tracker_api.execution_arn}/*/*/*"
}