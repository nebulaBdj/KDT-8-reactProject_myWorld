import { createBrowserRouter } from "react-router-dom";

import Blogmain from "./Component/Bloglist";
import Editor from "./Component/BlogEditor";


const Router = createBrowserRouter([
    {
        path : '/',
        element: <Blogmain />,
    },
    {
        path : '/blog_editor',
        element : <Editor />,
    }
]);

export default Router;