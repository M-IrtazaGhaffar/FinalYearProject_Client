import { AppBreadcrumb } from '@/components/app-breadcrumb'
import React from 'react'

function page() {
  return (
    <div>
        <h2 className='text-2xl font-bold'>Your Sales</h2>
        <AppBreadcrumb />
    </div>
  )
}

export default page