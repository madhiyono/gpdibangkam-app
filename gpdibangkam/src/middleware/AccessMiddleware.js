export function accessMiddleware(to, from, next) {
  const fromRouteName = from.name;

  if (fromRouteName === undefined && to.meta.requiresDirectAccess) {
    next({ name: "HomePage" });
  } else {
    next();
  }
}
