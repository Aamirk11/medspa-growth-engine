"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Syringe,
  MessageSquare,
  Plug,
  Save,
  Wifi,
  WifiOff,
  User,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { business, providers, treatments } from "@/lib/mock-data";

const integrations = [
  {
    name: "Boulevard PMS",
    description:
      "Practice management system for client records, scheduling, and billing",
    icon: Building2,
    connected: true,
  },
  {
    name: "Twilio SMS",
    description:
      "SMS messaging service for automated appointment reminders and outreach",
    icon: MessageSquare,
    connected: true,
  },
  {
    name: "Google Business Profile",
    description:
      "Manage your Google listing, reviews, and search presence",
    icon: Building2,
    connected: false,
  },
  {
    name: "Yelp Business",
    description:
      "Monitor and respond to Yelp reviews and manage your business page",
    icon: Building2,
    connected: false,
  },
];

const defaultTemplates = {
  rebooking: `Hi {{client_name}}! It's been a while since your last {{treatment}} at Glow Aesthetics. We'd love to help you maintain your amazing results! Book your next session and enjoy 10% off. Reply BOOK to schedule or visit our website. - Glow Aesthetics`,
  review: `Hi {{client_name}}! Thank you for choosing Glow Aesthetics for your recent {{treatment}}. We hope you love your results! If you have a moment, we'd really appreciate a quick review of your experience. It helps others discover our practice. {{review_link}} - Glow Aesthetics`,
};

