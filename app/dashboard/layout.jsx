import { Toaster } from '@/components/ui/sonner'
import React from 'react'

function layout({ children }) {
  return (
    <main>
      <Toaster />
      {children}
      </main>
  )
}

export default layout