// Checks if the route is authenticated and redirects to the login page if not
export default defineNuxtRouteMiddleware(async (to, _) => {
  const unauthenticatedRoutes = ['/login', '/register']

  // Check the authentication status
  const isAuthenticated = await useAuth().isAuthenticated

  // If the route is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    if (unauthenticatedRoutes.includes(to.path)) return
    navigateTo('/login')
  }

  // If the route is authenticated, redirect to the home page
  if (isAuthenticated) {
    if (unauthenticatedRoutes.includes(to.path)) navigateTo('/dashboard')
  }
})
