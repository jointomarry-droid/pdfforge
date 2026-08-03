import type { ToolDefinition } from "@/types/tool";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ToolFaq({ tool }: { tool: ToolDefinition }) {
  if (tool.faq.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="w-full rounded-xl border bg-card px-6">
        {tool.faq.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
