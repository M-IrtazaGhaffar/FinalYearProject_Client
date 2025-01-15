import { AppBreadcrumb } from "@/components/app-breadcrumb";
import React from "react";

function page() {
  const Data = [
    {
      id: 1,
      title: "Blog1",
      by: "Pfizer",
      detail:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis commodi laudantium aut recusandae! Ullam tempore perspiciatis asperiores facere officiis distinctio iure, ducimus fugit. Ipsum eveniet ratione distinctio molestias exercitationem quae",
    },
    {
      id: 1,
      title: "Blog2",
      by: "AstraZeneca",
      detail:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis commodi laudantium aut recusandae! Ullam tempore perspiciatis asperiores facere",
    },
    {
      id: 1,
      title: "Blog3",
      by: "Zyrtec",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut sequi aliquam rem reprehenderit ex dolorum nemo accusantium temporibus enim sint, laborum, accusamus amet ullam. Illum facere est autem nihil eligendi suscipit vitae eum recusandae provident nam magnam iste, veritatis animi blanditiis delectus aliquid at rem quia modi a eius omnis id dicta aperiam. Autem modi nobis maiores incidunt. Dolores quis autem ullam laudantium ratione beatae dolorem consectetur saepe doloremque, id magni officia iste unde aspernatur necessitatibus corrupti adipisci. Numquam iste repudiandae, velit, autem aliquam voluptate, soluta officia quod aperiam quis voluptatem cumque fuga a? Labore ipsa repellat exercitationem et nam, qui maxime tenetur quae pariatur officiis dolore fuga sapiente soluta architecto recusandae temporibus explicabo voluptas doloribus praesentium nesciunt maiores harum molestiae. Harum at, rem sit ipsa possimus distinctio quibusdam ex, qui voluptate reprehenderit ea doloremque nostrum, quidem alias officia necessitatibus laboriosam nobis deleniti omnis. Fugit, quasi deserunt beatae quos sunt modi provident itaque dignissimos placeat perspiciatis quisquam laudantium minima incidunt illo dolor similique adipisci corporis, unde aliquid suscipit. Illo laborum nobis similique iusto quis modi eligendi voluptas deleniti commodi doloremque ea, ratione odit minus dolorum recusandae fugiat distinctio obcaecati vel cum temporibus suscipit? Autem quidem praesentium mollitia velit aliquam rem dolorum similique modi, totam at. Illo provident nesciunt nihil sit officiis? Maxime amet deserunt labore eius? Tempore alias aliquid ipsam, esse explicabo cum optio omnis a quae aperiam, nulla saepe non accusamus nesciunt recusandae natus sunt. Dolorem laborum sequi et ea aliquid. Nemo earum ab accusamus veritatis minus aperiam.",
    },
  ];
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Organization Blogs</h2>
      <AppBreadcrumb />
      <div className="py-5 flex flex-col gap-5">
        {Data.map((item, index) => {
          return (
            <div key={index} className="space-y-2 border-2 p-3 rounded-xl shadow-xl">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-xs">by {item.by}</p>
              <p className="text-sm">{item.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
