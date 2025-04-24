import { auth } from "@/auth";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import AppMapBox from "@/components/app-mapbox";
import { organizationApi } from "@/lib/axiosInstance";
import axios from "axios";

async function Page() {
  const session = await auth();
  let organizationData = null;

  try {
    const response = await axios.post(
      "https://advancedpos.duckdns.org/api/organization/getbyid",
      {
        id: session?.user?.id,
        token: session?.user?.token,
      }
    );
    organizationData = response.data.data;
    console.log(Object.keys(organizationData));
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load organization data
      </div>
    );
  }

  if (!organizationData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No organization data found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Dashboard Organization</h2>
      <AppBreadcrumb />
      <div className="py-10 space-y-3">
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">ID</span>
          <span>{organizationData.id}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Name</span>
          <span>{organizationData.name}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Email</span>
          <span>{organizationData.email}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Owner</span>
          <span>{organizationData.owner}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">License</span>
          <span>{organizationData.license}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">National ID</span>
          <span>{organizationData.national_id}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Phone</span>
          <span>{organizationData.phone}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Address</span>
          <span>{organizationData.address}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Country</span>
          <span>{organizationData.country}</span>
        </div>
        <div className="flex items-center justify-between gap-10">
          <AppMapBox latitude={organizationData.latitude} longitude={organizationData.longitude} />
        </div>
      </div>
    </div>
  );
}

export default Page;
