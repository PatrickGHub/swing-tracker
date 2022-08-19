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