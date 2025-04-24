import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Link from "next/link";

async function getSearchResults(query) {
  if (!query) return null;

  try {
    const res = await fetch("https://advancedpos.duckdns.org/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Failed to fetch search results:", err);
    return null;
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  const data = await getSearchResults(query);

  return (
    <div className="space-y-5 p-5">
      <h1 className="text-2xl font-bold">Search</h1>
      <form className="flex gap-2" method="GET">
        <Input
          name="query"
          placeholder="Search blog, product, organization..."
          defaultValue={query}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </form>

      {data && (
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="retailers">Retailers</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            {data.blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/dashboard/organization/blogs/${blog.id}`}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all my-1">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {blog.organization.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="organizations">
            {data.organizations.map((org) => (
              <Link key={org.id} href={`/dashboard/organization/${org.id}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-all my-1">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{org.name}</h3>
                    <p className="text-sm">{org.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {org.address}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="products" className="space-y-3">
            {data.products.map((product) => (
              <Link
                key={product.id}
                href={`/dashboard/organization/products/${product.id}`}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all my-1">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm">Formula: {product.formula}</p>
                    <p className="text-xs text-muted-foreground">
                      Sold by {product.retailer.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="retailers" className="space-y-3">
            {data.retailers.map((retailer) => (
              <Link
                key={retailer.id}
                href={`/dashboard/organization/retailers/${retailer.id}`}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all my-2">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{retailer.name}</h3>
                    <p className="text-sm">{retailer.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {retailer.address}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
