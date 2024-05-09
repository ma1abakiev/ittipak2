export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root
  },
  register() {
    return pathKeys.root.concat('register/')
  },
  login() {
    return pathKeys.root.concat('login/')
  },
  page404() {
    return pathKeys.root.concat('404/')
  },
  article: {
    root() {
      return pathKeys.root.concat('article/')
    },
    byId(params: { id: number }) {
      return pathKeys.article.root().concat(String(params.id), '/')
    },
    update(params: { id: number }) {
      return pathKeys.article.root().concat('edit/', String(params.id), '/')
    },
  },
  
}