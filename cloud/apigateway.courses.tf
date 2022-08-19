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
  api_key_required = true
}

resource "aws_api_gateway_method_response" "courses_response_200" {
  rest_api_id             = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id             = aws_api_gateway_resource.courses.id
  http_method             = aws_api_gateway_method.courses_method.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
  depends_on = [aws_api_gateway_method.courses_method]
}

resource "aws_api_gateway_integration" "courses_integration" {
  rest_api_id             = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id             = aws_api_gateway_resource.courses.id
  http_method             = aws_api_gateway_method.courses_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.courses.invoke_arn
  depends_on = [aws_api_gateway_method.courses_method]
}

resource "aws_api_gateway_integration_response" "courses_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method   = aws_api_gateway_method.courses_method.http_method
  status_code   = aws_api_gateway_method_response.courses_response_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on = [aws_api_gateway_integration.courses_integration, aws_api_gateway_method_response.courses_response_200]
}

# CORS
resource "aws_api_gateway_method" "courses_options_method" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "courses_options_response_200" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method = aws_api_gateway_method.courses_options_method.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true,
    "method.response.header.Access-Control-Allow-Credentials" = true
  }
  depends_on = [aws_api_gateway_method.courses_options_method]
}

resource "aws_api_gateway_integration" "courses_options_integration" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method = aws_api_gateway_method.courses_options_method.http_method
  type = "MOCK"
  depends_on = [aws_api_gateway_method.courses_options_method]
  passthrough_behavior = "WHEN_NO_MATCH"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

resource "aws_api_gateway_integration_response" "courses_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.swing_tracker_api.id
  resource_id   = aws_api_gateway_resource.courses.id
  http_method = aws_api_gateway_method.courses_options_method.http_method
  status_code = aws_api_gateway_method_response.courses_options_response_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
  depends_on = [aws_api_gateway_method_response.courses_options_response_200]
}

# API Key
resource "aws_api_gateway_api_key" "courses_api_key" {
  name = "Courses API key"
}

resource "aws_api_gateway_usage_plan" "courses_usage_plan" {
  name = "Courses usage plan"

  throttle_settings {
    burst_limit = 25
    rate_limit  = 15
  }

  api_stages {
    api_id = aws_api_gateway_rest_api.swing_tracker_api.id
    stage = aws_api_gateway_stage.swing_tracker_api_stage.stage_name
    throttle {
      path = "/${aws_api_gateway_resource.courses.path_part}/${aws_api_gateway_method.courses_method.http_method}"
      burst_limit = 25
      rate_limit  = 15
    }
  }
}

resource "aws_api_gateway_usage_plan_key" "courses_usage_plan_key" {
  key_id        = aws_api_gateway_api_key.courses_api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.courses_usage_plan.id
}