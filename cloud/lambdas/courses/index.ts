import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamo = new DynamoDB.DocumentClient()

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log(`Event received: ${event.body}`)
  const eventBody = JSON.parse(event.body)

  let statusCode: number = 200
  let body: string

  try {
    switch(eventBody.action) {
      case 'PUT':
        await dynamo.put({
          TableName: 'Courses',
          Item: {
            Name: eventBody.name,
            Holes: eventBody.holes,
            Par: eventBody.par
          }
        })
        .promise()
    
        body = `Added course "${eventBody.name}" to database`
        break

      case 'DELETE':
        await dynamo.delete({
          TableName: 'Courses',
          Key: {
            Name: eventBody.name
          }
        })
        .promise()
    
        body = `Deleted course "${eventBody.name}" from database`
        break

      default:
        throw new Error(`Invalid action of ${eventBody.action} provided`)
    }
  } catch (error) {
    statusCode = 400
    body = error.message
  }

  return {
    statusCode,
    body
  }
}