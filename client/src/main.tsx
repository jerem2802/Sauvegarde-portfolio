import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";



import APropos from "./pages/APropos";
import Projets from "./pages/Projets";
import Contact from "./pages/Contact";



const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "home",
				element: <Home />,
			},
		
			{
				path: "a-propos",
				element: <APropos />,
			},
			{
				path: "projets",
				element: <Projets />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
		
							{
				index: true, 
				element: <Home />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
} else {
	console.error("Root element not found");
}
