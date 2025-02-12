import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			{/* Navbar ici si nécessaire */}
			<Outlet /> {/* Permet d'afficher les composants des routes enfants */}
			{/* Footer ici si nécessaire */}
		</>
	);
}

export default App;
