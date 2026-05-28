import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type FeatureCardProps = {
    icon: LucideIcon
    title: string
    lead?: string
    description?: string
    className?: string
}

export function FeatureCard({ icon: Icon, title, lead, description, className }: FeatureCardProps) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="w-10 h-10 rounded-xs bg-primary flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-lg text-primary leading-snug min-h-[3.5rem]">{title}</CardTitle>
                {lead && (
                    <p className="text-sm font-medium text-foreground mt-1">{lead}</p>
                )}
                {description && (
                    <CardDescription className="mt-1">{description}</CardDescription>
                )}
            </CardHeader>
        </Card>
    )
}