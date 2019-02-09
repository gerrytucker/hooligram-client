import { API_INIT_REQUEST } from '@state/actions/api'

let ws

const api = getOrCreateWsClient => store => next => action => {
  if (action.type === API_INIT_REQUEST) { 
    ws = getOrCreateWsClient(store)
    return next(action)
  }

  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  actionString = JSON.stringify({
    ...action,
    type: action.type.replace('API:', '')
  })
  ws.send(actionString)

  return next(action)
}

export default api
