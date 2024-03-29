/**=================================================================================================
 *  --SEE https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/insertRule
 *=================================================================================================*/

(function(Sheet_proto) {
  var originalInsertRule = Sheet_proto.insertRule;

  if (originalInsertRule.length === 2) {
    // 2 mandatory arguments: (selector, rules)
    Sheet_proto.insertRule = function(selectorAndRule) {
      // First, separate the selector from the rule
      a: for (
        var i = 0, Len = selectorAndRule.length, isEscaped = 0, newCharCode = 0;
        i !== Len;
        ++i
      ) {
        newCharCode = selectorAndRule.charCodeAt(i);
        if (!isEscaped && newCharCode === 123) {
          // 123 = "{".charCodeAt(0)
          // Secondly, find the last closing bracket
          var openBracketPos = i,
            closeBracketPos = -1;

          for (; i !== Len; ++i) {
            newCharCode = selectorAndRule.charCodeAt(i);
            if (!isEscaped && newCharCode === 125) {
              // 125 = "}".charCodeAt(0)
              closeBracketPos = i;
            }
            isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
          }

          if (closeBracketPos === -1) break a; // No closing bracket was found!
          /*else*/ return originalInsertRule.call(
            this, // the sheet to be changed
            selectorAndRule.substring(0, openBracketPos), // The selector
            selectorAndRule.substring(closeBracketPos), // The rule
            arguments[3] // The insert index
          );
        }

        // Works by if the char code is a backslash, then isEscaped
        // gets flipped (XOR-ed by 1), and if it is not a backslash
        // then isEscaped gets XORed by itself, zeroing it
        isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
      }
      // Else, there is no unescaped bracket
      return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
    };
  }
})(CSSStyleSheet.prototype);
