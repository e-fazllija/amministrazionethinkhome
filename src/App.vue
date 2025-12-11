<template>
  <div v-if="showLoader" class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <RouterView v-if="!showLoader" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useConfigStore } from "@/stores/config";
import { useThemeStore } from "@/stores/theme";
import { useBodyStore } from "@/stores/body";
import { useAuthStore } from "@/stores/auth";
import { themeConfigValue } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "app",
  components: {
    RouterView,
  },
  setup() {
    const configStore = useConfigStore();
    const themeStore = useThemeStore();
    const bodyStore = useBodyStore();
    const authStore = useAuthStore();
    const route = useRoute();

    // Route pubbliche che non richiedono autenticazione
    const publicRoutes = ['sign-in', 'sign-up', 'password-reset', 'email-confirmation', 'multi-step-sign-up', '404', '500'];
    
    const isPublicRoute = computed(() => {
      return publicRoutes.includes(route.name as string);
    });

    // Mostra il loader solo se non siamo verificati E non siamo su una route pubblica E c'è un token (quindi stiamo aspettando la verifica)
    const showLoader = computed(() => {
      return !authStore.hasVerified && !isPublicRoute.value && !!JwtService.getToken();
    });

    onBeforeMount(async () => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
       */
      await configStore.overrideLayoutConfig();
      
      // Verifica sempre l'autenticazione
      await authStore.verifyAuth();
      
      /**
       *  Sets a mode from configuration
       */
      themeStore.setThemeMode(themeConfigValue.value);
    });

    onMounted(() => {
      nextTick(() => {
        initializeComponents();

        bodyStore.removeBodyClassName("page-loading");
      });
    });

    return {
      authStore,
      isPublicRoute,
      showLoader
    };
  },
});
</script>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "nouislider/dist/nouislider.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "dropzone/dist/dropzone.css";
@import "@vueform/multiselect/themes/default.css";
@import "prism-themes/themes/prism-shades-of-purple.css";
@import "element-plus/dist/index.css";

// Main demo style scss
@import "assets/keenicons/duotone/style.css";
@import "assets/keenicons/outline/style.css";
@import "assets/keenicons/solid/style.css";
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

#app {
  display: contents;
}
</style>
