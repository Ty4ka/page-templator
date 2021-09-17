export type TArticleItem = {
  title: string
  href: string
  thumb?: string
  comments?: any[]
}

export type TTemplateSettings = {
  title: string
  h1?: string
  lang?: string
  description?: string
  keywords?: string
  author?: string
  keyValues?: { [key: string]: string }
}

export type TTemplatePageOpts = {
  pageType?: 'main' | 'article'
  articleItems?: TArticleItem[]
  articleContent?: string
}

export interface ITemplateBase {
  getHeadSection(): string
  getBodyStart(): string
  getBodyEnd(): string
  getContent(): string
  getFullPage(): string
}
