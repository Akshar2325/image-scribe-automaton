
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoplay: true,
    darkMode: true,
    subtitles: false,
    quality: "auto",
  });

  const handleSave = () => {
    // TODO: Implement save settings logic
    console.log("Saving settings:", settings);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex flex-col">
                  <span>Email Notifications</span>
                  <span className="text-sm text-gray-400">
                    Receive updates about new content
                  </span>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoplay" className="flex flex-col">
                  <span>Autoplay</span>
                  <span className="text-sm text-gray-400">
                    Automatically play next episode
                  </span>
                </Label>
                <Switch
                  id="autoplay"
                  checked={settings.autoplay}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoplay: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="subtitles" className="flex flex-col">
                  <span>Default Subtitles</span>
                  <span className="text-sm text-gray-400">
                    Show subtitles by default
                  </span>
                </Label>
                <Switch
                  id="subtitles"
                  checked={settings.subtitles}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, subtitles: checked })
                  }
                />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="w-full">
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
