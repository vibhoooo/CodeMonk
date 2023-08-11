import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const [selectedRole, setSelectedRole] = useState('User');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleRoleChange = (event) => {
		setSelectedRole(event.target.value);
	};
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const handleSignup = async (event) => {
		event.preventDefault();
		if (!username || !email || !password) {
			alert('All fields are mandatory!');
			return;
		}
		if (selectedRole === 'User') {
			try {
				const response = await fetch(
					'http://localhost:3000/users/signup',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								username: username,
								email: email,
								password: password
							}
						)
					}
				);
				const json = await response.json();
				console.log(json);
				if (response.ok) {
					navigate('/login');
				}
				else {
					throw new Error(json.message || 'Signup failed');
				}
			}
			catch (error) {
				console.error('Signup error:', error.message);
			}
		}
		else {
			try {
				const response = await fetch(
					'http://localhost:3000/admins/signup',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								adminname: username,
								email: email,
								password: password
							}
						)
					}
				);
				const json = await response.json();
				console.log(json);
				if (response.ok) {
					navigate('/login');
				}
				else {
					throw new Error(json.message || 'Signup failed');
				}
			}
			catch (error) {
				console.error('Signup error:', error.message);
			}
		}
	};
	return (
		<div id='signup'>
			<h1>Create an Account</h1>
			<form onSubmit={handleSignup}>
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
					type='text'
					placeholder='Enter username or adminname'
					value={username}
					onChange={handleUsernameChange}
				/>
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
				<button type="submit">Sign Up</button>
				<div>
					<h5>Already a member?</h5>
					<button onClick={() => {navigate("/login");}}>Login</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
