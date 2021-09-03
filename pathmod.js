var path=require("path");
var filepath=__filename;
console.log(filepath);
console.log(path.isAbsolute(filepath));
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
console.log(path.basename(filepath))
console.log(path.parse(filepath))