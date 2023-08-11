import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import GetProblems from './GetProblems';
import GetProblemById from './GetProblemById';
import GetSubmissionsById from './GetSubmissionsById';
import PostProblem from './PostProblem';

function App() {
	return(
		<BrowserRouter>
			<Routes>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>  
				<Route
					path="/problems/all"
					element={<GetProblems />}
				/>
				<Route
					path="/problems/:id"
					element={<GetProblemById />}
				/>
				<Route
					path="/submissions/:id"
					element={<GetSubmissionsById />}
				/>
				<Route
					path="/problems/post"
					element={<PostProblem />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;