"use client";

import * as React from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pdfforge-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border bg-background p-4 shadow-2xl sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">We respect your privacy</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              PDFForge uses essential cookies for basic functionality. We do NOT use tracking
              cookies or analytics that track you across sites. All file processing happens
              in your browser — we never see your documents.
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={accept}>
                Accept essential
              </Button>
              <Button size="sm" variant="outline" onClick={decline}>
                Decline
              </Button>
            </div>
          </div>
          <button onClick={decline} className="shrink-0 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
