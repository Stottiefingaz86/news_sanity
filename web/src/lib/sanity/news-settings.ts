import { sanityClient } from '@/lib/sanity/client'
import { newsSettingsQuery } from '@/lib/sanity/queries'

export const defaultSubNavItems = [
  'Latest',
  'Picks',
  'Expert Analysis',
  'Props',
  'News',
  'Baseball',
  'Football',
  'Soccer',
  'Hockey',
] as const

export type NewsSettings = {
  showSubNav: boolean
  subNavItems: string[]
}

const fallbackSettings: NewsSettings = {
  showSubNav: false,
  subNavItems: [...defaultSubNavItems],
}

export async function getNewsSettings(): Promise<NewsSettings> {
  try {
    const settings = await sanityClient.fetch<{
      showSubNav?: boolean
      subNavItems?: string[] | null
    } | null>(newsSettingsQuery, {}, { cache: 'no-store' })

    if (!settings) return fallbackSettings

    return {
      showSubNav: settings.showSubNav ?? false,
      subNavItems:
        settings.subNavItems?.filter(Boolean).length
          ? settings.subNavItems.filter(Boolean)
          : fallbackSettings.subNavItems,
    }
  } catch {
    return fallbackSettings
  }
}
