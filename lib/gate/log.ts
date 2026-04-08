export type GateEventLog = {
    createdAt: string;       // ISO 8601
    country: string | null;  // "DE", "US" — from x-vercel-ip-country
    success: boolean;
  };
  
  export function logGateEvent(event: GateEventLog): void {
    // One-line JSON — easy to filter/export in Vercel log drain
    console.log("[gate-event]", JSON.stringify(event));
  }