import './PostProblem.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function PostProblem() {
	const navigate = useNavigate();
	const [id, setId] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [sampleInput, setSampleInput] = useState('');
	const [sampleOutput, setSampleOutput] = useState('');
	const [constraint, setConstraint] = useState('');
	const [category, setCategory] = useState('');
	const handleFormSubmit = async (event) =>  {
		event.preventDefault();
		if (!id || !title || !description || !sampleInput || !sampleOutput || !constraint || !category) {
			alert('All fields are mandatory!');
			return;
		}
		const problemData = {
			id,
			title,
			description,
			sampleInput,
			sampleOutput,
			constraint,
			category
		};
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await fetch(
				`http://localhost:3000/admins/questions/post`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`
					},
					body: JSON.stringify(
						problemData
					)
				}
			);
			const json = await response.json();
			if(response.ok) {
				navigate('/problems/all'); 
			}
			else {
				throw new Error(json.message || 'Failed to add problem');
			}
		}
		catch(error) {
			console.error('Error adding problem:', error.message);
		}
	};
	return (
		<div id='add-problem-form'>
			<h1>Add Problem</h1>
			<form onSubmit={handleFormSubmit}>
				<label>
					Problem ID:
					<input
						type='text'
						value={id}
						onChange={(event) => setId(event.target.value)}
					/>
				</label>
				<label>
					Title:
					<input
						type='text'
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</label>
				<label>
					Description:
					<textarea
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>
				</label>
				<label>
					Sample Input:
					<textarea
						value={sampleInput}
						onChange={(event) => setSampleInput(event.target.value)}
					/>
				</label>
				<label>
					Sample Output:
					<textarea
						value={sampleOutput}
						onChange={(event) => setSampleOutput(event.target.value)}
					/>
				</label>
				<label>
					Constraint:
					<textarea
						value={constraint}
						onChange={(event) => setConstraint(event.target.value)}
					/>
				</label>
				<label>
					Category:
					<textarea
						value={category}
						onChange={(event) => setCategory(event.target.value)}
					/>
				</label>
				<button type='submit'>Add Problem</button>
			</form>
		</div>
	);
};

export default PostProblem;