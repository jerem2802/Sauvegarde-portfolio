import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Tentative de connexion :", { email, password });
		navigate("/admin/edit");
		// Ajoute ici la logique d'authentification
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
			<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="p-2 rounded bg-gray-700 focus:outline-none"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Mot de passe"
						className="p-2 rounded bg-gray-700 focus:outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
					>
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
