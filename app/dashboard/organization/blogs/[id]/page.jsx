import { Card, CardContent } from "@/components/ui/card";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export default async function BlogPage({ params }) {
  const blogId = params.id;
  let blog = null;

  try {
    const res = await fetch(
      "https://advancedpos.duckdns.org/api/blog/getbyid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: blogId }),
        cache: "no-store", // disable cache to always fetch fresh data
      }
    );

    if (!res.ok) throw new Error("Failed to fetch blog");
    const data = await res.json();
    blog = data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load blog data
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        Blog not found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Blog Details</h2>
      <AppBreadcrumb />

      <Card className="shadow-xl p-4">
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium">{blog.description}</p>
            <p className="text-sm text-gray-700">{blog.details}</p>
          </div>

          <div className="pt-4 border-t space-y-1 text-sm">
            <p>
              <span className="font-medium">Organization:</span>{" "}
              {blog.organization.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {blog.organization.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {blog.organization.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {blog.organization.address}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
