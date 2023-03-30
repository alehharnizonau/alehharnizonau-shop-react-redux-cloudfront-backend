export const formatJSONResponse = ({ statusCode, data }: { statusCode: number, data: any }) => (
  {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*'
    }
  })
