parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"X3SZ":[function(require,module,exports) {
var e=require("@babel/runtime/helpers/interopRequireDefault"),n=e(require("@babel/runtime/helpers/slicedToArray")),o=require("child_process"),r=o.execSync,i=require("path"),l=require("fs"),t=/(\/\/\s*flow-uncovered-line[\s:]?.*|\/\*\s*flow-uncovered-line(\s+[^*]*)?\*\/)/,s=/(\/\/\s*flow-(next-uncovered|uncovered-next)-line|\/\*\s*flow-(next-uncovered|uncovered-next)-line(\s+[^*]*)?\*\/)/,u=function(e,n){var o=n.split("\n"),r={},i={},l=[],u=[],a=!1,f=!1,c=0,d=0;return i[0]=0,o.forEach(function(e,n){if(i[n+=1]=i[n-1]+e.length+1,e.match(/^\s*\/\* flow-uncovered-block \*\//))return a&&u.push([d,n-1]),a=!0,void(d=n);if(e.match(/^\s*\/\* end flow-uncovered-block \*\//)){if(!a)throw new Error("unmatched end ignore pragma");return a=!1,void l.push([d,n])}f||t.test(e)?(f=!1,r[n]=!0):a&&(r[n]=!0),f=s.test(e),c=n}),{unmatchedBlocks:u,ignoredLines:r,ignoredBlocks:l,numLines:c,lineOffsets:i}},a=function(e,o,r){var i={},l={},t=[],s=o.ignoredLines,u=o.ignoredBlocks,a=o.numLines,f=o.lineOffsets;o.unmatchedBlocks.forEach(function(o){var r=(0,n.default)(o,2),i=r[0],l=r[1];t.push({path:e,start:{line:i,column:0},end:{line:l,column:0},annotationLevel:"failure",message:"Unmatched /* flow-uncovered-block */",offset:f[i]})}),r.forEach(function(n){var o=n.start,r=n.end;if(!i[o.line]){var u=o.line===r.line;if(l[o.line]=!0,u)s[o.line]||(i[o.line]=!0,t.push({path:e,start:o,end:r,annotationLevel:"failure",message:"The expression from "+o.line+":"+o.column+"-"+r.column+" is not covered by flow! If it's unavoidable, put '// flow-uncovered-line' at the end of the line",offset:o.offset}));else{for(var a=!0,f=o.line;f<=r.line;f++)s[f]||(a=!1),l[f]=!0;a||(i[o.line]=!0,t.push({path:e,start:o,end:r,annotationLevel:"failure",message:"The expression from "+o.line+":"+o.column+"-"+r.line+":"+r.column+" is not covered by flow! If it's unavoidable, surround the expression in '/* flow-uncovered-block */' and '/* end flow-uncovered-block */'",offset:o.offset}))}}});for(var c=0,d=u.shift(),v=1;v<=a;v++){if(s[v]&&!l[v])if(d&&d[0]<=v&&v<=d[1])c+=1;else{var h=f[v]-1;t.push({path:e,start:{line:v,column:0},end:{line:v,column:0},annotationLevel:"failure",message:"The expression in line "+v+" is covered by flow! You should remove any '// flow-uncovered-line' or '/* flow-uncovered-block */' comments applying to this line.",offset:h})}if(d&&v===d[1]){var m=d[1]-d[0],p=f[d[0]]-1;m>0&&c/m>.8&&t.push({path:e,start:{line:d[0],column:0},end:{line:d[1],column:0},annotationLevel:"failure",message:"More than "+Math.floor(80)+"% of lines in the 'flow-uncovered-block' from lines "+d[0]+"-"+d[1]+" are covered by flow! You should remove this comment from the entire block and instead cover individual lines using '// flow-uncovered-line'.",offset:p}),c=0,d=u.shift()}}return t},f=function(e,n){var o=r(i.resolve(e)+" coverage --json "+n).toString("utf8");return JSON.parse(o)},c=function(e){return e.split("\n").includes("/* flow-uncovered-file */")},d=function(e,n){var o=l.readFileSync(n).toString("utf8");if(c(o))return[];if(!o.includes("@flow"))return[];try{var r=f(e,n);if(!r.expressions.uncovered_count)return[];var i=u(n,o);return a(n,i,r.expressions.uncovered_locs)}catch(t){return[{path:n,start:{line:0,column:0},end:{line:0,column:0},annotationLevel:"failure",message:"Unable to run flow coverage: "+t.message,offset:0}]}};module.exports=d;
},{}],"W7fX":[function(require,module,exports) {
var e=require("@babel/runtime/helpers/interopRequireDefault"),r=e(require("@babel/runtime/helpers/toArray")),t=e(require("@babel/runtime/regenerator")),n=e(require("@babel/runtime/helpers/toConsumableArray"));function o(e){var r=0;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=a(e)))return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=e[Symbol.iterator]()).next.bind(r)}function a(e,r){if(e){if("string"==typeof e)return l(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?l(e,r):void 0}}function l(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}require("@babel/register");var i=require("./flow-coverage-linter"),s=require("actions-utils/send-report");function u(e,r){var a,l,u,c,f,p;return t.default.async(function(b){for(;;)switch(b.prev=b.next){case 0:if((a=r.filter(function(e){return e.endsWith(".js")})).length){b.next=4;break}return console.log("No files given"),b.abrupt("return");case 4:l=[],u=o(a);case 6:if((c=u()).done){b.next=14;break}return f=c.value,b.next=10,t.default.awrap(i(e,f));case 10:p=b.sent,l.push.apply(l,(0,n.default)(p));case 12:b.next=6;break;case 14:return b.next=16,t.default.awrap(s("Flow-coverage",l));case 16:case"end":return b.stop()}},null,null,null,Promise)}var c=(0,r.default)(process.argv),f=c[0],p=c[1],b=c[2],v=c.slice(3);if(b)u(b,v).catch(function(e){console.error(e),process.exit(1)});else{var y=process.env["INPUT_FLOW-BIN"],d=process.env.INPUT_FILES;y?d?u(y,d.split(":::")).catch(function(e){console.error(e),process.exit(1)}):(console.log('Must supply "files" argument'),process.exit(1)):(console.log("Must supply flow-bin argument"),process.exit(1))}
},{"./flow-coverage-linter":"X3SZ"}]},{},["W7fX"], null)
//# sourceMappingURL=/flow-coverage.js.map