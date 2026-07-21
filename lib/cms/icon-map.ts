import {
    Search,
    Coins,
    ShieldCheck,
    Users,
    TrendingUp,
    Zap,
    Lock,
    BarChart,
    type LucideIcon,
} from "lucide-react"

// Keys must match the `value` options in studio-adxc/schemaTypes/personaFeature.ts
export const iconMap: Record<string, LucideIcon> = {
    search: Search,
    coins: Coins,
    "shield-check": ShieldCheck,
    users: Users,
    "trending-up": TrendingUp,
    zap: Zap,
    lock: Lock,
    "bar-chart": BarChart,
}