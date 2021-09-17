import { ITemplateBase, TTemplateSettings } from '../consts/types'

class TemplateBase implements ITemplateBase {
  protected _settings: TTemplateSettings

  constructor(settings: TTemplateSettings) {
    this._settings = settings
  }

  getHeadSection() {
    return `<meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>{TITLE}</title>
    <meta name="description" content="{DESCRIPTION}">
    <meta name="keywords" content="{KEYWORDS}">
    <meta name="author" content="{AUTHOR}">
    <link rel="icon" href="favicon.ico" type="image/x-icon" />`
  }

  getBodyStart() {
    return ``
  }
  getBodyEnd() {
    return ``
  }

  getContent() {
    return ``
  }

  getFullPage() {
    return ``
  }
}

export const fullpageTmpl: string = `<!DOCTYPE html>
<html lang="{LANG}">
  <head>
    {HEAD_SECTION}    
  </head>
  <body>
    {BODY_START}
    {CONTENT}
    {BODY_END}
  </body>
</html>`

export { TemplateBase }
