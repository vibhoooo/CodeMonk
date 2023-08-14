import './GetProblems.css';
import Problem from './Problem';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function GetProblems() {
	const [problems, setProblems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const role = localStorage.getItem('role');
	const isAdmin = role === 'Admin';
	const fetchProblems = async (page) => {
		if(role == 'User') {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await fetch(
					`http://localhost:3000/users/questions/get?page=${page}`,
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
					setProblems(json.problems);
					setTotalPages(json.totalPages);
				}
				else {
					throw new Error(json.message || 'Failed to fetch problems');
				}
			}
			catch (error) {
				console.error('Error fetching problems:', error.message);
			}
		}
		else {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await fetch(
					`http://localhost:3000/admins/questions/get?page=${page}`,
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
					setProblems(json.problems);
					setTotalPages(json.totalPages);
				}
				else {
					throw new Error(json.message || 'Failed to fetch problems');
				}
			}
			catch (error) {
				console.error('Error fetching problems:', error.message);
			}
		}
	};
	useEffect(
		() => {
			fetchProblems(currentPage);
		},
		[currentPage]
	);
	return (
		<div id='problems-table'>
			<h1>All Problems</h1>
			{
				isAdmin && (
					<button 
						className={`add-button ${isAdmin ? 'visible' : 'hidden'}`}
						onClick={() => navigate('/problems/post')}
					>
						Add Problems
					</button>
				)
			}
			<div id='page-buttons'>
				{
					Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
						<button
							key={page}
							className='page'
							onClick={() => handlePageChange(page)}
							disabled={currentPage === page}
						>
							{page}
						</button>
						)
					)
				}
			</div>
			<table>
				<thead>
					<tr>
						<th>Problem ID</th>
						<th>Title</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{
						problems.map((problem) => (
							<Problem
							key={problem.id}
							id={problem.id}
							title={problem.title}
							category={problem.category}
							/>
							)
						)
					}
				</tbody>
			</table>
		</div>
	);
};

export default GetProblems;
