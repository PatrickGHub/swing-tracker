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

  triggers = {
    redeployment = sha1(join(",", tolist([
      jsonencode(aws_api_gateway_integration.courses_integration)
    ])))
  }
}

resource "aws_api_gateway_stage" "swing_tracker_api_stage" {
  rest_api_id = aws_api_gateway_rest_api.swing_tracker_api.id
  deployment_id = aws_api_gateway_deployment.swing_tracker_api_deployment.id
  stage_name = aws_api_gateway_deployment.swing_tracker_api_deployment.stage_name
}