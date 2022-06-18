import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/24/233_245_233/20220101/de/html/fedlex-data-admin-ch-eli-cc-24-233_245_233-20220101-de-html-6.html'; // URL we're scraping
const AxiosInstance = axios.create();

AxiosInstance.get(url)
  .then(
    response => {
      const html = response.data;
      const $ = cheerio.load(html);
      // $()
      console.log(html);
    }
  )
  .catch(console.error);