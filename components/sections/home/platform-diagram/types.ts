export type SubtaskRoute = {
    label: string
    agentIndex: number
    providerIndex: number[]
}

export type TaskColumn = {
    task: string
    subtasks: SubtaskRoute[]
}

export type AnimationState = "scattered" | "slotted"

export type SquarePosition = {
    x: number
    y: number
    rotate: number
    scale: number
}