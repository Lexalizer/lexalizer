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
  children?: LawElementType[];
}

// only contains title and the SR-number (see in ScrapeResult-interface)
export interface Preface extends LawElement {
  type: 'preface';
  de_erlassTitel: string;
}

// Only acts as a container for Paragraphs
export interface Preamble extends LawElement {
  type: 'preamble';
}

// if followed by a footnote, the footnote belongs to this paragraph
// text may contain html-tags (mostly styling)
export interface Paragraph extends LawElement {
  type: 'paragraph';
  text: string;
}

// footnote has their corresponding content as a child
export interface Footnote extends LawElement {
  type: 'footnote';
  text: string;
  linkId: string;
}

// uniqueLeveLId is the full identifier, containing any parent-ids
// levelId is just the last part of said identifier, to easily get the current level
export interface Section extends LawElement {
  type: 'section';
  title: string;
  uniqueLevelId: string;
  levelId: string;
}

// this id is NOT UNIQUE, its uniqueness is determined by their parents and their levelIDs
export interface Article extends LawElement {
  type: 'article';
  title: string;
  id: string;
}