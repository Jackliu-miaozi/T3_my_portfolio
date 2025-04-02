"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function MessageHandler() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      toast(message)
    }
  }, [searchParams])

  return null
}