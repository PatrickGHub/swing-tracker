resource "aws_dynamodb_table" "courses_table" {
  name = "Courses"
  billing_mode = "PROVISIONED"
  hash_key = "name"
  read_capacity = 1
  write_capacity = 1

  attribute {
    name = "name"
    type = "S"
  }
}