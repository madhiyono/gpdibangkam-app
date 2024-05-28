import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/index.css";

// Mounting point for the whole app
import App from "@/App.vue";

// Store Management Using Pinia
import { createPinia } from "pinia";

// Router Middleware
import { authMiddleware } from "@/middleware/AuthMiddleware";
import { accessMiddleware } from "@/middleware/AccessMiddleware";
import { tokenMiddleware } from "@/middleware/TokenMiddleware";

// Layouts
import Auth from "@/layouts/AuthLayout.vue";
import Admin from "@/layouts/AdminLayout.vue";
import User from "@/layouts/UserLayout.vue";

// pages for admin
import DashboardAdmin from "@/pages/admin/DashboardAdmin.vue";
import PengumumanAdmin from "@/pages/admin/PengumumanAdmin.vue";
import RenunganAdmin from "@/pages/admin/RenunganAdmin.vue";
import AcaraAdmin from "@/pages/admin/AcaraAdmin.vue";
import BaptisAdmin from "@/pages/admin/BaptisAdmin.vue";
import JemaatAdmin from "@/pages/admin/JemaatAdmin.vue";
import PenyerahanAnakAdmin from "@/pages/admin/PenyerahanAnakAdmin.vue";
import PernikahanAdmin from "@/pages/admin/PernikahanAdmin.vue";
import KasAdmin from "@/pages/admin/KasAdmin.vue";

// pages for auth
import LoginPage from "@/pages/auth/LoginPage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";
import OtpPage from "@/pages/auth/OtpPage.vue";

// pages for user
import HomePage from "@/pages/user/HomePage.vue";
import ProfilePage from "@/pages/user/ProfilePage.vue";
import PengumumanPage from "@/pages/user/PengumumanPage.vue";
import RenunganPage from "@/pages/user/RenunganPage.vue";
import DetailPengumuman from "@/pages/user/DetailPengumuman.vue";
import DetailRenungan from "@/pages/user/DetailRenungan.vue";
import DetailAcara from "@/pages/user/DetailAcara.vue";
import FormBaptis from "@/pages/user/FormBaptis.vue";
import FormPernikahan from "@/pages/user/FormPernikahan.vue";
import FormPenyerahanAnak from "@/pages/user/FormPenyerahanAnak.vue";

// routes
const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: "/admin/dashboard",
        name: "AdminDashboard",
        component: DashboardAdmin,
      },
      {
        path: "/admin/pengumuman",
        name: "AdminPengumuman",
        component: PengumumanAdmin,
      },
      {
        path: "/admin/renungan",
        name: "AdminRenungan",
        component: RenunganAdmin,
      },
      {
        path: "/admin/acara",
        name: "AdminAcara",
        component: AcaraAdmin,
      },
      {
        path: "/admin/baptis",
        name: "AdminBaptis",
        component: BaptisAdmin,
      },
      {
        path: "/admin/umat",
        name: "AdminUmat",
        component: JemaatAdmin,
      },
      {
        path: "/admin/anak",
        name: "AdminPenyerahanAnak",
        component: PenyerahanAnakAdmin,
      },
      {
        path: "/admin/pernikahan",
        name: "AdminPernikahan",
        component: PernikahanAdmin,
      },
      {
        path: "/admin/kas",
        name: "AdminKas",
        component: KasAdmin,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    meta: { requiresAuth: false, preventAfterLogin: true },
    children: [
      {
        path: "/auth/login",
        name: "AuthLogin",
        component: LoginPage,
      },
      {
        path: "/auth/register",
        name: "AuthRegister",
        component: RegisterPage,
      },
      {
        path: "/auth/otp/:type",
        name: "AuthOtp",
        meta: { requiresDirectAccess: true },
        component: OtpPage,
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
    component: User,
    children: [
      {
        path: "/home",
        name: "HomePage",
        component: HomePage,
      },
      {
        path: "/pengumuman",
        name: "PengumumanPage",
        component: PengumumanPage,
      },
      {
        path: "/pengumuman/:id",
        name: "DetailPengumuman",
        component: DetailPengumuman,
      },
      {
        path: "/renungan",
        name: "RenunganPage",
        component: RenunganPage,
      },
      {
        path: "/renungan/:id",
        name: "DetailRenungan",
        component: DetailRenungan,
      },
      {
        path: "/acara/:id",
        name: "DetailAcara",
        component: DetailAcara,
      },
      {
        path: "/layanan/baptis",
        name: "FormBaptis",
        meta: { requiresAuth: true, isAdmin: false },
        component: FormBaptis,
      },
      {
        path: "/layanan/pernikahan",
        name: "FormPernikahan",
        meta: { requiresAuth: true, isAdmin: false },
        component: FormPernikahan,
      },
      {
        path: "/layanan/anak",
        name: "FormPenyerahanAnak",
        meta: { requiresAuth: true, isAdmin: false },
        component: FormPenyerahanAnak,
      },
      {
        path: "/profile",
        name: "ProfilePage",
        meta: { requiresAuth: true, isAdmin: false },
        component: ProfilePage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(authMiddleware);
router.beforeEach(accessMiddleware);
router.beforeEach(tokenMiddleware);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
