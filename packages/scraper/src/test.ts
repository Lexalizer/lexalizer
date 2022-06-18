import { ScrapeResult } from './interface/ScrapeResult';

const testObject: ScrapeResult = {
  title: 'fedlex-data-admin-ch-eli-cc-24-233_245_233-20220101-de-docx-3',
  de_systemRechtsSammlungsnummer: 210,
  url: 'https://www.fedlex.ch/fedlex/fedlex-data-admin-ch-eli-cc-24-233_245_233-20220101-de-docx-3',
  lawContent: {
    children: [
      {
        type: 'preface',
        de_erlassTitel: 'Schweizerisches Zivilgesetzbuch',
        children: [
          {
            type: 'paragraph',
            text: 'vom 10. Dezember 1907 (Stand am 1. Januar 2022)'
          }
        ]
      },
      {
        type: 'preamble',
        children: [
          {
            type: 'paragraph',
            text: 'Die Bundesversammlung der Schweizerischen Eidgenossenschaft,'
          },
          {
            type: 'paragraph',
            text: 'gestützt auf Artikel 64 der Bundesverfassung',
            children: [
              {
                type: 'footnote',
                text: '1',
                linkId: 'fn-d6e20',
                children: [
                  {
                    type: 'paragraph',
                    text: '<sup>1</sup><sup> </sup>[BS <b>1</b> 3]. Dieser Bestimmung\nentspricht Artikel 122 der Bundesverfassung vom 18. April 1999 (<a href="https://fedlex.data.admin.ch/eli/cc/1999/404">SR <b>101</b></a>).'
                  }
                ]
              },
              {
                type: 'paragraph',
                text: ','
              },
              {
                type: 'footnote',
                text: '2',
                linkId: 'fn-d6e35',
                children: [
                  {
                    type: 'paragraph',
                    text: '<sup>2</sup> Fassung gemäss Anhang Ziff. 2 des Gerichtsstandsgesetzes vom 24. März 2000, in Kraft seit 1. Jan. 2001 (<a href="https://fedlex.data.admin.ch/eli/oc/2000/374">AS <b>2000</b> 2355</a>; <i>BBl <b>1999</b> 2829</i>).'
                  }
                ]
              }
            ]
          },
          {
            type: 'paragraph',
            text: 'nach Einsicht in eine Botschaft des Bundesrates vom 28. Mai 1904',
            children: [
              {
                type: 'footnote',
                text: '3',
                linkId: 'fn-d6e54',
                children: [
                  {
                    type: 'paragraph',
                    text: '<a href="https://fedlex.data.admin.ch/eli/fga/1904/4_1_1_">BBl <b>1904</b> IV 1</a>, <b></b><a href="https://fedlex.data.admin.ch/eli/fga/1907/6_367__"><b>1907</b> VI 367</a>'
                  }
                ]
              },
              {
                type: 'paragraph',
                text: ','
              }
            ]
          },
          {
            type: 'paragraph',
            text: 'beschliesst:'
          }
        ]
      }
    ]
  }
};
