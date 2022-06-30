export interface ScrapeResult {
  url: string;
  title: string;
  de_systemRechtsSammlungsnummer: number;
  lawContent: LawElement;
}

type LawElementType =
  | Preface
  | Preamble
  | Paragraph
  | Footnote
  | Section
  | Article;

export interface LawElement {
  children: LawElement[],
  type: LawElementType;
}

// only contains title and the SR-number (see in ScrapeResult-interface)
export interface Preface extends LawElement {
  type: Preface;
  de_erlassTitel: string;
}

// Only acts as a container for Paragraphs
export interface Preamble extends LawElement {
  type: Preamble;
}

// if followed by a footnote, the footnote belongs to this paragraph
// text may contain html-tags (mostly styling)
export interface Paragraph extends LawElement {
  type: Paragraph;
  text: string;
}

// footnote has their corresponding content as the text attribute
export interface Footnote extends LawElement {
  type: Footnote;
  text: string;
  linkId: string;
}

// uniqueLeveLId is the full identifier, containing any parent-ids
// levelId is just the last part of said identifier, to easily get the current level
export interface Section extends LawElement {
  type: Section;
  title: string;
  uniqueLevelId: string;
  levelId: string;
}

// this id is NOT UNIQUE, its uniqueness is determined by their parents and their levelIDs
export interface Article extends LawElement {
  type: Article;
  title: string;
  id: string;
}
