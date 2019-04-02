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

export function formdata(obj) {
  let formdata = new FormData();
  for(let key in obj) {
    formdata.append(key, obj[key])
  }
  return formdata;
}

export function uploadImgToBase64 (file) {
  return new Promise((resolve, reject) => {
   const reader = new FileReader()
   reader.readAsDataURL(file)
   reader.onload = function () { // 图片转base64完成后返回reader对象
    resolve(reader)
   }
   reader.onerror = reject
  })
 }