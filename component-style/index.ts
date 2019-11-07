/**=================================================================================================
 *      AUTHOR --- HanWang
 *			LICENSE --- MIT
 *			LASTMODIFY --- 2019-11-07T15:49:46.084Z
 *			REPOSITORY --- https://github.com/sewerganger/react-mini-plugin
 *=================================================================================================*/
const deepClone = (arr: any[]): any[] => {
  const tmp: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    tmp[i] = arr[i];
  }
  return tmp;
};

const isSelector = (val: unknown): val is object =>
  Object.prototype.toString.call(val) === "[object Object]";

const isExistStyleElseCreate = () => {
  const styleTag = document.createElement("style");
  document.styleSheets.length === 0 && document.head.appendChild(styleTag);
};

// const testStyle = {
// 	'background-color': 'red',
// 	'.a': {
// 		width: '100px',
// 		'.ab': {
// 			width: '200px',
// 			'.aba': {
// 				'background-img': 'url()'
// 			}
// 		}
// 	},
// 	'.b': {
// 		width: '200px',
// 		'#ba': {
// 			height: '100px'
// 		}
// 	},
// 	'.c': {
// 		width: '300px'
// 	},
// 	'.e': {
// 		'.ea': {
// 			border: '1px solid #000',
// 			'.eaa': {
// 				'font-size': '10px'
// 			}
// 		},
// 		'.eb': {},
// 		'.ec': {}
// 	}
// };

/**=================================================================================================
 *   --- PROCESS
 *         1. [['demo']]
 *        2. [['demo', 'a'], ['demo', 'b'], ['demo', 'c']]
 *        3. [['demo', 'a'], ['demo', 'b']]
 *        4. [['demo', 'a'], ['demo', 'b', 'ba']]]
 *        5. [['demo', 'a']]
 *=================================================================================================*/

export const comptStyle = function(
  comptSel: string,
  style: Record<string, string | object>
) {
  // 检查是否有styleSheets 没有添加
  isExistStyleElseCreate();
  const selStack: Array<Array<string>> = [[comptSel]];
  const styleStack = [style];

  while (selStack.length !== 0 && styleStack.length !== 0) {
    const curSelArr = selStack.pop();
    const curStyle = styleStack.pop();
    let cssAttrStr = "";

    for (const prop in curStyle) {
      const tmpArr = deepClone(curSelArr!);
      const curVal = curStyle[prop];
      if (isSelector(curVal)) {
        tmpArr.push(prop);
        selStack.push(tmpArr);
        styleStack.push(curVal as any);
      } else {
        cssAttrStr += prop + ":" + curVal + ";";
      }
    }

    const selector = curSelArr!.join(" ");
    const singleRule = selector + " " + "{" + cssAttrStr + "}";
    const headStyle = document.styleSheets[0] as CSSStyleSheet;
    headStyle.insertRule(singleRule);
  }
};
