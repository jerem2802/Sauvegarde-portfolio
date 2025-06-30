import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import AdminLogin from "./pages/LoginAdmin";
import AdminEdit from "./pages/EditAdmin";
import AddProject from "./pages/AddProject";
import APropos from "./pages/APropos";
import Projets from "./pages/Projets";


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />, // App devient le parent de toutes les routes
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
				path: "admin",
				element: <AdminLogin />,
			},
			{
				path: "admin/edit",
				element: <AdminEdit />,
			},
			{
				path: "admin/add",
				element: <AddProject />,
			},
			{
				index: true, // Redirige "/" vers "/home" par défaut
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
