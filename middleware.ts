export { auth as middleware } from '@/lib/auth';

// Don't invoke Middleware on some paths
export default function config() {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
