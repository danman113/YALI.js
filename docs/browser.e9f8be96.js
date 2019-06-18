parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"p8GN":[function(require,module,exports) {
function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(n,r){return!r||"object"!==t(r)&&"function"!=typeof r?e(n):r}function e(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&i(t,n)}function i(t,n){return(i=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function c(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function a(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,n,e){return n&&a(t.prototype,n),e&&a(t,e),t}var s=function(t){return t||""},f=function(){function t(n,e,r){c(this,t),this.msg=n,this.startCoordinates=e,this.endCoordinates=r}return u(t,[{key:"toString",value:function(){return this.msg}}]),t}(),d=function(t){function e(t,o){return c(this,e),n(this,r(e).call(this,"".concat(s(o.lexeme&&'at "'.concat(o.lexeme,'": '))).concat(t),o.startCoordinates,o.endCoordinates))}return o(e,f),e}(),l=function t(n){c(this,t),this.value=n},p=function(t,n,e){return new f(t,n,e)},y=function(t,n){return n.type===n.EOF?new f(t,n.startCoordinates,n.endCoordinates):new f("".concat(s(n.lexeme&&'at "'.concat(n.lexeme,'": '))).concat(t),n.startCoordinates,n.endCoordinates)},b=function(t,n){return new d(t,n)},m=function(t,n){if(t instanceof f){var e=n.lastIndexOf("\n",t.startCoordinates.index),r=e<0?0:e,o=n.substring(r,t.startCoordinates.index),i=n.substring(t.startCoordinates.index,t.endCoordinates.index),c=n.indexOf("\n",t.endCoordinates.index),a=c<0?n.length:c,u=n.substring(t.endCoordinates.index,a);return{oneLiner:"".concat(t instanceof d?"Runtime Error":"Parse Error",": ").concat(t.toString()," at ").concat(t.endCoordinates.line,":").concat(t.endCoordinates.col+1),preErrorSection:o,errorSection:i,postErrorSection:u}}return{oneLiner:"Unexpected javascript Error: ".concat(t)}};module.exports={error:p,LoxError:f,ReturnError:l,runtimeError:b,parseError:y,formatLoxError:m};
},{}],"u74b":[function(require,module,exports) {
function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}var i=require("./errors"),s=i.LoxError,r=function(){},o="\n  LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE,\n  COMMA, DOT, MINUS, PLUS, SEMICOLON, SLASH, STAR,\n\n  BANG, BANG_EQUAL,\n  EQUAL, EQUAL_EQUAL,\n  GREATER, GREATER_EQUAL,\n  LESS, LESS_EQUAL,\n\n  IDENTIFIER, STRING, NUMBER,\n\n  AND, CLASS, ELSE, FALSE, FUN, FOR, IF, NIL, OR,\n  PRINT, RETURN, SUPER, THIS, TRUE, VAR, WHILE,\n\n  EOF\n".split(",").map(function(t){return t.trim()}),h={};o.forEach(function(t,n){h[t]=n});var u={and:h.AND,class:h.CLASS,else:h.ELSE,false:h.FALSE,for:h.FOR,fun:h.FUN,if:h.IF,nil:h.NIL,or:h.OR,print:h.PRINT,return:h.RETURN,super:h.SUPER,this:h.THIS,true:h.TRUE,var:h.VAR,while:h.WHILE},c={"(":function(t){t.addToken(h.LEFT_PAREN)},")":function(t){t.addToken(h.RIGHT_PAREN)},"{":function(t){t.addToken(h.LEFT_BRACE)},"}":function(t){t.addToken(h.RIGHT_BRACE)},",":function(t){t.addToken(h.COMMA)},".":function(t){a(t.peek())?t.handleNumberLiterals():t.addToken(h.DOT)},"-":function(t){t.addToken(h.MINUS)},"+":function(t){t.addToken(h.PLUS)},";":function(t){t.addToken(h.SEMICOLON)},"/":function(t){if(t.nextMatch("/"))for(;"\n"!==t.peek()&&""!==t.peek();)t.chomp();else t.addToken(h.SLASH)},"*":function(t){t.addToken(h.STAR)},"!":function(t){t.addToken(t.nextMatch("=")?h.BANG_EQUAL:h.BANG)},"=":function(t){t.addToken(t.nextMatch("=")?h.EQUAL_EQUAL:h.EQUAL)},">":function(t){t.addToken(t.nextMatch("=")?h.GREATER_EQUAL:h.GREATER)},"<":function(t){t.addToken(t.nextMatch("=")?h.LESS_EQUAL:h.LESS)}," ":r,"\t":r,"\r":r,"\n":function(t){t.newline()},'"':function(t){t.handleStringLiterals()}},a=function(t){return/\d/.test(t)},l=function(t){return/[a-zA-Z_]/.test(t)},f=function(t){return l(t)||a(t)},d=function(){function n(e){t(this,n),this.source=e,this.length=e.length,this.tokens=[],this.startPosition=null,this.column=0,this.start=0,this.line=1,this.current=0}return e(n,null,[{key:"tokens",get:function(){return o}},{key:"tokenEnum",get:function(){return h}}]),e(n,[{key:"handleStringLiterals",value:function(){for(;'"'!==this.peek()&&""!==this.peek();)"\n"===this.peek()&&this.newline(),this.chomp();if(""===this.peek())throw new s("Unfinished string",this.startPosition,this.endPosition);this.chomp();var t=this.source.substring(this.start+1,this.current-1);this.addToken(h.STRING,t)}},{key:"handleNumberLiterals",value:function(){for(var t=!1;a(this.peek())||!t&&"."===this.peek();)"."===this.peek()&&(t=!0),this.chomp();var n=this.source.substring(this.start,this.current);this.addToken(h.NUMBER,parseFloat(n))}},{key:"handleIdentifiers",value:function(){for(;f(this.peek());)this.chomp();var t=this.source.substring(this.start,this.current);u[t]?this.addToken(u[t],t):this.addToken(h.IDENTIFIER,t)}},{key:"scanTokens",value:function(){for(;this.current<this.length;){var t=this.chomp();if(this.startPosition=new E(this.column-1,this.line,this.current-1),c[t])c[t](this);else if(a(t))this.handleNumberLiterals();else{if(!l(t))throw new s("Unexpected character ".concat(t),this.startPosition,new E(this.column,this.line,this.current));this.handleIdentifiers()}this.start=this.current}return this.addToken(h.EOF),this.tokens}},{key:"addToken",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=this.source.substring(this.start,this.current);this.tokens.push(new k(t,e,n,new E(this.column,this.line,this.current),this.startPosition))}},{key:"increment",value:function(){this.current++,this.column++}},{key:"newline",value:function(){this.line++,this.column=0}},{key:"chomp",value:function(){return this.increment(),this.source.charAt(this.current-1)}},{key:"peek",value:function(){return this.source.charAt(this.current)}},{key:"nextMatch",value:function(t){return this.peek()===t&&(this.increment(),!0)}},{key:"endPosition",get:function(){return new E(this.column-1,this.line,this.current)}}]),n}(),E=function n(e,i,s){t(this,n),this.col=e,this.line=i,this.index=s},k=function n(e,i,s,r,o){t(this,n),this.type=e,this.lexeme=i,this.literal=s,this.startCoordinates=o,this.endCoordinates=r};module.exports=d;
},{"./errors":"p8GN"}],"39eF":[function(require,module,exports) {
function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(n,e){return!e||"object"!==t(e)&&"function"!=typeof e?i(n):e}function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function e(t){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&r(t,n)}function r(t,n){return(r=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function s(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var h=function t(n,i,e){s(this,t),this.left=n,this.operator=i,this.right=e},u=function(t){function i(){return s(this,i),n(this,e(i).apply(this,arguments))}return o(i,h),i}(),c=function t(n,i){s(this,t),this.operator=n,this.right=i},a=function t(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"regular";s(this,t),this.context=i,this.value=n},f=function t(n){s(this,t),this.name=n},l=function t(n,i){s(this,t),this.object=n,this.name=i},p=function t(n,i,e){s(this,t),this.object=n,this.name=i,this.value=e},y=function t(n){s(this,t),this.expression=n},m=function(t){function i(t){var o,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"regular";return s(this,i),(o=n(this,e(i).call(this,t))).context=r,o}return o(i,y),i}(),b=function(t){function i(){return s(this,i),n(this,e(i).apply(this,arguments))}return o(i,y),i}(),d=function t(n,i){s(this,t),this.name=n,this.initializer=i},g=function t(n,i){s(this,t),this.name=n,this.value=i},v=function t(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"regular";s(this,t),this.context=i,this.statements=n},S=function t(n,i,e){s(this,t),this.condition=n,this.thenBranch=i,this.elseBranch=e},w=function t(n,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"while";s(this,t),this.context=e,this.condition=n,this.body=i},x=function t(n,i,e){s(this,t),this.callee=n,this.paren=i,this.arguments=e},O=function t(n,i){s(this,t),this.keyword=n,this.value=i},j=function t(n){s(this,t),this.keyword=n},_=function t(n,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;s(this,t),this.name=n,this.methods=i,this.superclass=e},P=function t(n,i){s(this,t),this.keyword=n,this.method=i},k=function t(n,i,e){s(this,t),this.name=n,this.params=i,this.bodyStatements=e};module.exports={Var:f,Binary:h,Unary:c,Block:v,Call:x,While:w,Class:_,Get:l,Set:p,Super:P,Literal:a,Return:O,Logical:u,This:j,LoxFunction:k,Grouping:y,Condition:S,ExpressionStatement:m,PrintStatement:b,VarStatement:d,Assignment:g};
},{}],"CUYV":[function(require,module,exports) {
function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}var i=require("./tokenizer"),r=require("./types"),s=r.Binary,a=r.Unary,h=r.Var,u=r.Call,c=r.Literal,o=r.While,l=r.Class,m=r.Super,E=r.Get,f=r.Set,p=r.This,v=r.Grouping,y=r.Return,k=r.LoxFunction,R=r.PrintStatement,d=r.ExpressionStatement,I=r.VarStatement,x=r.Assignment,A=r.Logical,S=r.Block,w=r.Condition,N=require("./errors"),T=N.parseError,L=i.tokenEnum,_="function",C="method",O="forLoop",F=function(){function t(n){e(this,t),this.tokens=n,this.current=0}return n(t,[{key:"parse",value:function(){for(var e=[];!this.isAtEnd;)e.push(this.declaration());return e}},{key:"declaration",value:function(){return this.match(L.FUN)?this.fun(_):this.match(L.CLASS)?this.classDeclaration():this.match(L.VAR)?this.varDeclaration():this.statement()}},{key:"classDeclaration",value:function(){var e=this.consume(L.IDENTIFIER,"Expected class name"),t=null;this.match(L.LESS)&&(t=new h(this.consume(L.IDENTIFIER,'Expected superclass name after "<"'))),this.consume(L.LEFT_BRACE,'expected "{" before class body');for(var n=[];!this.check(L.RIGHT_BRACE);)n.push(this.fun(C));return this.consume(L.RIGHT_BRACE,'expected "}" after class body'),new l(e,n,t)}},{key:"fun",value:function(e){var t=this.consume(L.IDENTIFIER,"Expected ".concat(e," name")),n=[];if(this.consume(L.LEFT_PAREN,"Expected paren after ".concat(e," name")),!this.check(L.RIGHT_PAREN))do{n.push(this.consume(L.IDENTIFIER,"Expected identifier"))}while(this.match(L.COMMA));this.consume(L.RIGHT_PAREN,"Expected paren after arguments"),this.consume(L.LEFT_BRACE,"Expected left brace after argument list");var i=this.block();return new k(t,n,i)}},{key:"varDeclaration",value:function(){var e=this.consume(L.IDENTIFIER,"Expected variable name"),t=null;return this.match(L.EQUAL)&&(t=this.expression()),this.consume(L.SEMICOLON,"Expect ; after value."),new I(e,t)}},{key:"statement",value:function(){return this.match(L.IF)?this.ifStatement():this.match(L.FOR)?this.forStatement():this.match(L.WHILE)?this.whileStatement():this.match(L.RETURN)?this.returnStatement():this.match(L.PRINT)?this.printStatement():this.match(L.LEFT_BRACE)?new S(this.block()):this.expressionStatement()}},{key:"forStatement",value:function(){var e;this.consume(L.LEFT_PAREN,'Expected "(" after "for"'),e=this.match(L.SEMICOLON)?null:this.match(L.VAR)?this.varDeclaration():this.expressionStatement();var t=null;this.check(L.SEMICOLON)||(t=this.expression()),this.consume(L.SEMICOLON,'Expected ";" after loop condition');var n=null;this.check(L.RIGHT_PAREN)||(n=this.expression()),this.consume(L.RIGHT_PAREN,'Expected ")" after for clause');var i=this.statement();return n&&(i=new S([i,new d(n,O)],O)),t||(t=new c(!0,O)),i=new o(t,i,O),e&&(i=new S([e,i],O)),i}},{key:"whileStatement",value:function(){this.consume(L.LEFT_PAREN,'Expected "(" after "while"');var e=this.expression();this.consume(L.RIGHT_PAREN,'Expected ")" after expression');var t=this.statement();return new o(e,t)}},{key:"ifStatement",value:function(){this.consume(L.LEFT_PAREN,'Expected "(" after "if"');var e=this.expression();this.consume(L.RIGHT_PAREN,'Expected ")" after expression');var t=this.statement(),n=null;return this.match(L.ELSE)&&(n=this.statement()),new w(e,t,n)}},{key:"block",value:function(){for(var e=[];!this.check(L.RIGHT_BRACE)&&!this.isAtEnd;)e.push(this.declaration());return this.consume(L.RIGHT_BRACE,'Missing closing brace. (Expect "}" after block)'),e}},{key:"printStatement",value:function(){var e=this.expression();return this.consume(L.SEMICOLON,"Expect ; after value."),new R(e)}},{key:"returnStatement",value:function(){var e=this.previous(),t=null;return this.check(L.SEMICOLON)||(t=this.expression()),this.consume(L.SEMICOLON,'Expected ";" after return value'),new y(e,t)}},{key:"expressionStatement",value:function(){var e=this.expression();return this.consume(L.SEMICOLON,"Expect ; after value."),new d(e)}},{key:"expression",value:function(){return this.assignment()}},{key:"assignment",value:function(){var e=this.or();if(this.match(L.EQUAL)){var t=this.previous(),n=this.assignment();if(e instanceof h){var i=e.name;return new x(i,n)}if(e instanceof E)return new f(e.object,e.name,n);throw T("Expected Expression",t)}return e}},{key:"or",value:function(){return this.matchBinary("and",A,L.OR)}},{key:"and",value:function(){return this.matchBinary("equality",A,L.AND)}},{key:"matchBinary",value:function(e,t){for(var n=this[e](),i=arguments.length,r=new Array(i>2?i-2:0),s=2;s<i;s++)r[s-2]=arguments[s];for(;this.match.apply(this,r);){n=new t(n,this.previous(),this[e]())}return n}},{key:"equality",value:function(){return this.matchBinary("comparison",s,L.BANG_EQUAL,L.EQUAL_EQUAL)}},{key:"comparison",value:function(){return this.matchBinary("addition",s,L.GREATER,L.GREATER_EQUAL,L.LESS,L.LESS_EQUAL)}},{key:"addition",value:function(){return this.matchBinary("multiplication",s,L.MINUS,L.PLUS)}},{key:"multiplication",value:function(){return this.matchBinary("unary",s,L.SLASH,L.STAR)}},{key:"unary",value:function(){if(this.match(L.BANG,L.MINUS)){var e=this.previous(),t=this.unary();return new a(e,t)}return this.call()}},{key:"call",value:function(){for(var e=this.primary();;)if(this.match(L.LEFT_PAREN))e=this.finishCall(e);else{if(!this.match(L.DOT))break;var t=this.consume(L.IDENTIFIER,'Expected property name after "."');e=new E(e,t)}return e}},{key:"finishCall",value:function(e){var t=[];if(!this.check(L.RIGHT_PAREN))do{t.push(this.expression())}while(this.match(L.COMMA));var n=this.consume(L.RIGHT_PAREN,"Unfinished argument list");return new u(e,n,t)}},{key:"primary",value:function(){if(this.match(L.FALSE))return new c(!1);if(this.match(L.TRUE))return new c(!0);if(this.match(L.NIL))return new c(null);if(this.match(L.NUMBER,L.STRING))return new c(this.previous().literal);if(this.match(L.SUPER)){var e=this.previous();this.consume(L.DOT,'Expected "." after super statement');var t=this.consume(L.IDENTIFIER,"Expected superclass method name");return new m(e,t)}if(this.match(L.THIS))return new p(this.previous());if(this.match(L.IDENTIFIER))return new h(this.previous());if(this.match(L.LEFT_PAREN)){var n=this.expression();return this.consume(L.RIGHT_PAREN,"Expect ')' after expression."),new v(n)}throw T("Expected Expression",this.peek())}},{key:"consume",value:function(e,t){if(this.check(e))return this.advance();throw T(t,this.peek())}},{key:"match",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];for(var i=0,r=t;i<r.length;i++){var s=r[i];if(this.check(s))return this.advance(),!0}return!1}},{key:"check",value:function(e){return!this.isAtEnd&&this.peek().type===e}},{key:"peek",value:function(){return this.tokens[this.current]}},{key:"previous",value:function(){if(this.current<=0)throw T("Expected previous but found nothing",this.peek());return this.tokens[this.current-1]}},{key:"advance",value:function(){return this.isAtEnd||this.current++,this.previous()}},{key:"isAtEnd",get:function(){return this.peek().type===L.EOF}}]),t}();module.exports=F;
},{"./tokenizer":"u74b","./types":"39eF","./errors":"p8GN"}],"brut":[function(require,module,exports) {
function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}var i=require("./errors"),a=i.runtimeError,r=function(){function n(t){e(this,n),this.map=new Map,this.enclosing=t}return t(n,[{key:"get",value:function(e){if(this.map.has(e.name.lexeme))return this.map.get(e.name.lexeme);if(this.enclosing)return this.enclosing.get(e);throw a('Undefined variable "'.concat(e.name.lexeme,'"'),e.name)}},{key:"set",value:function(e,n){if(this.map.has(e.lexeme))throw a('Duplicate variable declaration "'.concat(e.lexeme,'"'),e);return this.map.set(e.lexeme,n)}},{key:"setBuiltin",value:function(e,n){this.map.set(e,"function"==typeof n?{call:n}:n)}},{key:"assign",value:function(e,n){if(!this.map.has(e.lexeme)){if(this.enclosing)return this.enclosing.assign(e,n);throw a('Undefined variable "'.concat(e.lexeme,'"'),e)}return this.map.set(e.lexeme,n)}}]),n}();module.exports=r;
},{"./errors":"p8GN"}],"lmrS":[function(require,module,exports) {
function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(e,i){return!i||"object"!==t(i)&&"function"!=typeof i?n(e):i}function n(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function u(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}var l=require("./errors"),c=l.runtimeError,v=l.ReturnError,h=require("./types"),f=h.Binary,m=h.Unary,y=h.Call,p=h.Literal,d=h.Logical,g=h.Class,k=h.Super,w=h.Get,S=h.Set,b=h.Var,B=h.This,x=h.Grouping,E=h.Return,L=h.While,A=h.Block,O=h.LoxFunction,U=h.ExpressionStatement,C=h.VarStatement,_=h.PrintStatement,G=h.Assignment,P=h.Condition,R=require("./environment"),M=require("./tokenizer"),j=M.tokenEnum,T=function(t){return Boolean(t)},I=function(t,e){return t===e},N=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];for(var r=0,a=n;r<a.length;r++){var s=a[r];if(isNaN(s))throw c("Operand must be a number!",t)}},V=function(){function t(e,n){s(this,t),this.declaration=e,this.closure=n}return u(t,[{key:"call",value:function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new R(this.closure),r=0;r<this.declaration.params.length;r++)i.set(this.declaration.params[r],e[r]);try{t.interpretBlock(this.declaration.bodyStatements,i)}catch(a){if(a instanceof v)return a.value;throw a}return n?this.closure.get({name:{lexeme:"this"}}):null}},{key:"bind",value:function(e){var n=new R(this.closure);return n.set({lexeme:"this"},e),new t(this.declaration,n)}},{key:"toString",value:function(){return"<".concat(this.declaration.name.lexeme,"()>")}}]),t}(),Q=function(t){function n(t,r,a){var o;return s(this,n),(o=e(this,i(n).call(this))).name=t,o.methods=r,o.superclass=a,o}return r(n,V),u(n,[{key:"call",value:function(t,e){var n=new q(this),i=this.methods.get("init");return i&&i.bind(n).call(t,e,!0),n}},{key:"getMethod",value:function(t,e){return this.methods.has(t)?this.methods.get(t).bind(e):this.superclass?this.superclass.getMethod(t,e):null}},{key:"toString",value:function(){return"<".concat(this.name,">")}}]),n}(),q=function(){function t(e){s(this,t),this.klass=e,this.fields=new Map}return u(t,[{key:"get",value:function(t){var e=t.lexeme;if(this.fields.has(e))return this.fields.get(e);var n=this.klass.getMethod(e,this);if(n)return n;throw c('Undefined property "'.concat(e,'"'),t)}},{key:"set",value:function(t,e){var n=t.lexeme;this.fields.set(n,e)}},{key:"toString",value:function(){return"<+".concat(this.klass.name,">")}}]),t}(),z=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:console.log;s(this,t),this.printfunction=n,this.environment=e||new R,this.environment.setBuiltin("PI",Math.PI),this.environment.setBuiltin("cos",function(t,e){return Math.cos(e[0])}),this.environment.setBuiltin("mod",function(t,e){return e[0]%e[1]}),this.environment.setBuiltin("strlen",function(t,e){return e[0].length}),this.environment.setBuiltin("charAt",function(t,e){return e[0][e[1]]}),this.environment.setBuiltin("clock",function(){return(new Date).getTime()})}return u(t,[{key:"interpret",value:function(t){return this.evaluate(t)}},{key:"evaluate",value:function(t){return t instanceof A?this.visitBlock(t):t instanceof O?this.visitFunction(t):t instanceof G?this.visitAssignment(t):t instanceof g?this.visitClass(t):t instanceof w?this.visitGet(t):t instanceof S?this.visitSet(t):t instanceof B?this.visitThis(t):t instanceof k?this.visitSuper(t):t instanceof d?this.visitLogical(t):t instanceof y?this.visitCall(t):t instanceof L?this.visitWhile(t):t instanceof P?this.visitCondition(t):t instanceof C?this.visitVarStatement(t):t instanceof _?this.visitPrintStatement(t):t instanceof E?this.visitReturnStatement(t):t instanceof U?this.visitGrouping(t):t instanceof x?this.visitGrouping(t):t instanceof b?this.visitVar(t):t instanceof p?this.visitLiteral(t):t instanceof m?this.visitUnary(t):t instanceof f?this.visitBinary(t):void 0}},{key:"visitLiteral",value:function(t){return t.value}},{key:"visitGrouping",value:function(t){return this.evaluate(t.expression)}},{key:"visitPrintStatement",value:function(t){var e=this.evaluate(t.expression);return this.printfunction(null===e?"nil":e.toString()),e}},{key:"visitFunction",value:function(t){var e=new V(t,this.environment);this.environment.set(t.name,e)}},{key:"visitLogical",value:function(t){var e=this.evaluate(t.left);if(t.operator.type===j.OR){if(T(e))return e}else if(!T(e))return e;return this.evaluate(t.right)}},{key:"visitWhile",value:function(t){for(;T(this.evaluate(t.condition));)this.evaluate(t.body);return null}},{key:"visitReturnStatement",value:function(t){var e=null;throw t.value&&(e=this.evaluate(t.value)),new v(e)}},{key:"visitVar",value:function(t){return this.environment.get(t)}},{key:"visitVarStatement",value:function(t){var e=null;return null!==t.initializer&&(e=this.evaluate(t.initializer)),this.environment.set(t.name,e),null}},{key:"visitClass",value:function(t){var e=null;if(t.superclass&&!((e=this.evaluate(t.superclass))instanceof Q))throw c("Superclass must be a class",t.superclass.name);this.environment.set(t.name,null),e&&(this.environment=new R(this.environment),this.environment.set({lexeme:"super"},e));var n=new Map,i=!0,r=!1,a=void 0;try{for(var s,o=t.methods[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var u=s.value,l=new V(u,this.environment);n.set(u.name.lexeme,l)}}catch(h){r=!0,a=h}finally{try{i||null==o.return||o.return()}finally{if(r)throw a}}var v=new Q(t.name.lexeme,n,e);return e&&(this.environment=this.environment.enclosing),this.environment.assign(t.name,v),null}},{key:"visitGet",value:function(t){var e=this.evaluate(t.object);if(e instanceof q)return e.get(t.name);throw c("Only instances have properties",t.name)}},{key:"visitSet",value:function(t){var e=this.evaluate(t.object);if(!(e instanceof q))throw c("Only instances have fields",t.name);var n=this.evaluate(t.value);return e.set(t.name,n)}},{key:"visitThis",value:function(t){return this.environment.get({name:t.keyword})}},{key:"visitSuper",value:function(t){var e=t.method.lexeme,n=this.environment.get(new b(t.keyword)),i=this.environment.get(new b({lexeme:"this"})),r=n.getMethod(e,i);if(!r)throw c('Undefined property "'.concat(e,'"'),t.method);return r}},{key:"visitBlock",value:function(t){return this.interpretBlock(t.statements,new R(this.environment)),null}},{key:"visitCondition",value:function(t){return T(this.evaluate(t.condition))?this.evaluate(t.thenBranch):t.elseBranch&&this.evaluate(t.elseBranch),null}},{key:"interpretBlock",value:function(t,e){var n=this.environment;try{this.environment=e;var i=!0,r=!1,a=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var u=s.value;this.interpret(u)}}catch(l){r=!0,a=l}finally{try{i||null==o.return||o.return()}finally{if(r)throw a}}this.environment=n}catch(c){throw this.environment=n,c}}},{key:"visitAssignment",value:function(t){var e=this.evaluate(t.value);return this.environment.assign(t.name,e),e}},{key:"visitCall",value:function(t){var e=this,n=this.evaluate(t.callee),i=t.arguments.map(function(t){return e.evaluate(t)});if(!n.call)throw c("Can only call functions and classes",t.paren);return n.call(this,i)}},{key:"visitUnary",value:function(t){var e=this.evaluate(t.right);switch(t.operator.type){case j.MINUS:return N(t.operator,e),-e;case j.BANG:return!T(e)}}},{key:"visitBinary",value:function(t){var e=this.evaluate(t.left),n=this.evaluate(t.right);switch(t.operator.type){case j.MINUS:return N(t.operator,n,e),e-n;case j.PLUS:return e+n;case j.SLASH:return N(t.operator,n,e),e/n;case j.STAR:return N(t.operator,n,e),e*n;case j.GREATER:return N(t.operator,n,e),e>n;case j.GREATER_EQUAL:return N(t.operator,n,e),e>=n;case j.LESS:return N(t.operator,n,e),e<n;case j.LESS_EQUAL:return N(t.operator,n,e),e<=n;case j.EQUAL_EQUAL:return I(e,n);case j.BANG_EQUAL:return!I(e,n)}}}]),t}();module.exports={Interpreter:z,LoxClass:Q,LoxInstance:q};
},{"./errors":"p8GN","./types":"39eF","./environment":"brut","./tokenizer":"u74b"}],"Focm":[function(require,module,exports) {
var e=require("./tokenizer"),r=require("./parser"),n=require("./interpreter"),t=n.Interpreter,o=n.LoxClass,a=n.LoxInstance,i=require("./environment"),s=function(n,o,a){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=new e(n).scanTokens();i&&console.log(s);var l=new r(s).parse();i&&console.log(l);var u,v=new t(o,a),c=!0,p=!1,f=void 0;try{for(var w,x=l[Symbol.iterator]();!(c=(w=x.next()).done);c=!0){var y=w.value;u=v.interpret(y)}}catch(d){p=!0,f=d}finally{try{c||null==x.return||x.return()}finally{if(p)throw f}}return u},l=function(n){var t=new e(n).scanTokens();return new r(t).parse()};module.exports={run:s,parse:l,Parser:r,LoxClass:o,Tokenizer:e,LoxInstance:a,Interpreter:t,Environment:i};
},{"./tokenizer":"u74b","./parser":"CUYV","./interpreter":"lmrS","./environment":"brut"}],"9/6S":[function(require,module,exports) {
function n(n){return r(n)||e(n)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function r(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}var o=require("../types"),a=o.Binary,c=o.Unary,i=o.Var,u=o.Call,s=o.Literal,f=o.While,l=o.Grouping,p=o.Return,m=o.LoxFunction,v=o.PrintStatement,g=o.ExpressionStatement,d=o.VarStatement,h=o.Assignment,x=o.Logical,y=o.Block,j=o.Condition,b=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return n?t:""},w=new Map;w.set(g,function(n,t,e){return E(n.expression,0,e)+("forLoop"===n.context?"":";")}),w.set(v,function(n){return"print "+E(n.expression)+";"}),w.set(p,function(n){return"return "+E(n.value)+";"}),w.set(d,function(n){var t=n.name.lexeme,e=n.initializer?E(n.initializer):null;return"var ".concat(t)+(e?" = ".concat(e):"")+";"}),w.set(j,function(n,t,e){var r=n.condition,o=n.thenBranch,a=n.elseBranch,c=E(r),i="if".concat(b(e.spaceBeforeParams),"(").concat(c,") "),u=E(o,t,e,!1),s=a&&E(a,t,e,!1);return i+u+(s?" else ".concat(s):"")}),w.set(m,function(t,e,r){var o=t.bodyStatements,a=t.name.lexeme,c=t.params.map(function(n){return n.lexeme}),i="fun ".concat(a).concat(b(r.spaceBeforeParams),"(").concat(c.join(", "),") {"),u=o.map(function(n){return E(n,e+1,r)}),s=r.indent.repeat(e)+"}"+b(r.functionNewlines,"\n");return[i].concat(n(u),[s]).join("\n")});var B=function(n,t,e){var r=n.body,o=n.condition,a=E(o);return"while".concat(b(e.spaceBeforeParams),"(").concat(a,") ")+E(r,t,e,!1)},L=function(n,t,e){var r=n.body,o=n.condition,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:";",c="forLoop"!==o.context?E(o):"",i="",u=r;if(r instanceof y&&"forLoop"===r.context){var s=r.statements;u=s[0],s.length>1&&(i=E(s[s.length-1],t,e,!1))}var f=E(u,t,e,!1),l=[c,i];return"for".concat(b(e.spaceBeforeParams),"(").concat(a," ").concat(l.join("; "),") ").concat(f)};w.set(f,function(n,t,e){return"forLoop"===n.context?L(n,t,e):B(n,t,e)});var A=function(n,t,e){var r=n.statements,o=E(r[0],t,e,!1);return L(r[1],t,e,o)},S=function(n,t,e){return"{\n"+n.statements.map(function(n){return E(n,t+1,e)}).join("\n")+"\n".concat(e.indent.repeat(t),"}")};w.set(y,function(n,t,e){return"forLoop"===n.context?A(n,t,e):S(n,t,e)}),w.set(i,function(n){return n.name.lexeme}),w.set(l,function(n){var t=n.expression;return"("+E(t)+")"});var P=function(n){return[E(n.left),n.operator.lexeme,E(n.right)].join(" ")};w.set(a,P),w.set(x,P),w.set(c,function(n){return n.operator.lexeme+E(n.right)}),w.set(u,function(n){var t=n.arguments.map(function(n){return E(n)}).join(", "),e=E(n.callee);return"".concat(e,"(").concat(t,")")}),w.set(h,function(n){return n.name.lexeme+" = "+E(n.value)}),w.set(s,function(n){var t=n.value;return"string"==typeof t?'"'.concat(t,'"'):null===t?"nil":t});var E=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=Object.assign({},{indent:"\t",spaceBeforeParams:!0,functionNewlines:!0},e);if(w.has(n.constructor))return(r?o.indent.repeat(t):"")+w.get(n.constructor)(n,t,o);throw new Error("Don't support classes yet")};module.exports={printLoxAST:E};
},{"../types":"39eF"}],"KVVd":[function(require,module,exports) {

},{}],"3hpa":[function(require,module,exports) {
var global = arguments[3];
var n=arguments[3],e=require("./index"),t=require("./errors"),r=require("./transpilers/lox"),i=require("fs"),a="",o=document.getElementById("code"),l=['// Interactive Iterative Fibonacci\nvar a = 0;\nvar b = 1;\nvar limit = prompt("Limit to find fib numbers", 10000);\n// var limit = 1000000;\n\nwhile (a < limit) {\n  print a;\n  var temp = a;\n  a = b;\n  b = temp + b;\n}\n','// Linked List via Closures\nfun Link(value, next) {\n  fun access(method) {\n    if (method == "value") return value;\n    if (method == "next") return next;\n    print "unknown method " + method;\n  }\n\n  return access;\n}\n\nfun traverse(n, fn) {\n  fn(n);\n  if (n("next") != nil) {\n    return traverse(n("next"), fn);\n  }\n  return n;\n}\n\nfun printValue (n) {\n  print n("value");\n}\n\nfun blank (n) {}\n\nfun printTail (n) {\n  var tail = traverse(n, blank);\n  print tail("value");\n}\n\nvar list = Link(1, Link(2, Link(3, nil)));\n\ntraverse(list, printValue);\nprintTail(list);','// Kitchen Sink\nfun hello (arg1, arg2) {\n  fun secondHi (helloer) {\n    print helloer + " says hello";\n  }\n  var str = arg1 + " says hello to " + arg2;\n  var maxAge = 18;\n  var age;\n  age = maxAge + 3;\n  {\n    print 23;\n  }\n  if (age < 21) {\n    print "Too young";\n    while(age < 21) {\n      age = age + 1;\n    }\n  } else {\n    print "come on in";\n  }\n  for (var i = 0; i < 18; i = i + 1) {\n    print i;\n  }\n  return age or maxAge;\n}\n\n\nprint "hello source: ";\n// print printFunctionBody(hello);\n\nhello("boss", "man");','// Linked List via Classes\nclass Link {\n  init(value, next) {\n    this.value = value;\n    this.next = next;\n  }\n}\n\nvar ll = Link(1, Link(2, Link(3, nil)));\n\nfun traverse(n, fn) {\n  fn(n);\n  if (n.next != nil) {\n    return traverse(n.next, fn);\n  }\n  return n;\n}\n\nfun printList(list) {\n  fun printNode (n) {\n    print n.value;\n  }\n  traverse(list, printNode);\n}\n\nfun append(list, newNode) {\n  fun walk (n) {}\n  var end = traverse(list, walk);\n  end.next = newNode;\n  return end;\n}\n\nprint "list:";\nprintList(ll);\n\nappend(ll, Link(40, nil));\n\nprint "list:";\nprintList(ll);','// Class Example\nclass Doughnut {\n  init(name) {\n    this.name = name;\n  }\n\n  cook() {\n    var name = "";\n    if (this.name) {\n      name = this.name + " ";\n    }\n    print "You fry the " + name + "Doughnut until golden brown.";\n  }\n}\n\nclass BostonCream < Doughnut {\n  init() {\n    super.init("Boston Cream");\n  }\n}\n\nDoughnut("Cruller").cook();\n\nBostonCream().cook();\n\nfun hello () {\n  print "Would you like some breakfast?";\n}\n\nprint BostonCream;\nprint Doughnut;\nprint BostonCream();\nprint hello;'],u=l.map(function(n){return{name:n.split("\n")[0].replace(/[^\w\s]/gi,"").trim(),program:n}}),s=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!n)return document.getElementById("error").style.maxHeight="0",null;console.error(n);var r=(0,t.formatLoxError)(n,e),i=r.oneLiner,a=r.preErrorSection,o=r.errorSection,l=r.postErrorSection,u=i;o&&(u+="<br />",u+="".concat(a,'<span class="error">').concat(o,"</span>").concat(l)),document.getElementById("error").style.maxHeight="150px",document.getElementById("errorText").innerHTML=u},c=document.getElementById("exampleProgram"),m=u.map(function(n,e){return'<option value="'.concat(e,'">').concat(n.name,"</option>")}).join("\n");c.innerHTML=m,c.onchange=function(n){var e=n.target.value;o.value=u[e].program};var p=0;if(window.location.hash){var v=+window.location.hash.replace(/[^\w\s]/gi,"").trim();v<c.length&&(p=v),c.value=p}o.value=u[p].program;var f=function(n){a+=n+"\n",console.log(n),document.getElementById("output").value=a},d=document.getElementById("run");d.onclick=function(){var n=o.value,t=new e.Environment;t.setBuiltin("alert",function(n,e){return alert(e[0])}),t.setBuiltin("printFunctionBody",function(n,e){var t=e[0];if(t&&!t.declaration)throw new Error("Argument is not a lox function");return(0,r.printLoxAST)(t.declaration)}),t.setBuiltin("confirm",function(n,e){return confirm(e[0])}),t.setBuiltin("prompt",function(n,e){return prompt(e[0],e.length>1?e[1]:null)}),a="";try{(0,e.run)(n,t,f),s(null)}catch(i){s(i,n)}};var g=document.getElementById("format");g.onclick=function(){try{var t=(0,e.parse)(o.value);n.ast=t,o.value=t.map(function(n){return(0,r.printLoxAST)(n)}).join("\n"),s(null)}catch(i){s(i,o.value)}};
},{"./index":"Focm","./errors":"p8GN","./transpilers/lox":"9/6S","fs":"KVVd"}]},{},["3hpa"], null)