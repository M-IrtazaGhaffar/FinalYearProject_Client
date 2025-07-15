"use client";

import { useActionState, useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter()
  const [locating, setLocating] = useState(false);
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
      toast.error("Geolocation is not supported by your browser.");
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
        toast.error("Failed to fetch location.");
        console.error("Geolocation error:", err);
        setLocating(false);
      }
    );
  };

  const handleSubmit = async () => {
    if (
      passwordLevel === "Weak" ||
      passwordLevel === "Normal" ||
      passwordLevel === "Strong"
    ) {
      toast.warning("Password is too weak. Please make it stronger.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setConfirmError("Passwords do not match.");
      return;
    } else {
      setConfirmError("");
    }

    if (!data.type) {
      toast.error("Please select a user type.");
      return;
    }

    const endpoint = `https://advancedpos.duckdns.org/api/${data.type}/create`;

    try {
      const res = await axios.post(endpoint, data);
      toast.success(res?.data?.message);
      router.push('/')
    } catch (err) {
      toast.error("Registration failed.");
      console.error(err);
    }
  };

  const [_, formAction, isPending] = useActionState(handleSubmit, undefined);

  return (
    <main className="p-4 sm:p-6 lg:p-10 flex justify-center items-center min-h-screen bg-gray-50">
      <form
        action={formAction}
        className="w-full max-w-2xl border rounded shadow-2xl p-6 sm:p-8 flex flex-col gap-4 bg-white"
      >
        <div className="flex justify-center">
          <Image
            src={Logo1}
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center">
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

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input
            value={data.latitude}
            placeholder="Latitude"
            onChange={(e) => setData({ ...data, latitude: e.target.value })}
          />
          <Input
            value={data.longitude}
            placeholder="Longitude"
            onChange={(e) => setData({ ...data, longitude: e.target.value })}
          />
        </div>

        <Button
          type="button"
          onClick={fetchLocation}
          disabled={locating}
          className="w-full border shadow hover:bg-white hover:text-black"
        >
          {locating ? (
            <>
              <span className="loader animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              Fetching Location...
            </>
          ) : (
            "Fetch Location"
          )}
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full border shadow hover:bg-white hover:text-black flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="loader animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
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
