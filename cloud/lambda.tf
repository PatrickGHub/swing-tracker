data "archive_file" "add_course" {
  type        = "zip"
  source_dir  = "./lambdas/addCourse/compiled"
  output_path = "add_course.zip"
}

resource "aws_lambda_function" "add_course" {
  function_name = "add_course"
  runtime = "nodejs16.x"
  role = aws_iam_role.lambda_role.arn

  source_code_hash = data.archive_file.add_course.output_base64sha256
  filename = data.archive_file.add_course.output_path
  handler = "index.handler"
  timeout = 15
}