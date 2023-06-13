import ReactDOM from "react-dom/client";
import { Provider, store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "antd/dist/reset.css";
import "@/styles/common.less";
import "@/assets/iconfont/iconfont.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
