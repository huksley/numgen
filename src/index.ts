import { apiResponse, findPayload } from './util'
import { Context as LambdaContext, APIGatewayEvent, Callback as LambdaCallback } from 'aws-lambda'
import { logger as log } from './logger'
import { ejpot } from './jpot'

/** Invoked on API Gateway call */
export const getHandler = (
  event: APIGatewayEvent,
  context: LambdaContext,
  callback: LambdaCallback,
) => {
  log.info(
    'event(' +
      typeof event +
      ') ' +
      JSON.stringify(event, null, 2) +
      ' context ' +
      JSON.stringify(context, null, 2),
  )

  const api = apiResponse(event, context, callback)
  const payload = findPayload(event)
  log.info('Using payload', payload)

  try {
    api.success({
      eurojackpot: ejpot(),
    })
  } catch (err) {
    log.warn('Failed to process event', err)
    api.failure('Exception processing event: ' + err)
  }
}
