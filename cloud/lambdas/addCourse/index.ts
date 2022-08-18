export const handler = () => {
  console.log('Lambda running')

  return {
    statusCode: 200,
    body: 'Returning 200'
  }
}