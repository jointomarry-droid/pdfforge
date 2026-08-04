"use client";

import * as React from "react";
import { User, Bell, Palette, Shield, Save, CheckCircle2 } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [theme, setTheme] = React.useState("system");
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("pdfforge-user-name") || "";
      const storedEmail = localStorage.getItem("pdfforge-user-email") || "";
      const storedTheme = localStorage.getItem("pdfforge-theme") || "system";
      setName(storedName);
      setEmail(storedEmail);
      setTheme(storedTheme);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("pdfforge-user-name", name);
    localStorage.setItem("pdfforge-user-email", email);
    localStorage.setItem("pdfforge-theme", theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account preferences and appearance.
          </p>
        </div>
        <Button onClick={handleSave}>
          {saved ? (
            <>
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="mr-1.5 h-4 w-4" />
              Save changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>
            Your basic account information. This is stored locally in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Choose your preferred theme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
            {[
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
              { id: "system", label: "System" },
            ].map((opt) => (
              <Label
                key={opt.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value={opt.id} />
                {opt.label}
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <div>
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive updates about new features and tools.
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <div>
              <p className="text-sm font-medium">Conversion complete</p>
              <p className="text-xs text-muted-foreground">
                Get notified when your files are ready to download.
              </p>
            </div>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy
          </CardTitle>
          <CardDescription>
            Control your data and privacy settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium">Local storage only</p>
            <p className="text-xs text-muted-foreground mt-1">
              All your data is stored locally in your browser. Nothing is uploaded to any server.
              Clearing your browser data will remove all settings and history.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
            Clear all local data
          </Button>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
