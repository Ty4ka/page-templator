# Page templator

```javascript
const html = new TemplateDarkBootstrap({
  title,
  h1,
  lang: 'en',
  description,
  keyValues: {
    backgroundUrl,
    subheading,
    searchplaceholder: 'Search...',
    ...keyValues
  }
}).getFullPage({ pageType: 'main', articleItems: [] })
```
