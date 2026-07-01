import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_ONLY = ['/dashboard', '/leads', '/clients', '/outreach']
const CLIENT_ONLY = ['/portal']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = ADMIN_ONLY.some(p => pathname.startsWith(p))
  const isClientRoute = CLIENT_ONLY.some(p => pathname.startsWith(p))
  if (!isAdminRoute && !isClientRoute) return NextResponse.next()

  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  const isAdmin = !!adminRow

  if (isAdminRoute && !isAdmin) {
    // Authenticated but not an admin — send them to the client portal instead
    // of exposing lead/client/outreach data.
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  if (isClientRoute && isAdmin) {
    // Admins manage practices from the admin dashboard, not the client portal.
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/leads/:path*', '/clients/:path*', '/outreach/:path*', '/portal/:path*'],
}
