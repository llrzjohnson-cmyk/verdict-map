import { useState, useEffect } from "react";
import { Cookie, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setShow(false);
  };

  const savePrefs = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setShow(false);
    setShowSettings(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6" role="dialog" aria-label="Cookie consent">
      <div className="editorial-container">
        <div className="rounded-xl border border-border bg-card shadow-xl p-6 max-w-2xl ml-auto">
          {showSettings ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold">Cookie Preferences</h3>
                <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {[
                { key: "necessary" as const, label: "Necessary", desc: "Required for the website to function.", disabled: true },
                { key: "analytics" as const, label: "Analytics", desc: "Help us understand how visitors use our site." },
                { key: "marketing" as const, label: "Marketing", desc: "Used to deliver relevant advertisements." },
              ].map((c) => (
                <label key={c.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs[c.key]}
                    disabled={c.disabled}
                    onChange={(e) => setPrefs({ ...prefs, [c.key]: e.target.checked })}
                    className="mt-1 accent-primary"
                  />
                  <div>
                    <div className="text-sm font-medium">{c.label}</div>
                    <div className="text-xs text-muted-foreground">{c.desc}</div>
                  </div>
                </label>
              ))}
              <Button onClick={savePrefs} className="w-full bg-primary text-primary-foreground">Save Preferences</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-bold mb-1">We value your privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your experience, analyze traffic, and serve relevant content.{" "}
                    <a href="/cookie-policy" className="text-primary hover:underline">Learn more</a>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={accept} className="bg-primary text-primary-foreground">Accept All</Button>
                <Button onClick={reject} variant="outline">Reject Non-Essential</Button>
                <Button onClick={() => setShowSettings(true)} variant="ghost" size="sm" className="text-muted-foreground">
                  <Settings className="h-4 w-4 mr-1" /> Customize
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
