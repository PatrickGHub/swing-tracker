resource "aws_dynamodb_table" "courses_table" {
  name = "Courses"
  billing_mode = "PROVISIONED"
  hash_key = "Name"
  read_capacity = 1
  write_capacity = 1

  attribute {
    name = "Name"
    type = "S"
  }
}