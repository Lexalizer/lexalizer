// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
           @use "sass:math";
           @import "@/assets/styles/variables.scss";
           @import "@/assets/fonts/notosans.css";
          `
        }
      }
    }
  },
});
