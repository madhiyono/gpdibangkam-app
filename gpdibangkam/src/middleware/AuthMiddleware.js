import { useAuthStore } from "@/stores/AuthStore";

export function authMiddleware(to, from, next) {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: "AuthLogin" });
  } else if (to.meta.preventAfterLogin && authStore.isLoggedIn) {
    if (to.meta.isAdmin && authStore.levelUser !== "Administrator") {
      next({ name: "HomePage" });
    } else {
      next({ name: "AdminDashboard" });
    }
  } else {
    if (to.meta.isAdmin && authStore.levelUser !== "Administrator") {
      next({ name: "HomePage" });
    } else {
      next();
    }
  }
}
