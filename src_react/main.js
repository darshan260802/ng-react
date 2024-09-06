import { createRoot } from "react-dom/client";
import App from "./App";

console.log("React Script Loaded....");

let reactRootRef = null;

window.addEventListener("message", ({ data }) => {
  if (!("from" in data) || data.from != "APP") return;
  console.log("messages", data);
  if(data.type == 'start-react'){
    renderReact();
  }
  if(data.type == 'stop-react'){
    if(reactRootRef != null){
        reactRootRef.unmount();
        reactRootRef = null;
    }
  }
});

function renderReact() {
  const rootElem = document.querySelector("#react-root");
  if (!rootElem) return;
  const reactRoot = createRoot(rootElem);
  reactRootRef = reactRoot;
  reactRoot.render(<App />);
}
