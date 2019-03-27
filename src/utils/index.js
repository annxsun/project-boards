export function parseUrlParam(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function urlVariableAssignment(url, map) {
  return url.replace(/{(\w+)}/g, function (origin, match, index) {
    return map[match];
  });
}