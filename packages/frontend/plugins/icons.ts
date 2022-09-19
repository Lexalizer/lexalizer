import Unicon from 'vue-unicons/dist/vue-unicons.es';
import { uniAngleLeft, uniEstate } from 'vue-unicons/dist/icons';
Unicon.add([uniAngleLeft, uniEstate]);

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(Unicon as any, {
    height: 32,
    width: 32,
    fill: '#243046'
  });
});
