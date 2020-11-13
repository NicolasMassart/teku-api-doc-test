// This is a CI debug script only that simulates the real spec extraction
// and generates an incremented version numbereach time

'use strict'

const fs = require('fs')
var crypto = require("crypto")

let spec = require('./spec/teku.json')


const tag = process.env.CIRCLE_TAG

console.log(tag)

if (tag){
  spec.info.version = tag
}
else {
  var id = crypto.randomBytes(4).toString('hex')
  var version = spec.info.version.split('-')
  var versionNum = version[0].split('.')
  const parsedReleaseNum = Number.parseInt(versionNum[2], 10)
  versionNum[2] = parsedReleaseNum + 1
  spec.info.version = `${versionNum.join('.')}-${version[1]}-${id}`
}
console.log(spec.info)

let data = JSON.stringify(spec);
fs.writeFileSync('./spec/teku.json', data);
