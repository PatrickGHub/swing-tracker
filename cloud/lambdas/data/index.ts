import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { AWSError, DynamoDB } from 'aws-sdk'
import { ScanOutput } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'

const dynamo = new DynamoDB.DocumentClient()

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log(`Event received: ${event.body}`)
  const eventBody = JSON.parse(event.body)

  const item = eventBody.type === 'courses' ?
    ({
      name: eventBody.name,
      holes: eventBody.holes,
      holesData: eventBody.holesData,
      par: eventBody.par
    })
    :
    ({
      id: eventBody.id,
      course: eventBody.course,
      date: eventBody.date,
      par: eventBody.par,
      score: eventBody.score,
      holes: eventBody.holes,
      holesData: eventBody.holesData
    })

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
          TableName: eventBody.type
        })
        .promise()
        break

        case 'GET_FILTERED_BY_COURSE_NAME':
        body = await dynamo.scan({
          TableName: eventBody.type,
          FilterExpression: '#course = :course',
          ExpressionAttributeNames: {
              '#course': 'course',
          },
          ExpressionAttributeValues: {
              ':course': eventBody.courseName,
          }
        })
        .promise()
        break

      case 'PUT':
        await dynamo.put({
          TableName: eventBody.type,
          Item: item
        })
        .promise()
    
        body = `Added "${eventBody.type}" item to database`
        break

      case 'DELETE':
        await dynamo.delete({
          TableName: eventBody.type,
          Key: {
            name: eventBody.name
          }
        })
        .promise()
    
        body = `Deleted "${eventBody.type}" item from database`
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