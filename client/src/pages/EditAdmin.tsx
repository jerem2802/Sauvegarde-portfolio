import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3310/projects";

const AdminEdit: React.FC = () => {
	const [title, setTitle] = useState("Mon Portfolio");
	const [description, setDescription] = useState(
		"Je suis un développeur passionné par le web et le design.",
	);
	const [projects, setProjects] = useState<
		{ id: number; name: string; description: string }[]
	>([]);
	const [originalState, setOriginalState] = useState({
		title,
		description,
		projects: [],
	});

	// Charger les projets depuis l’API
	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => {
				setProjects(res.data);
				setOriginalState({ title, description, projects: res.data }); // Mise à jour de l'état original
			})
			.catch((error) =>
				console.error("Erreur lors du chargement des projets", error),
			);
	}, [title, description]);

	// Modifier le titre et la description
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setDescription(e.target.value);

	// Modifier un projet
	const handleProjectChange = (
		index: number,
		key: keyof (typeof projects)[0],
		value: string,
	) => {
		const updatedProjects = [...projects];
		updatedProjects[index] = { ...updatedProjects[index], [key]: value };
		setProjects(updatedProjects);
	};

	// Ajouter un projet
	const handleAddProject = () => {
		const newProject = {
			name: "Nouveau projet",
			description: "Description...",
		};

		axios
			.post(API_URL, newProject)
			.then(() => {
				// Ajoute le projet localement avec un ID temporaire
				setProjects((prevProjects) => [
					...prevProjects,
					{ id: Date.now(), ...newProject },
				]);
			})
			.catch((error) =>
				console.error("Erreur lors de l'ajout du projet", error),
			);
	};

	// Sauvegarder les modifications
	const handleSave = () => {
		Promise.all(
			projects.map((project) => axios.put(`${API_URL}/${project.id}`, project)),
		)
			.then(() => {
				setOriginalState({ title, description, projects });
				console.log("Données sauvegardées", { title, description, projects });
			})
			.catch((err) => console.error("Erreur de mise à jour", err));
	};

	// Supprimer un projet
	const handleDeleteProject = (id: number) => {
		axios.delete(`${API_URL}/${id}`).then(() => {
			setProjects(projects.filter((project) => project.id !== id));
		});
	};

	// Annuler les modifications
	const handleCancel = () => {
		setTitle(originalState.title);
		setDescription(originalState.description);
		setProjects(originalState.projects);
	};

	return (
		<div className="min-h-screen flex flex-col items-center p-10 bg-gray-900 text-white">
			<h2 className="text-3xl font-bold mb-6">Édition de l'Admin</h2>

			<div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
				<label htmlFor="title" className="block text-lg">
					Titre du Projet
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={handleTitleChange}
					className="w-full p-2 rounded bg-gray-700 text-white mt-2"
				/>

				<label htmlFor="description" className="block text-lg mt-4">
					Description
				</label>
				<textarea
					id="description"
					value={description}
					onChange={handleDescriptionChange}
					className="w-full p-2 rounded bg-gray-700 text-white mt-2"
				/>
			</div>

			<h3 className="text-2xl font-bold mt-6">Projets</h3>
			{projects.map((project, index) => (
				<div
					key={project.id}
					className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg mt-4"
				>
					<label
						htmlFor={`project-name-${project.id}`}
						className="block text-lg"
					>
						Nom du projet
					</label>
					<input
						id={`project-name-${project.id}`}
						type="text"
						value={project.name}
						onChange={(e) => handleProjectChange(index, "name", e.target.value)}
						className="w-full p-2 rounded bg-gray-700 text-white mt-2"
					/>

					<label
						htmlFor={`project-description-${project.id}`}
						className="block text-lg mt-4"
					>
						Description
					</label>
					<textarea
						id={`project-description-${project.id}`}
						value={project.description}
						onChange={(e) =>
							handleProjectChange(index, "description", e.target.value)
						}
						className="w-full p-2 rounded bg-gray-700 text-white mt-2"
					/>

					<button
						type="button"
						onClick={() => handleDeleteProject(project.id)}
						className="bg-red-500 hover:bg-red-600 p-2 rounded mt-4"
					>
						Supprimer
					</button>
				</div>
			))}

			<button
				type="button"
				onClick={handleAddProject}
				className="bg-green-500 hover:bg-green-600 p-2 rounded mt-4"
			>
				Ajouter un projet
			</button>

			<div className="flex space-x-4 mt-6">
				<button
					type="button"
					onClick={handleSave}
					className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
				>
					Sauvegarder
				</button>
				<button
					type="button"
					onClick={handleCancel}
					className="bg-red-500 hover:bg-red-600 p-2 rounded"
				>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default AdminEdit;
