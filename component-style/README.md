# component-style

### 1. Installation

`npm i component-style`

### 2. Usage

```javascript
import ReactDOM from 'react-dom';
import { comptStyle } from 'component-style';
import 'component-style/polyfill' // add polyfill to support ie5-8
import React from 'react';

function Demo(props) {
 comptStyle('#demo', props.comptStyle);
 return (
  <div id="demo">
    <div className="a">
     <div className="aa">
       component
      <div className="ab" />
     </div>
    <div className="b" />
    <div className="c" />
  </div>
 );
}

const demoStyle = {
'.a': {
    width: '500px',
    height: '500px',
    background: 'red',
    '.aa': {
     'font-size': '20px'
    },
   '.ab': {
     width: '50px',
     height: '50px',
     background: 'yellow'
    }
  },
  '.b': {
    width: '200px',
    height: '200px',
    background: 'blue'
   },
  '.c': {
    width: '40px',
    height: '40px',
    background: 'green'
   }
 }}
}

function App() {
 return <Demo comptStyle={demoStyle} />;
}

/*eslint-env browser*/
ReactDOM.render(<App />, document.getElementById('root'));
```
