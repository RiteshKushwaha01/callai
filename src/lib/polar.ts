import { Polar } from '@polar-sh/sdk'

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox',
})

type PolarCustomerState = Awaited<
  ReturnType<(typeof polarClient.customers)['getStateExternal']>
>

const isMissingCustomerError = (error: unknown) => {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const status = (error as { status?: number }).status
  const responseStatus = (error as { response?: { status?: number } }).response
    ?.status
  const bodyError = (error as { body?: { error?: string } }).body?.error
  const message = error instanceof Error ? error.message : ''

  return (
    status === 404 ||
    responseStatus === 404 ||
    bodyError === 'ResourceNotFound' ||
    message.toLowerCase().includes('not found')
  )
}

export const getPolarCustomerState = async (
  externalId: string,
  client: Pick<typeof polarClient, 'customers'> = polarClient,
): Promise<PolarCustomerState> => {
  try {
    return await client.customers.getStateExternal({ externalId })
  } catch (error) {
    if (isMissingCustomerError(error)) {
      return {
        activeSubscriptions: [],
      } as unknown as PolarCustomerState
    }

    throw error
  }
}
