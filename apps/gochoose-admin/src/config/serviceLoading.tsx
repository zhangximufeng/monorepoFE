import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

/**
 * @description 开启 Loading
 * */
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    let dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(<Loading />);
  }
  needLoadingRequestCount++;
};

/**
 * @description 结束 Loading
 * */
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    document.body.removeChild(document.getElementById("loading") as HTMLElement);
  }
};
