window.app2Url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : 'http://localhost:3002/app2'

import('./bootstrap')
