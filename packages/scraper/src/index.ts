import axios from 'axios';
import Cheerio from 'cheerio';
import fs from 'fs';
import {
  Paragraph,
  Preamble,
  Preface,
  ScrapeResult,
  LawElement,
  Section,
  Article
} from './interface/ScrapeResult';

export const scrape = (url: string): Promise<ScrapeResult> => {
  return axios
    .create()
    .get(url)
    .then((response) => {
      const scrapeResult: ScrapeResult = {
        url: '',
        title: '',
        de_systemRechtsSammlungsnummer: null,
        lawContent: {
          type: 'root',
          children: new Array<LawElement>()
        },
        footNoteMap: new Map<string, string>(),
        unhandledElements: false
      };
      const html = response.data;
      const $ = Cheerio.load(html);

      // get header information
      scrapeResult.url = url;
      scrapeResult.title = $('title:first').text();
      scrapeResult.de_systemRechtsSammlungsnummer = Number(
        $('.srnummer:first').text()
      );

      // get new work selector
      const lawContent = $('#lawcontent');
      if (!lawContent.length) {
        return;
      }
      // read footnotes into seperate map to ease visualization
      $('p[id^="fn"]').each((_i, element: cheerio.TagElement) => {
        scrapeResult.footNoteMap[element.attribs['id']] = $(element).html();
      });

      //begin recusively adding all elements
      addChildren($, lawContent, scrapeResult.lawContent);

      //write result to file for debugging purposes
      if (isDevEnviroment) {
        fs.writeFileSync(
          './dist/scrapeResult.json',
          JSON.stringify(scrapeResult, null, 2)
        );
      }
      return Promise.resolve(scrapeResult);
    })
    .catch((reason) => {
      return Promise.reject(reason);
    });
}

function addChildren(
  $: cheerio.Root,
  parent: cheerio.Cheerio,
  parentLawElement: LawElement
) {
  parent.children().each((_i, element: cheerio.TagElement) => {
    switch (element.type) {
      case 'tag':
        switch (element.name) {
          case 'div':
            switch (element.attribs['id']) {
              case 'preface':
                const preface: Preface = {
                  de_erlassTitel: $(element).children('.erlasstitel').html(),
                  children: new Array<LawElement>(),
                  type: 'preface'
                };
                //we already have the srnummer, so we can skip it
                preface.children.push({
                  html: $(element).children('p:not(.srnummer)').html(),
                  type: 'paragraph'
                } as Paragraph);
                parentLawElement.children.push(preface);
                break;
              case 'preamble':
                const preamble: Preamble = {
                  children: new Array<LawElement>(),
                  type: 'preamble'
                };
                parentLawElement.children.push(preamble);
                addChildren($, $(element), preamble);
                break;
              default:
                switch (element.attribs['class']) {
                  case 'footnotes':
                  case 'heading':
                    //ignore
                    break;
                  case 'collapseable':
                    addChildren($, $(element), parentLawElement);
                    break;
                  default:
                    console.warn(
                      'unhandled DIV-Element ' +
                        element.attribs['class'] +
                        ' ' +
                        element.attribs['id']
                    );
                    break;
                }
                break;
            }
            break;
          case 'p':
          case 'dl':
          case 'br':
            parentLawElement.children.push({
              html: $(element).html(),
              type: 'paragraph'
            } as Paragraph);
            break;
          case 'section':
            const section: Section = {
              children: new Array<LawElement>(),
              type: 'section',
              title: $(element).children(':first').find('a').html(),
              uniqueLevelId: $(element).attr('id')
            };
            //check for rougue footnote-links in the heading (when the relevant section has been removed, a footnote explains why)
            $(element)
              .children(':first')
              .find('a[href^="#fn"]')
              .each((_i, element: cheerio.TagElement) => {
                section.title += ' ' + $(element).prop('outerHTML');
              });
            parentLawElement.children.push(section);
            addChildren($, $(element), section);
            break;
          case 'main': //skip adding main itself
            addChildren($, $(element), parentLawElement);
            break;
          case 'article':
            const article: Article = {
              children: new Array<LawElement>(),
              type: 'article',
              title: $(element).children('h6:first').find('a').html(),
              id: $(element).attr('id')
            };
            //same hassle as with sections
            $(element)
              .children('h6:first')
              .find('a[href^="#fn"]')
              .each((_i, element: cheerio.TagElement) => {
                article.title += ' ' + $(element).prop('outerHTML');
              });
            parentLawElement.children.push(article);
            addChildren($, $(element), article);
            break;
          case 'a':
            //ignore
            break;
          default:
            switch (element.attribs['class']) {
              case 'heading':
                //ignore
                break;
              default:
                console.warn(
                  'unhandled Element ' +
                    element.name +
                    ': ' +
                    $(element).next().html()
                );
                break;
            }
        }
    }
  });
}

const isDevEnviroment = (): boolean => process.env.NODE_ENV !== 'production'

if (isDevEnviroment) {
  console.log('starting run');
  const url =
    'https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/24/233_245_233/20220101/de/html/fedlex-data-admin-ch-eli-cc-24-233_245_233-20220101-de-html-6.html'; // URL we're scraping
  scrape(url).then(() => console.log('finished run'));
}
