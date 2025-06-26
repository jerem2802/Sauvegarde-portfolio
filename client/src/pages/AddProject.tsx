import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3310/projects";

const AddProject: React.FC = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	// Ajouter un projet
	const handleAddProject = () => {
		const newProject = { name, description };

		axios
			.post(API_URL, newProject)
			.then(() => {
				console.log("Projet ajouté !");
				navigate("/admin"); // Redirection vers la liste des projets
			})
			.catch((error) =>
				console.error("Erreur lors de l'ajout du projet", error),
			);
	};

	return (
		<div className="min-h-screen flex flex-col items-center p-10 bg-gray-900 text-white">
			<h2 className="text-3xl font-bold mb-6">Ajouter un projet</h2>

			<div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
				<label htmlFor="name" className="block text-lg">
					Nom du projet
				</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full p-2 rounded bg-gray-700 text-white mt-2"
				/>

				<label htmlFor="description" className="block text-lg mt-4">
					Description
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full p-2 rounded bg-gray-700 text-white mt-2"
				/>
			</div>

			<button
				type="button"
				onClick={handleAddProject}
				className="bg-green-500 hover:bg-green-600 p-2 rounded mt-4"
			>
				Créer
			</button>

			<button
				type="button"
				onClick={() => navigate("/admin")}
				className="bg-red-500 hover:bg-red-600 p-2 rounded mt-4"
			>
				Annuler
			</button>
		</div>
	);
};

export default AddProject;
