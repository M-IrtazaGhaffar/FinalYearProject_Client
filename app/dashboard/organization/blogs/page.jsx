"use client";
import React, { useState } from 'react'
import { useSession } from "next-auth/react";

function page() {
  const [Data, setData] = useState('')
  const session = useSession();

  try {
    // const response = organizationApi.post('https://advancedpos.duckdns.org/api/blog/getbyorganizationid', {
    //   "organization_id": session?.user?.id
    // })
    // console.log(response);
    
  } catch (error) {
    console.log(error);
  }
  return (
    <div>page</div>
  )
}

export default page