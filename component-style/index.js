"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepClone = function (arr) {
    var tmp = [];
    for (var i = 0; i < arr.length; i++) {
        tmp[i] = arr[i];
    }
    return tmp;
};
var isSelector = function (val) {
    return Object.prototype.toString.call(val) === "[object Object]";
};
var isExistStyleElseCreate = function () {
    var styleTag = document.createElement("style");
    document.styleSheets.length === 0 && document.head.appendChild(styleTag);
};
exports.comptStyle = function (comptSel, style) {
    isExistStyleElseCreate();
    var selStack = [[comptSel]];
    var styleStack = [style];
    while (selStack.length !== 0 && styleStack.length !== 0) {
        var curSelArr = selStack.pop();
        var curStyle = styleStack.pop();
        var cssAttrStr = "";
        for (var prop in curStyle) {
            var tmpArr = deepClone(curSelArr);
            var curVal = curStyle[prop];
            if (isSelector(curVal)) {
                tmpArr.push(prop);
                selStack.push(tmpArr);
                styleStack.push(curVal);
            }
            else {
                cssAttrStr += prop + ":" + curVal + ";";
            }
        }
        var selector = curSelArr.join(" ");
        var singleRule = selector + " " + "{" + cssAttrStr + "}";
        var headStyle = document.styleSheets[0];
        headStyle.insertRule(singleRule);
    }
};
//# sourceMappingURL=index.js.map