import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { iconMap } from "@/lib/icon-map"
import type { NavItem } from "@/config/site"

type AudienceCardProps = {
    item: NavItem
    variant?: "default" | "compact"
    active?: boolean
}

export function AudienceCard({ item, variant = "default", active = false }: AudienceCardProps) {
    const Icon = item.icon ? iconMap[item.icon] : null
    const isCompact = variant === "compact"

    return (
        <Card
            className={cn(
                "transition-all duration-150 hover:ring-primary cursor-pointer",
                active && "bg-muted"
            )}
        >
            <Link href={item.href} className="flex flex-col h-full">
                <CardHeader>
                    <div className="flex flex-col items-center gap-3 text-center">
                        {Icon && (
                            <div
                                className={cn(
                                    "rounded-full flex items-center justify-center shrink-0",
                                    isCompact ? "w-10 h-10" : "w-14 h-14"
                                )}
                                style={{ backgroundColor: item.color ?? "var(--primary)" }}
                            >
                                <Icon
                                    className={cn(
                                        "text-primary-foreground",
                                        isCompact ? "w-5 h-5" : "w-8 h-8"
                                    )}
                                    strokeWidth={1.5}
                                />
                            </div>
                        )}
                        <CardTitle
                            className={cn(
                                "font-semibold text-foreground",
                                isCompact ? "text-sm" : "text-base"
                            )}
                        >
                            {item.label}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className={cn(isCompact && "flex-1 flex flex-col justify-between")}>
                    <CardDescription className={cn("text-muted-foreground leading-relaxed text-center", isCompact ? "text-xs" : "text-sm")}>
                        {isCompact ? item.description : item.longDescription}
                    </CardDescription>
                </CardContent>
            </Link>
        </Card>
    )
}