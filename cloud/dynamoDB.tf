resource "aws_dynamodb_table" "courses_table" {
  name = "courses"
  billing_mode = "PROVISIONED"
  hash_key = "name"
  read_capacity = 1
  write_capacity = 1

  attribute {
    name = "name"
    type = "S"
  }
}

resource "aws_dynamodb_table" "rounds_table" {
  name = "rounds"
  billing_mode = "PROVISIONED"
  hash_key = "id"
  read_capacity = 1
  write_capacity = 1

  attribute {
    name = "id"
    type = "S"
  }
}