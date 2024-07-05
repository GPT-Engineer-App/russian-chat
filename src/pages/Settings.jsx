import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  const [autoClickerEnabled, setAutoClickerEnabled] = useState(false);

  useEffect(() => {
    const savedAutoClicker = localStorage.getItem("autoClickerEnabled");
    if (savedAutoClicker) setAutoClickerEnabled(savedAutoClicker === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("autoClickerEnabled", autoClickerEnabled);
  }, [autoClickerEnabled]);

  const handleReset = () => {
    localStorage.clear();
    toast.success("Progress reset!");
    window.location.reload();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Settings</h1>
      <div className="mb-4">
        <label className="text-lg mr-2">Auto Clicker</label>
        <Switch
          checked={autoClickerEnabled}
          onCheckedChange={setAutoClickerEnabled}
        />
      </div>
      <Button variant="destructive" onClick={handleReset}>
        Reset Progress
      </Button>
    </div>
  );
};

export default SettingsPage;