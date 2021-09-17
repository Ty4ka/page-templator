import _ from 'lodash'
import { TArticleItem, TTemplatePageOpts } from '../consts/types'
import { fullpageTmpl, TemplateBase } from './base'

class TemplateDarkBootstrap extends TemplateBase {
  getHeadSection() {
    return `
        ${super.getHeadSection()}
        <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link rel="stylesheet" href="/wp-content/themes/wp/css/mdb.dark.min.css" />
    `
  }

  getBodyStart() {
    return `
      <header>
        <div
            class="p-5 text-center bg-image "
            style="
            height: 350px;
            background-image: url(<!--BACKGROUNDURL-->);
            "
        >
            <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
            <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-white">
                <h1 class="mb-3">{H1}</h1>
                <h4 class="mb-3">
                    <!--SUBHEADING-->
                </h4>
                <form class="d-flex input-group w-auto" method="GET" action="/">
                    <div class="input-group">
                    <input
                        name="q"
                        type="search"
                        class="form-control rounded"
                        placeholder="<!--SEARCHPLACEHOLDER-->"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    <div class="input-group-text">
                        <button class="input-group-text border-0">
                        <i class="fas fa-search"></i>
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </header>      
      `
  }

  getBodyEnd() {
    return `
      <script type="text/javascript" src="/wp-content/themes/wp/js/mdb.min.js"></script>
      `
  }

  getContent(opts?: TTemplatePageOpts) {
    switch (opts?.pageType) {
      case 'main':
        return `
          ${this.getNewsList(opts?.articleItems)}
        `

      case 'article':
        return this.getArticle(opts?.articleContent)
    }

    return ``
  }

  getFullPage(opts?: TTemplatePageOpts) {
    const { title, h1 = '', lang = 'en', description = '', keywords = '', author = '', keyValues } = this._settings

    let html = fullpageTmpl
      .replaceAll('{HEAD_SECTION}', this.getHeadSection())
      .replaceAll('{BODY_START}', this.getBodyStart())
      .replaceAll('{CONTENT}', this.getContent(opts))
      .replaceAll('{BODY_END}', this.getBodyEnd())
      .replaceAll('{TITLE}', title)
      .replaceAll('{LANG}', lang)
      .replaceAll('{DESCRIPTION}', description)
      .replaceAll('{KEYWORDS}', keywords)
      .replaceAll('{AUTHOR}', author)
      .replaceAll('{H1}', h1)

    if (keyValues) {
      for (const key in Object.keys(keyValues)) {
        html = html.replaceAll(`<!--${key.toUpperCase()}-->`, keyValues[key])
      }
    }

    return html
  }

  private getArticle(articleContent?: string) {
    return `
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-8 col-md-12 mb-4">
          ${articleContent || 'Loading...'}
        </div>
      </div>
    </div>
    `
  }

  private getNewsList(articleItems?: TArticleItem[]) {
    if (!articleItems?.length) {
      return ``
    }

    let rows = ''
    const rowPerCount = 3

    for (let i = 0; i < articleItems.length; i += rowPerCount) {
      const rowType =
        i < rowPerCount * 2
          ? 'img-overlay'
          : _.shuffle([
              // 'micro',
              'card',
              // 'card-featured',
              'card-vertical',
              'img-overlay'
            ])[0]
      const continueText = _.shuffle(['Watch', 'Read'])[0]

      rows += this.getRow(articleItems.slice(i, i + rowPerCount), rowType, continueText)
    }

    return `
      <div class="container h-100 my-5">
        <section>
          <div class="text-center">
            <h4><strong>TREND NEWS</strong></h4>
            <hr class="my-4" />
          </div>
          ${rows}
          <hr class="my-4" />
        </section>
      </div>
    `
  }

  private getRow(articleItems: TArticleItem[], rowType: string, continueText: string) {
    if (!articleItems?.length) {
      return ``
    }

    const block1 = `
      <div class="col-lg-4 col-md-12 mb-4 align-self-center">
        ${this.getRowItem(articleItems[0], rowType, continueText)}
      </div>
    `

    const rowItem2 = this.getRowItem(articleItems[1], rowType, continueText)
    const block2 =
      (rowItem2 &&
        `<div class="col-lg-4 col-md-6 mb-4 align-self-center ">
      ${rowItem2}
      </div>
    `) ||
      ''

    const rowItem3 = this.getRowItem(articleItems[2], rowType, continueText)
    const block3 =
      (rowItem3 &&
        `<div class="col-lg-4 col-md-6 mb-4 align-self-center ">
      ${rowItem3}
      </div>`) ||
      ''

    return `<div class="row justify-content-center">${_.shuffle([block1, block2, block3]).join('')}</div>`
  }

  private getRowItem(articleItem: TArticleItem, type: string, continueText: string = 'Watch', featured: string = '') {
    if (!articleItem) {
      return ''
    }

    const title = articleItem.title || ''
    const href = articleItem.href || ''
    const thumb = articleItem.thumb || ''
    const description = ''
    const lastUpdated = ''

    switch (type) {
      case 'micro':
        return `
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text"></p>
              <a href='${href}' target="_blank" class="btn btn-primary">${continueText}</a>
            </div>
          </div>
        `

      case 'img-overlay':
        return `
          <a href="${href}" target="_blank" class="card bg-dark text-white shadow-1-strong mb-4">
            <div class="bg-image">
              <img src="${thumb}"  alt="${title}" class="img-fluid" loading="lazy" />
              <div class="mask" style="background-color: rgba(${_.random(0, 255)}, ${_.random(0, 255)}, ${_.random(
          0,
          255
        )}, 0.${_.random(600, 700)})"></div>
            </div>
            <div class="card-img-overlay">
              <h2 class="card-title" style="background: #0000008c;padding: 10px;">${title}</h2>
              <p class="card-text">${description}</p>
              <p class="card-text">${lastUpdated}</p>
            </div>
          </a>
        `

      case 'card':
        return `
          <div class="card  mb-4">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
              <img src="${thumb}"  alt="${title}" class="img-fluid" loading="lazy" />
              <a href="${href}" target="_blank" >
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
              </a>
            </div>
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <a href="${href}" target="_blank" class="btn btn-primary">${continueText}</a>
            </div>
          </div>
        `

      case 'card-featured':
        return `
           <div class="card text-center mb-4">
              <div class="card-header bg-white">${featured}</div>
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="${href}" target="_blank" class="btn btn-primary">${continueText}</a>
              </div>
              <div class="card-footer bg-white text-muted">${lastUpdated}</div>
            </div>
        `

      case 'card-vertical':
        return `
          <a href="${href}" target="_blank" class="card mb-4" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${thumb}" alt="${title}" loading="lazy" class="accordion-body img-fluid" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}</p>
                  <p class="card-text">
                    <small class="text-muted">${lastUpdated}</small>
                  </p>
                </div>
              </div>
            </div>
          </a>
        `
    }

    return ''
  }
}

export { TemplateDarkBootstrap }
