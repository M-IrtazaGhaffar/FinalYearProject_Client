import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { organizationApi } from "@/app/axiosInstance";
import axios from "axios";
import Link from "next/link";

export default async function Page() {
  let blogs = [];

  try {
    const response = await axios.post("https://advancedpos.duckdns.org/api/blog/get");
    blogs = response.data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load blogs
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        No blogs found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Organization Blogs</h2>
      <AppBreadcrumb />
      <div className="py-5 flex flex-col gap-5">
        {blogs.map((blog) => (
          <Link href={`/dashboard/retailer/blogs/${blog.id}`} key={blog.id} className="space-y-2 border-2 p-3 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-xs">by {blog.organization?.name}</p>
            <p className="text-sm text-gray-600">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
