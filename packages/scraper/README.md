# Lexalizer scraper

## behaviour
scraped data may still contain some html-tags, as to fully get all relevant content the html-content was included.
This behaviour may be changed in the future, but currently there are too many unknown exceptions in the html-content
In development enviroment the last scraping result gets saved in `dist/result.json`, so you can inspect it.

## development
Use `pnpm dev` to watch for changes and automatically run the scraper, check the generated result in `dist/result.json`.

## possible extensions
introduce a scrape to get all "System Rechtssammlungsnummer" (System Law Collection Number) with SPARQL, small example:
```javascript
fetch("https://fedlex.data.admin.ch/sparqlendpoint", {
  "headers": {
    "accept": "application/sparql-results+json",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "SKOSMOS_SEARCH_LANG=; TS0102075e=019832244badda85064233a22def8fad776bbf09e2d2266b4aab2606366e9dde3e06e5f08e5cecf1d07d821aa152849500f0c805e9",
    "Referer": "https://fedlex.data.admin.ch/sparql",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "query=PREFIX+jolux%3A+%3Chttp%3A%2F%2Fdata.legilux.public.lu%2Fresource%2Fontology%2Fjolux%23%3E%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0Aselect+distinct++(str(%3FsrNotation)+as+%3FrsNr)+(str(%3FdateApplicability)+as+%3FdateApplicability)+%3Ftitle+%3Fabrev+%3FfileUrl+%7B%0A++filter(%3Flanguage+%3D+%3Chttp%3A%2F%2Fpublications.europa.eu%2Fresource%2Fauthority%2Flanguage%2FDEU%3E)%0A++%23FRA+%3D+fran%C3%A7ais%2C+ITA+%3D+italiano%2C+DEU+%3D+deutsch%2C+ENG+%3D+english%2C+ROH+%3D+rumantsch%0A++%0A++%3Fconsolidation+a+jolux%3AConsolidation+.%0A++%3Fconsolidation+jolux%3AdateApplicability+%3FdateApplicability+.%0A++optional+%7B+%3Fconsolidation+jolux%3AdateEndApplicability+%3FdateEndApplicability+%7D%0A++filter(xsd%3Adate(%3FdateApplicability)+%3C%3D+now()+%26%26+(!bound(%3FdateEndApplicability)+%7C%7C+xsd%3Adate(%3FdateEndApplicability)+%3E+now()))%0A++%0A++%3Fconsolidation+jolux%3AisRealizedBy+%3FconsoExpr+.%0A++%3FconsoExpr+jolux%3Alanguage+%3Flanguage+.%0A++%3FconsoExpr+jolux%3AisEmbodiedBy+%3FconsoManif+.%0A++%3FconsoManif+jolux%3AuserFormat+%3Chttps%3A%2F%2Ffedlex.data.admin.ch%2Fvocabulary%2Fuser-format%2Fhtml%3E+.%0A++%23for+pdf-files%3A+replace+doc+with+pdf-a%0A++%23for+html-files%3A+replace+doc+with+html%0A++%0A++%3FconsoManif+jolux%3AisExemplifiedBy+%3FfileUrl+.%0A++%0A++%3Fconsolidation+jolux%3AisMemberOf+%3Fcc+.%0A++%3Fcc+jolux%3AclassifiedByTaxonomyEntry%2Fskos%3Anotation+%3FsrNotation+.%0A++filter(datatype(%3FsrNotation)+%3D+%3Chttps%3A%2F%2Ffedlex.data.admin.ch%2Fvocabulary%2Fnotation-type%2Fid-systematique%3E)%0A%0A++optional+%7B%0A++++%3Fcc+jolux%3AisRealizedBy+%3FccExpr+.%0A++++%3FccExpr+jolux%3Alanguage+%3Flanguage+.%0A++++%3FccExpr+jolux%3Atitle+%3Ftitle+.%0A++++optional+%7B%3FccExpr+jolux%3AtitleShort+%3Fabrev+%7D%0A++%7D%0A%7D%0Aorder+by+%3FsrNotation%0A",
  "method": "POST"
});
```
