import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-900 text-white">
			{/* Navbar */}
			<nav className="p-4 flex justify-between items-center bg-gray-800 shadow-md">
				<h1 className="text-2xl font-bold">Jérémy Tichané</h1>
				<div className="space-x-9">
					<a href="#about" className="hover:text-blue-400">
						À Propos
					</a>
					<a href="#projects" className="hover:text-blue-400">
						Projets
					</a>
					<a href="#contact" className="hover:text-blue-400">
						Contact
					</a>
					<a href="/admin" className="hover:text-red-400 font-semibold">
						Admin
					</a>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="about"
				className="flex flex-col items-center text-center p-10"
			>
				<motion.img
					src="/file.png"
					alt="/"
					className="object-cover flex justify-center w-40 h-40 rounded-full border-4 border-blue-400 shadow-lg"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
				/>
				<h2 className="text-3xl font-semibold mt-4">Bienvenue !</h2>
				<p className="mt-2 text-gray-300 max-w-md">
					Je suis un développeur passionné par le web et le design, spécialisé
					en React et Tailwind. Découvrez mes projets ci-dessous !
				</p>
			</section>

			{/* Projects Section */}
			<section id="projects" className="p-10">
				<h3 className="text-2xl font-semibold text-center mb-6">Mes Projets</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-gray-800 p-4 rounded-lg shadow-md">
						<h4 className="text-xl font-semibold">Projet 1</h4>
						<p className="text-gray-400">Description du projet...</p>
					</div>
					<div className="bg-gray-800 p-4 rounded-lg shadow-md">
						<h4 className="text-xl font-semibold">Projet 2</h4>
						<p className="text-gray-400">Description du projet...</p>
					</div>
					<div className="bg-gray-800 p-4 rounded-lg shadow-md">
						<h4 className="text-xl font-semibold">Projet 3</h4>
						<p className="text-gray-400">Description du projet...</p>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="text-center p-10 bg-gray-800">
				<h3 className="text-2xl font-semibold">Contactez-moi</h3>
				<div className="flex justify-center space-x-6 mt-4">
					<a
						href="https://github.com/jerem2802"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub size={30} className="hover:text-blue-400" />
					</a>
					<a
						href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-tichan%C3%A9/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin size={30} className="hover:text-blue-400" />
					</a>
					<a href="mailto:jeremytichane.dev@gmail">
						<FaEnvelope size={30} className="hover:text-blue-400" />
					</a>
				</div>
			</section>
		</div>
	);
};

export default Home;
