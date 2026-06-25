import Link from 'next/link'
import { RocketIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from '@/modules/premium/constants'

export const DashboardTrial = () => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions())

  if (!data) return null

  return (
    <div className="border border-border/20 rounded-lg w-full bg-sidebar-accent/35 text-sidebar-foreground shadow-sm flex flex-col gap-y-2">
      <div className="p-3 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-semibold text-sidebar-foreground">
            Free Trial
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-sidebar-foreground/80">
            {data.agentCount}/{MAX_FREE_AGENTS} Agents
          </p>
          <Progress value={(data.agentCount / MAX_FREE_AGENTS) * 100} />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-sidebar-foreground/80">
            {data.meetingCount}/{MAX_FREE_MEETINGS} Meetings
          </p>
          <Progress value={(data.meetingCount / MAX_FREE_MEETINGS) * 100} />
        </div>
      </div>
      <Button
        className="bg-primary text-primary-foreground border-t border-primary/40 hover:bg-primary/90 rounded-t-none font-semibold shadow-sm"
        asChild
      >
        <Link href="/upgrade">Upgrade</Link>
      </Button>
    </div>
  )
}
