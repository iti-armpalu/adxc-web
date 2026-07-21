import {
    Search,
    Coins,
    ShieldCheck,
    Users,
    TrendingUp,
    Zap,
    Lock,
    BarChart,
    Layers,
    SlidersHorizontal,
    type LucideIcon,
} from "lucide-react"

// Keys must match the `value` options in studio-adxc/schemaTypes/audienceFeature.ts
export const iconMap: Record<string, LucideIcon> = {
    search: Search,
    coins: Coins,
    "shield-check": ShieldCheck,
    users: Users,
    "trending-up": TrendingUp,
    zap: Zap,
    lock: Lock,
    "bar-chart": BarChart,
    layers: Layers,
    "sliders-horizontal": SlidersHorizontal,
}