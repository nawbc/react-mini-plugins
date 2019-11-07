(function(Sheet_proto) {
  var originalInsertRule = Sheet_proto.insertRule;
  if (originalInsertRule.length === 2) {
    Sheet_proto.insertRule = function(selectorAndRule) {
      a: for (
        var i = 0, Len = selectorAndRule.length, isEscaped = 0, newCharCode = 0;
        i !== Len;
        ++i
      ) {
        newCharCode = selectorAndRule.charCodeAt(i);
        if (!isEscaped && newCharCode === 123) {
          var openBracketPos = i,
            closeBracketPos = -1;
          for (; i !== Len; ++i) {
            newCharCode = selectorAndRule.charCodeAt(i);
            if (!isEscaped && newCharCode === 125) {
              closeBracketPos = i;
            }
            isEscaped ^= newCharCode === 92 ? 1 : isEscaped;
          }
          if (closeBracketPos === -1) break a;
          return originalInsertRule.call(
            this,
            selectorAndRule.substring(0, openBracketPos),
            selectorAndRule.substring(closeBracketPos),
            arguments[3]
          );
        }
        isEscaped ^= newCharCode === 92 ? 1 : isEscaped;
      }
      return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
    };
  }
})(CSSStyleSheet.prototype);
//# sourceMappingURL=index.js.map
