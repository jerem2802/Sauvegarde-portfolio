import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3310/projects";

const EditAdmin: React.FC = () => {
	const navigate = useNavigate(); // Gestion de la navigation
	const [projects, setProjects] = useState<
		{ id: number; name: string; description: string }[]
	>([]);

	// Charger les projets existants
	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => setProjects(res.data))
			.catch((error) =>
				console.error("Erreur lors du chargement des projets", error),
			);
	}, []);

	// Supprimer un projet
	const handleDeleteProject = (id: number) => {
		axios.delete(`${API_URL}/${id}`).then(() => {
			setProjects((prevProjects) =>
				prevProjects.filter((project) => project.id !== id),
			);
		});
	};

	return (
		<div className="min-h-screen flex flex-col p-10 bg-gray-900 text-white">
			<h2 className="text-3xl font-bold mb-6 text-center">
				Édition des Projets
			</h2>

			<div className="flex">
				{/* Section des projets */}
				<div className="w-1/3 space-y-4">
					<h3 className="text-2xl font-bold mb-4">Projets existants</h3>
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center"
						>
							<div>
								<h4 className="text-lg font-semibold">{project.name}</h4>
								<p className="text-gray-400">{project.description}</p>
							</div>
							<div className="flex space-x-2">
								<button
									type="button"
									onClick={() => navigate(`/admin/edit/${project.id}`)}
									className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
								>
									Modifier
								</button>
								<button
									type="button"
									onClick={() => handleDeleteProject(project.id)}
									className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
								>
									Supprimer
								</button>
							</div>
						</div>
					))}

					<button
						type="button"
						onClick={() => navigate("/admin/add")}
						className="bg-green-500 hover:bg-green-600 p-2 rounded w-full"
					>
						Ajouter un projet
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditAdmin;
