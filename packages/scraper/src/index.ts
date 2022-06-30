import axios from 'axios';
import Cheerio from 'cheerio';
import {
  Paragraph,
  Preamble,
  Preface,
  ScrapeResult,
  LawElement,
  Footnote,
  Section
} from './interface/ScrapeResult';

export function scrape(url: string): Promise<ScrapeResult> {
  let ScrapeResult = {
    url: '',
    title: '',
    de_systemRechtsSammlungsnummer: null,
    lawContent: {
      children: []
    }
  } as ScrapeResult;
  axios
    .create()
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = Cheerio.load(html);

      // get header information
      ScrapeResult.url = url;
      ScrapeResult.title = $('title:first').text();
      ScrapeResult.de_systemRechtsSammlungsnummer = Number(
        $('.srnummer:first').text()
      );

      // get new work selector
      let lawContent = $('#lawcontent');
      if (!lawContent.length) {
        return;
      }
      console.log($('p[id^="#fn"]').length)
      // addChildren($, lawContent, ScrapeResult.lawContent);
      console.log('-------------------------------------')
      console.log(ScrapeResult.lawContent.children);
    })
    .catch((reason) => {
      return Promise.reject(reason);
    });
  return Promise.resolve(ScrapeResult);
}

function addChildren(
  $: cheerio.Root,
  parent: cheerio.Cheerio,
  parentLawElement: LawElement
) {
  parent.children().each((i, element: cheerio.TagElement) => {
    console.log('type: '+element.name+' id: '+element.attribs['id']+' class: '+element.attribs['class']);
    switch (element.type) {
      case 'tag':
        switch (element.name) {
          case 'div':
            switch (element.attribs['id']) {
              case 'preface':
                var preface = {
                  de_erlassTitel: $(element).children('.erlasstitel').text(),
                  children: []
                } as Preface;
                parentLawElement.children.push(preface);
                preface.children.push({
                  text: $(element).children('p:not(.srnummer)').text()
                } as Paragraph);
                break;
              case 'preamble':
                var preamble = { children: [] } as Preamble;
                parentLawElement.children.push(preamble);
                addChildren($, $(element), preamble);
                break;
              default:
                switch (element.attribs['class']) {
                  case 'footnotes':
                    // addChildren($, $(element), parentLawElement);
                    //TODO: need to rework footnotes, probably parse paragraphs for <a> tags with fn*-ids and then select for the mentioned id
                    // maybe a wildcard also works? e.g. fn*
                    break;
                }
                break;
            }
            break;
          case 'p':
            // is it a footnote
            if(element.attribs['id'] !== undefined && element.attribs['id'].substring(0,2) === 'fn') {
              //remove <sup> tag and content (PS: Thanks GitHub Copilot, very cool)
              var footNoteText = $(element).html().replace(/<sup>.*<\/sup>/, '');
              var footnote = {
                linkId: element.attribs['id'],
                text: footNoteText,
              } as Footnote;
              parentLawElement.children.push(footnote);
            } else {
              parentLawElement.children.push({
                text: $(element).text()
              } as Paragraph);
            }
            break;
          case 'section':
            var section = { } as Section;
            console.log($(element).children('h1, a').text())
            if ($(element).children('h1').length) { // better safe than sorry
              section.title = $(element).children('h1, a').text()
              section.uniqueLevelId = $(element).children('h1, a').text();
            }
            break;
          case 'main': //skip adding main
            addChildren($, $(element), parentLawElement);
        }
    }
    // console.log(elementObject);
    // console.log(i + ' : ' + elementObject);
    // console.log(i + ' : ' + elementObject.name);
    // switch (elementObject.type) {
    // }
    // case
  });
}

//DEBUG: uncomment to test
const url =
  'https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/24/233_245_233/20220101/de/html/fedlex-data-admin-ch-eli-cc-24-233_245_233-20220101-de-html-6.html'; // URL we're scraping
scrape(url);
