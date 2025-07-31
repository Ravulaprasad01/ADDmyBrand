"use client"

const data = [
  { step: "Step 1", value: 50, label: "Visitors" },
  { step: "Step 2", value: 40, label: "Sign-ups" },
  { step: "Step 3", value: 30, label: "Trials" },
  { step: "Step 4", value: 20, label: "Purchases" },
  { step: "Step 5", value: 15, label: "Renewals" },
]

export function FunnelChart() {
  return (
    <div className="space-y-3 h-48 flex flex-col justify-center">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground w-12">{item.step}</span>
          <div className="flex-1 h-6 bg-muted rounded">
            <div
              className="h-full bg-primary rounded transition-all duration-500"
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-16">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
