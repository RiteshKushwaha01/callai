import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { checkout, portal, polar } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { db } from '@/db'
import * as schema from '@/db/schema'

const polarServer = process.env.POLAR_SERVER?.trim().toLowerCase()
const normalizedPolarServer =
  polarServer === 'production' ? 'production' : 'sandbox'

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: normalizedPolarServer,
})

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || 'http://localhost:3000'
const upgradeUrl = new URL('/upgrade', appUrl).toString()

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          successUrl: upgradeUrl,
          returnUrl: upgradeUrl,
        }),
        portal({
          returnUrl: upgradeUrl,
        }),
      ],
    }),
  ],
})
