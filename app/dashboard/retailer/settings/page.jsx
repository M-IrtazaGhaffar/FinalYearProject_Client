"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { organizationApi, retailerApi } from "@/app/axiosInstance";
import axios from "axios";
import { getSession } from "next-auth/react"; // Add this import

function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    id: "",
    name: "",
    owner: "",
    phone: "",
    national_id: "",
    country: "",
    license: "",
    address: "",
    longitude: "",
    latitude: "",
    createdAt: "",
    updatedAt: "",
  });

  // Fetch organization settings using getSession
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const session = await getSession(); // Get session here
      const retId = session?.user?.id || ""; // fallback if needed
      const res = await axios.post(
        "https://advancedpos.duckdns.org/api/retailer/getbyid",
        { id: retId }
      );
      setSettings(res.data.data || {});
    } catch (error) {
      alert("Failed to fetch settings");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    try {
      await retailerApi.post("/update", {
        id: settings.id,
        name: settings.name,
        owner: settings.owner,
        phone: settings.phone,
        national_id: settings.national_id,
        country: settings.country,
        license: settings.license,
        address: settings.address,
        longitude: settings.longitude,
        latitude: settings.latitude,
      });
      alert("Settings updated successfully!");
      fetchSettings();
    } catch (error) {
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Retailer Settings</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-2"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Owner</label>
            <Input
              value={settings.owner}
              onChange={(e) =>
                setSettings({ ...settings, owner: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              National ID
            </label>
            <Input
              value={settings.national_id}
              onChange={(e) =>
                setSettings({ ...settings, national_id: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <Input
              value={settings.country}
              onChange={(e) =>
                setSettings({ ...settings, country: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">License</label>
            <Input
              value={settings.license}
              onChange={(e) =>
                setSettings({ ...settings, license: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <Input
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <Input
              value={settings.longitude}
              onChange={(e) =>
                setSettings({ ...settings, longitude: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <Input
              value={settings.latitude}
              onChange={(e) =>
                setSettings({ ...settings, latitude: e.target.value })
              }
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default SettingsPage;
