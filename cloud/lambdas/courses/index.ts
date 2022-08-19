import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { AWSError, DynamoDB } from 'aws-sdk'
import { ScanOutput } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'

const dynamo = new DynamoDB.DocumentClient()

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log(`Event received: ${event.body}`)
  const eventBody = JSON.parse(event.body)
  const corsHeaders = {
    'X-Requested-With': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  }

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
            name: eventBody.name,
            holes: eventBody.holes,
            par: eventBody.par
          }
        })
        .promise()
    
        body = `Added course "${eventBody.name}" to database`
        break

      case 'DELETE':
        await dynamo.delete({
          TableName: 'Courses',
          Key: {
            name: eventBody.name
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
    headers: corsHeaders,
    statusCode,
    body
  }
}