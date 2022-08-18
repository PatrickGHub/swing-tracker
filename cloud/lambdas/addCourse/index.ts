const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB.DocumentClient()

export const handler = async (event) => {
  console.log(`Event received: ${event.body}`)
  event = JSON.parse(event.body)

  let statusCode: number = 200
  let body: string

  try {
    await dynamo.put({
      TableName: 'Courses',
      Item: {
        Name: event.name,
        Holes: event.holes,
        Par: event.par
      }
    })
    .promise()

    body = `Added course: ${event.name} to database`
  } catch (error) {
    statusCode = 400
    body = error.message
  }

  return {
    statusCode,
    body
  }
}