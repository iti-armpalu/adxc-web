export const dataTypes = [
    "Survey / panel",
    "Social / conversation",
    "Behavioural / transaction",
    "Media / measurement",
    "Demographic / firmographic",
    "Other",
] as const

export type DataType = (typeof dataTypes)[number]