"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Logo1 from "@/assets/1.png";
import axios from "axios";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    owner: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    national_id: "",
    country: "Pakistan",
    phone: "",
    license: "",
    address: "",
    longitude: "",
    latitude: "",
  });

  const [passwordLevel, setPasswordLevel] = useState("Weak");
  const [passwordColor, setPasswordColor] = useState("bg-red-500");
  const [passwordProgress, setPasswordProgress] = useState("w-1/4");
  const [confirmError, setConfirmError] = useState("");

  const evaluatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    if (strength <= 2) {
      setPasswordLevel("Weak");
      setPasswordColor("bg-red-500");
      setPasswordProgress("w-1/4");
    } else if (strength === 3) {
      setPasswordLevel("Normal");
      setPasswordColor("bg-yellow-500");
      setPasswordProgress("w-1/2");
    } else if (strength === 4) {
      setPasswordLevel("Strong");
      setPasswordColor("bg-blue-500");
      setPasswordProgress("w-3/4");
    } else if (strength === 5) {
      setPasswordLevel("Excellent");
      setPasswordColor("bg-green-500");
      setPasswordProgress("w-full");
    }
  };

  const fetchLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
        setLocating(false);
      },
      (err) => {
        alert("Failed to fetch location.");
        console.error("Geolocation error:", err);
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      passwordLevel === "Weak" ||
      passwordLevel === "Normal" ||
      passwordLevel === "Strong"
    ) {
      alert("Password is too weak. Please make it stronger.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setConfirmError("Passwords do not match.");
      return;
    } else {
      setConfirmError("");
    }

    if (!data.type) {
      alert("Please select a user type.");
      return;
    }

    const endpoint = `https://advancedpos.duckdns.org/api/${data.type}/create`;

    setLoading(true);
    try {
      await axios.post(endpoint, data);
      router.push(`/auth/${data.type}`);
    } catch (err) {
      alert("Registration failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-5 lg:p-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border-[1px] rounded shadow-2xl p-10 w-[50vw] flex flex-col gap-3 justify-center items-center"
      >
        <Image
          src={Logo1}
          alt="Logo"
          width={250}
          height={250}
          className="p-2 w-[20%]"
        />
        <h2 className="text-2xl font-bold text-center">
          Register Organization / Retailer
        </h2>

        <Input
          placeholder="Name"
          required
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Input
          placeholder="Owner Name"
          required
          onChange={(e) => setData({ ...data, owner: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <Input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
            evaluatePassword(e.target.value);
          }}
        />

        {/* Password strength bar */}
        <div className="w-full">
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mt-1">
            <div className={`${passwordColor} ${passwordProgress} h-full`} />
          </div>
          <p className="text-xs mt-1">
            Password Strength: <strong>{passwordLevel}</strong>
          </p>
        </div>

        <Input
          placeholder="Confirm Password"
          type="password"
          required
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />
        {confirmError && (
          <p className="text-xs text-red-500 -mt-2">{confirmError}</p>
        )}

        <Select onValueChange={(val) => setData({ ...data, type: val })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Type (Retailer/Organization)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retailer">Retailer</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="National ID"
          required
          onChange={(e) => setData({ ...data, national_id: e.target.value })}
        />
        <Input
          placeholder="Phone"
          required
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <Input
          placeholder="License"
          required
          onChange={(e) => setData({ ...data, license: e.target.value })}
        />
        <Input
          placeholder="Address"
          required
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />

        <div className="flex gap-2 w-full">
          <Input value={data.latitude} readOnly placeholder="Latitude" />
          <Input value={data.longitude} readOnly placeholder="Longitude" />
        </div>

        <Button
          type="button"
          onClick={fetchLocation}
          disabled={locating}
          className="w-full border-[1px] shadow hover:bg-white hover:text-black"
        >
          {locating ? (
            <>
              <span className="loader mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              Fetching Location...
            </>
          ) : (
            "Fetch Location"
          )}
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="w-full border-[1px] shadow hover:bg-white hover:text-black flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="loader mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </main>
  );
}

export default RegisterPage;
