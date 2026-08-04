import { Shield, Zap, Lock, CreditCard, Globe, Trash2 } from "lucide-react";

const signals = [
  {
    icon: CreditCard,
    title: "100% Free",
    description: "No hidden fees or watermarks",
  },
  {
    icon: Lock,
    title: "No Login Required",
    description: "Use all tools instantly",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Files never leave your browser",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Processed in milliseconds",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Any device, any browser",
  },
  {
    icon: Trash2,
    title: "Auto-Delete",
    description: "Files removed after processing",
  },
];

export function TrustSignals() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {signals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.title} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{signal.title}</p>
                <p className="text-xs text-muted-foreground">{signal.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
