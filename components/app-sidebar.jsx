import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Logo2 from "@/assets/2.png";
import Image from "next/image";
import { signOut } from "@/auth";

export function AppSidebar({ items }) {
  return (
    <Sidebar>
      <SidebarHeader className="text-center bg-black text-white rounded m-2 flex justify-center items-center">
        <Image
          src={Logo2}
          alt="image"
          width={75}
          height={75}
          className="p-2 w-[50%]"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="p-3 hover:bg-slate-300 flex justify-between items-center gap-5"
                  >
                    <a href={item.url}>
                      <span>{item.title}</span>
                      <span>{item.icon}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className='w-full'>Logout</Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