export default function SettingsPage() {
  const [businessForm, setBusinessForm] = useState({
    name: business.name,
    address: business.address,
    city: business.city,
    state: business.state,
    zip: business.zip,
    phone: business.phone,
    website: business.website,
  });

  const [treatmentEdits, setTreatmentEdits] = useState(
    treatments.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category,
      optimalInterval: t.optimalInterval,
      avgPrice: t.avgPrice,
    }))
  );

  const [commSettings, setCommSettings] = useState({
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: false,
    morning: true,
    afternoon: true,
    evening: false,
    frequencyCap: "2x/week",
    rebookingTemplate: defaultTemplates.rebooking,
    reviewTemplate: defaultTemplates.review,
  });

  const [integrationStates, setIntegrationStates] = useState(
    integrations.map((i) => ({ ...i }))
  );

  const handleSave = () => {
    // Simulated save action
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your practice configuration"
      />

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="business" className="gap-1.5">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Business Profile</span>
            <span className="sm:hidden">Business</span>
          </TabsTrigger>
          <TabsTrigger value="treatments" className="gap-1.5">
            <Syringe className="h-4 w-4" />
            <span className="hidden sm:inline">Treatment Protocols</span>
            <span className="sm:hidden">Treatments</span>
          </TabsTrigger>
          <TabsTrigger value="communication" className="gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Communication</span>
            <span className="sm:hidden">Comms</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1.5">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
            <span className="sm:hidden">Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Practice Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={businessForm.name}
                      onChange={(e) =>
                        setBusinessForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={businessForm.address}
                      onChange={(e) =>
                        setBusinessForm((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={businessForm.city}
                      onChange={(e) =>
                        setBusinessForm((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={businessForm.state}
                        onChange={(e) =>
                          setBusinessForm((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP</Label>
                      <Input
                        id="zip"
                        value={businessForm.zip}
                        onChange={(e) =>
                          setBusinessForm((prev) => ({
                            ...prev,
                            zip: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={businessForm.phone}
                      onChange={(e) =>
                        setBusinessForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={businessForm.website}
                      onChange={(e) =>
                        setBusinessForm((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {providers.map((provider, i) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {provider.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.title}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {provider.specialties.map((spec) => (
                            <Badge
                              key={spec}
                              variant="secondary"
                              className="text-xs"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium">
                          {provider.clientCount} clients
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${provider.revenue.toLocaleString()}/mo
                        </p>
                      </div>
                    </div>
                    {i < providers.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Treatment Protocols Tab */}
        <TabsContent value="treatments" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Treatment Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm text-muted-foreground">
                        <th className="pb-3 pr-4 font-medium">Treatment</th>
                        <th className="pb-3 pr-4 font-medium">Category</th>
                        <th className="pb-3 pr-4 font-medium">
                          Optimal Interval
                        </th>
                        <th className="pb-3 pr-4 font-medium">Avg Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {treatmentEdits.map((treatment, i) => (
                        <motion.tr
                          key={treatment.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-sm"
                        >
                          <td className="py-3 pr-4 font-medium">
                            {treatment.name}
                          </td>
                          <td className="py-3 pr-4">
                            <Badge variant="outline" className="text-xs">
                              {treatment.category}
                            </Badge>
                          </td>
                          <td className="py-3 pr-4">
                            <Input
                              value={treatment.optimalInterval}
                              onChange={(e) => {
                                const updated = [...treatmentEdits];
                                updated[i] = {
                                  ...updated[i],
                                  optimalInterval: e.target.value,
                                };
                                setTreatmentEdits(updated);
                              }}
                              className="h-8 w-32"
                            />
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">$</span>
                              <Input
                                type="number"
                                value={treatment.avgPrice}
                                onChange={(e) => {
                                  const updated = [...treatmentEdits];
                                  updated[i] = {
                                    ...updated[i],
                                    avgPrice: Number(e.target.value),
                                  };
                                  setTreatmentEdits(updated);
                                }}
                                className="h-8 w-24"
                              />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                      Send automated SMS messages to clients
                    </p>
                  </div>
                  <Switch
                    checked={commSettings.smsEnabled}
                    onCheckedChange={(checked) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        smsEnabled: checked,
                      }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                      Send automated email campaigns
                    </p>
                  </div>
                  <Switch
                    checked={commSettings.emailEnabled}
                    onCheckedChange={(checked) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        emailEnabled: checked,
                      }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send push notifications to mobile app
                    </p>
                  </div>
                  <Switch
                    checked={commSettings.pushEnabled}
                    onCheckedChange={(checked) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        pushEnabled: checked,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sending Windows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                      commSettings.morning
                        ? "border-primary bg-primary/5"
                        : "border-muted"
                    }`}
                    onClick={() =>
                      setCommSettings((prev) => ({
                        ...prev,
                        morning: !prev.morning,
                      }))
                    }
                  >
                    <Switch checked={commSettings.morning} />
                    <div>
                      <p className="font-medium">Morning</p>
                      <p className="text-xs text-muted-foreground">
                        9:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                      commSettings.afternoon
                        ? "border-primary bg-primary/5"
                        : "border-muted"
                    }`}
                    onClick={() =>
                      setCommSettings((prev) => ({
                        ...prev,
                        afternoon: !prev.afternoon,
                      }))
                    }
                  >
                    <Switch checked={commSettings.afternoon} />
                    <div>
                      <p className="font-medium">Afternoon</p>
                      <p className="text-xs text-muted-foreground">
                        12:00 PM - 5:00 PM
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                      commSettings.evening
                        ? "border-primary bg-primary/5"
                        : "border-muted"
                    }`}
                    onClick={() =>
                      setCommSettings((prev) => ({
                        ...prev,
                        evening: !prev.evening,
                      }))
                    }
                  >
                    <Switch checked={commSettings.evening} />
                    <div>
                      <p className="font-medium">Evening</p>
                      <p className="text-xs text-muted-foreground">
                        5:00 PM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequency Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-xs space-y-2">
                  <Label>Maximum messages per client</Label>
                  <Select
                    value={commSettings.frequencyCap}
                    onValueChange={(value) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        frequencyCap: value ?? prev.frequencyCap,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x/week">1x per week</SelectItem>
                      <SelectItem value="2x/week">2x per week</SelectItem>
                      <SelectItem value="1x/month">1x per month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rebookingTemplate">
                    Rebooking Reminder Template
                  </Label>
                  <Textarea
                    id="rebookingTemplate"
                    rows={4}
                    value={commSettings.rebookingTemplate}
                    onChange={(e) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        rebookingTemplate: e.target.value,
                      }))
                    }
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables: {"{{client_name}}"}, {"{{treatment}}"},
                    {"{{days_since_visit}}"}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="reviewTemplate">
                    Review Request Template
                  </Label>
                  <Textarea
                    id="reviewTemplate"
                    rows={4}
                    value={commSettings.reviewTemplate}
                    onChange={(e) =>
                      setCommSettings((prev) => ({
                        ...prev,
                        reviewTemplate: e.target.value,
                      }))
                    }
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables: {"{{client_name}}"}, {"{{treatment}}"},
                    {"{{review_link}}"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {integrationStates.map((integration, i) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-muted p-3">
                          <integration.icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {integration.name}
                            </h3>
                            {integration.connected ? (
                              <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                                <Wifi className="h-3 w-3" />
                                Connected
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-muted-foreground"
                              >
                                <WifiOff className="h-3 w-3" />
                                Not Connected
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                          <div className="mt-4">
                            {integration.connected ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                                onClick={() => {
                                  const updated = [...integrationStates];
                                  updated[i] = {
                                    ...updated[i],
                                    connected: false,
                                  };
                                  setIntegrationStates(updated);
                                }}
                              >
                                Disconnect
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => {
                                  const updated = [...integrationStates];
                                  updated[i] = {
                                    ...updated[i],
                                    connected: true,
                                  };
                                  setIntegrationStates(updated);
                                }}
                              >
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
