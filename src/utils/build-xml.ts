import { create } from 'xmlbuilder2';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { fromByteArray } from 'base64-js';

const toString = Object.prototype.toString;

function getType(obj: any) {
  var m = toString.call(obj).match(/\[object (.*)\]/);
  return m ? m[1] : m;
}

function ISODateString(d: Date) {
  function pad(n: number) {
    return n < 10 ? '0' + n : n;
  }
  return (
    d.getUTCFullYear() +
    '-' +
    pad(d.getUTCMonth() + 1) +
    '-' +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    ':' +
    pad(d.getUTCMinutes()) +
    ':' +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function toPlist(target: any) {
  const root = create()
    .dec({
      version: '1.0',
      encoding: 'UTF-8',
    })
    .ele('plist')
    .dtd({
      pubID: '-//Apple//DTD PLIST 1.0//EN',
      sysID: 'http://www.apple.com/DTDs/PropertyList-1.0.dtd',
    })
    .att('version', '1.0');

  const traverseItem = (xml: XMLBuilder, doc: any) => {
    const type = getType(doc);


    if (type === 'Undefined') {
      return;
    } else if (Array.isArray(doc)) {
      xml = xml.ele('array');
      for (let i = 0; i < doc.length; i++) {
        traverseItem(xml, doc[i]);
      }
      xml = xml.up();
    } else if (Buffer.isBuffer(doc)) {
      xml = xml.ele('data').txt(doc.toString('base64')).up();
    } else if (type === 'Object') {
      xml = xml.ele('dict');
      for (const prop in doc) {
        xml = xml.ele('key').txt(prop).up();
        traverseItem(xml, doc[prop]);
      }
      xml.up();
    } else if (type === 'Number') {
      const tagType = doc % 1 === 0 ? 'integer' : 'real';
      xml = xml.ele(tagType).txt(doc.toString()).up();
    } else if (type === 'Date') {
      xml = xml
        .ele('date')
        .txt(ISODateString(new Date(doc)))
        .up()
        .up();
    } else if (type === 'Boolean') {
      xml = xml.ele(doc ? 'true' : 'false').up();
    } else if (type === 'String') {
      xml = xml.ele('string').txt(doc).up();
    } else if (type === 'ArrayBuffer') {
      xml = xml.ele('data').txt(fromByteArray(doc)).up();
    } else if (doc && doc.buffer && getType(doc.buffer) === 'ArrayBuffer') {
      xml = xml
        .ele('data')
        .txt(fromByteArray(new Uint8Array(doc.buffer)))
        .up();
    }
  };

  traverseItem(root, target);
  const xmlResult = root.up().end({
    prettyPrint: true,
  });
  return xmlResult;
}
