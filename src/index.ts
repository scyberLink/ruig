
import reportWebVitals from './common/reportWebVitals';
import './common/globalInclude';
import AppContainer from './layers/view/application/components/base/AppContainer';

const appContainer = new AppContainer()

appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH as string ?? "1000px"
appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT as string ?? "500px"

document.body.appendChild(appContainer)

/* if (module.hot) {
  module.hot.accept();
} */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
