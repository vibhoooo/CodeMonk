import './GetProblemById.css';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function GetProblemById() {
	const navigate = useNavigate();
	const { id } = useParams();
	const handleClick = () => {
		navigate(`/submissions/${id}`);
	};
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [input, setInput] = useState('');
	const [output, setOutput] = useState('');
	const [constraint, setConstraint] = useState('');
	const role = localStorage.getItem('role');
	const fetchProblem = async () => {
		if (role === 'User') {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await fetch(
					`http://localhost:3000/users/questions/get/${id}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`
						},
					}
				);
				const json = await response.json();
				if(response.ok) {
					setTitle(json.title);
					setDescription(json.description);
					setInput(json.input);
					setOutput(json.output);
					setConstraint(json.constraint);
				}
				else {
					throw new Error(json.message || 'Failed to fetch problem');
				}
			}
			catch(error) {
				console.error('Error fetching problem:', error.message);
			}
		}
		else {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await fetch(
					`http://localhost:3000/admins/questions/get/${id}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`
						},
					}
				);
				const json = await response.json();
				if (response.ok) {
					setTitle(json.title);
					setDescription(json.description);
					setInput(json.input);
					setOutput(json.output);
					setConstraint(json.constraint);
				}
				else {
					throw new Error(json.message || 'Failed to fetch problem');
				}
			}
			catch(error) {
				console.error('Error fetching problem:', error.message);
			}
		}
	}
	useEffect(
		() => {
			fetchProblem()
		},
		[]
	);
	const defaultCode = {
		C: `#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}`,
		'C++': `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World" << endl;

    return 0;
}`,
		Java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
		Python: `print("Hello World")`
	}
	const [selectedLanguage, setSelectedLanguage] = useState("C");
	const handleLanguageChange = (event) => {
		setSelectedLanguage(event.target.value);
	};
	const [userCode, setUserCode] = useState(defaultCode[selectedLanguage]);
	const handleCodeChange = (event) =>  {
		setUserCode(event.target.value);
	}
	useEffect(() => {
		setUserCode(defaultCode[selectedLanguage]);
	}, [selectedLanguage]);
	return (
		<div id='problem-solving-area'>
			<div id='left-section'>
				<h1>{id}</h1>
				<h1>{title}</h1>
				<span>
					<h5>Description</h5>
					<p>{description}</p>
				</span>
				<div>
					<h5>Testcase</h5>
					<span className='testcases'>
						<h5>Sample Input:</h5>
						<p>{input}</p>
					</span>
					<span className='testcases'>
						<h5>Sample Output:</h5>
						<p>{output}</p>
					</span>
					<span className='testcases'>
						<h5>Constraint:</h5>
						<p>{constraint}</p>
					</span>
				</div>
			</div>
			<div id='right-section'>
				<h3>Your code goes here!</h3>
				<form>
					<label>
						<input
							type='radio'
							value='C'
							checked={selectedLanguage === 'C'}
							onChange={handleLanguageChange}
						/>
						C
					</label>
					<label>
						<input
							type='radio'
							value='C++'
							checked={selectedLanguage === 'C++'}
							onChange={handleLanguageChange}
						/>
						C++
					</label>
					<label>
						<input
							type='radio'
							value='Java'
							checked={selectedLanguage === 'Java'}
							onChange={handleLanguageChange}
						/>
						Java
					</label>
					<label>
						<input
							type='radio'
							value='Python'
							checked={selectedLanguage === 'Python'}
							onChange={handleLanguageChange}
						/>
						Python
					</label>
				</form>
				<textarea
					required
					id='solution-area'
					value={userCode}
					onChange={handleCodeChange}
				></textarea>
				<button id='button-submit' onClick={handleClick}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default GetProblemById;