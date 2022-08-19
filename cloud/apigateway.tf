resource "aws_api_gateway_rest_api" "swing_tracker_api" {
  name = "swing_tracker_api"
}

resource "aws_api_gateway_deployment" "swing_tracker_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.swing_tracker_api.id
  stage_name = "dev"

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_method.courses_method
  ]
}

resource "aws_api_gateway_stage" "swing_tracker_api_stage" {
  rest_api_id = aws_api_gateway_rest_api.swing_tracker_api.id
  deployment_id = aws_api_gateway_deployment.swing_tracker_api_deployment.id
  stage_name = aws_api_gateway_deployment.swing_tracker_api_deployment.stage_name
}

# Courses
resource "aws_api_gateway_resource" "courses" {
  rest_api_id = aws_api_gateway_rest_api.swing_tracker_api.id
  parent_id   = aws_api_gateway_rest_api.swing_tracker_api.root_resource_id
  path_part   = "courses"
}

resource "aws_api_gateway_method" "courses_method" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id             = aws_api_gateway_resource.courses.id
  http_method             = aws_api_gateway_method.courses_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.add_course.invoke_arn
}