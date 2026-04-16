import type { TaskColumn } from "./types"

export const ANIMATION_DURATION = 1
export const ANIMATION_EASING = [0.32, 0.72, 0, 1] as const

export const PROVIDER_SCATTERED_POSITIONS = [
    { x: "8%", y: "10%", rotate: -12 },
    { x: "95%", y: "8%", rotate: 18 },
    { x: "5%", y: "35%", rotate: 8 },
    { x: "82%", y: "52%", rotate: -15 },
    { x: "21%", y: "47%", rotate: 22 },
] as const

export const AGENT_SCATTERED_POSITIONS = [
    { x: "15%", y: "35%", rotate: -15 },
    { x: "72%", y: "28%", rotate: 20 },
    { x: "88%", y: "46%", rotate: -8 },
    { x: "72%", y: "38%", rotate: 4 },
] as const

export const PROVIDERS_ALL = [
    { name: "YouGov" },
    { name: "Statista" },
    { name: "Experian" },
    { name: "Talkwalker" },
    { name: "Comscore" },
] as const

export const AGENTS_ALL = [
    { name: "Miro Sidekick", role: "Visual Collaboration" },
    { name: "Jasper AI", role: "Content Creation" },
    { name: "Salesforce Einstein", role: "CRM Intelligence" },
    { name: "Your agent", role: "Custom" },
] as const

export const WORKFLOW_TASKS: TaskColumn[] = [
    {
        task: "Strategy / Brief",
        subtasks: [
            { label: "Audience understanding", agentIndex: 0, providerIndex: [0, 1, 2, 3] },
            { label: "Competitor analysis", agentIndex: 0, providerIndex: [0, 1] },
            { label: "Market sizing", agentIndex: 0, providerIndex: [1, 2] },
        ],
    },
    {
        task: "Creative Development",
        subtasks: [
            { label: "Social trend analysis", agentIndex: 1, providerIndex: [3] },
            { label: "Inspiration", agentIndex: 1, providerIndex: [3] },
            { label: "Messaging development", agentIndex: 1, providerIndex: [0, 3] },
        ],
    },
    {
        task: "Media Strategy / Planning",
        subtasks: [
            { label: "Reach, frequency", agentIndex: 0, providerIndex: [2, 4] },
            { label: "Channel effectiveness", agentIndex: 0, providerIndex: [1, 3, 4] },
            { label: "Planning", agentIndex: 0, providerIndex: [0, 2, 4] },
        ],
    },
    {
        task: "Activation / Execution",
        subtasks: [
            { label: "Campaign activation", agentIndex: 2, providerIndex: [2, 4] },
            { label: "Shopper journey mapping", agentIndex: 2, providerIndex: [2, 4] },
            { label: "Programmatic targeting", agentIndex: 2, providerIndex: [0, 2, 4] },
        ],
    },
    {
        task: "Measurement & Optimization",
        subtasks: [
            { label: "Effectiveness", agentIndex: 3, providerIndex: [0, 3, 4] },
            { label: "Sales impact", agentIndex: 2, providerIndex: [2] },
            { label: "Optimization", agentIndex: 3, providerIndex: [3, 4] },
        ],
    },
]

export const DEFAULT_SUBTASK_LABEL = "Audience understanding"