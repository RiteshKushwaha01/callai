import { polarClient } from '@polar-sh/better-auth'
import { createAuthClient } from 'better-auth/react'

/** Polar plugin adds these at runtime; package typings don't merge into createAuthClient yet */
type PolarClientExtensions = {
  checkout: (args: { products: string[] }) => Promise<unknown>
  customer: { portal: () => Promise<unknown> }
}

const baseClient = createAuthClient({
  // @polar-sh/better-auth plugin types are slightly out of sync with better-auth
  // @ts-expect-error — runtime API is correct
  plugins: [polarClient()],
})

export const authClient = baseClient as typeof baseClient & PolarClientExtensions

