import TyFormViewer from './components/TyFormViewer.vue'

import pkg from '../package.json'
const { version } = pkg

function install (app) {
  app.component(TyFormViewer.name, TyFormViewer)
}

export {
  version,
  TyFormViewer,

  install
}
