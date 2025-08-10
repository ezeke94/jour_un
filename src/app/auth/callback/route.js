import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    
    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
      
      // Redirect to homepage with success parameter
      return NextResponse.redirect(new URL('/?auth=success', requestUrl.origin))
    }

    return NextResponse.redirect(new URL('/login', requestUrl.origin))
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
  }
}