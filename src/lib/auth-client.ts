import { polarClient } from '@polar-sh/better-auth'
import { createAuthClient } from 'better-auth/react'

/** Polar plugin adds these at runtime; package typings don't merge into createAuthClient yet */
type PolarClientExtensions = {
  checkout: (args: { products: string[] }) => Promise<unknown>
  customer: { portal: () => Promise<unknown> }
}

const baseClient = createAuthClient({
  plugins: [polarClient()],
})

export const authClient = baseClient as typeof baseClient & PolarClientExtensions

