import { RouterProvider } from "react-router-dom";
import Head from "./components/Head";
import { SITE } from "./lib/consts";
import { router } from "./router";

function App() {
  return (
    <>
      <Head site={SITE} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
