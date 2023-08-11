import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [selectedRole, setSelectedRole] = useState('User');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleRoleChange = (event) => {
		setSelectedRole(event.target.value);
	};
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const handleLogin = async (event) => {
		event.preventDefault();
		if (!email || !password) {
			alert('All fields are mandatory!');
			return;
		}
		if(selectedRole === 'User') {
			try {
				const response = await fetch(
					'http://localhost:3000/users/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								email: email,
								password: password
							}
						)
					}
				);
				const json = await response.json();
				console.log(json);
				if (response.ok) {
					localStorage.setItem('accessToken', json.accessToken);
					localStorage.setItem('role', json.role);
					navigate('/problems/all');
				}
				else {
					throw new Error(json.message || 'Login failed');
				}
			}
			catch (error) {
				console.error('Login error:', error.message);
			}
		}
		else {
			try {
				const response = await fetch(
					'http://localhost:3000/admins/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								email: email,
								password: password
							}
						)
					}
				);
				const json = await response.json();
				console.log(json);
				if (response.ok) {
					localStorage.setItem('accessToken', json.accessToken);
					localStorage.setItem('role', json.role);
					navigate('/problems/all');
				}
				else {
					throw new Error(json.message || 'Login failed');
				}
			}
			catch (error) {
				console.error('Login error:', error.message);
			}
		}
	};
	return (
		<div id='login'>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<label>
					<input
						type='radio'
						value='User'
						checked={selectedRole === 'User'}
						onChange={handleRoleChange}
					/>
					User
				</label>
				<label>
					<input
						type='radio'
						value='Admin'
						checked={selectedRole === 'Admin'}
						onChange={handleRoleChange}
					/>
					Admin
				</label>
				<input
					type='email'
					placeholder='Enter email id'
					value={email}
					onChange={handleEmailChange}
				/>
				<input
					type='password'
					placeholder='Enter password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<button type="submit">Login</button>
				<div>
					<h5>Didn't have an account?</h5>
					<button onClick={() => { navigate("/signup"); }}>Sign Up</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
