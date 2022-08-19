import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { AWSError, DynamoDB } from 'aws-sdk'
import { ScanOutput } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'

const dynamo = new DynamoDB.DocumentClient()

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log(`Event received: ${event.body}`)
  const eventBody = JSON.parse(event.body)

  let statusCode: number = 200
  let body: string | PromiseResult<ScanOutput, AWSError>

  try {
    switch(eventBody.action) {
      case 'GET_ALL':
        body = await dynamo.scan({
          TableName: 'Courses'
        })
        .promise()
        break

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
  } finally {
    body = JSON.stringify(body)
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode,
    body
  }
}