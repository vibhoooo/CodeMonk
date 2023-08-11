import './Problem.css'
import { Link } from 'react-router-dom';

function Problem({ id, title, category }) {
	return (
		<tr>
			<td>
				<Link to={`/problems/${id}`}>{id}</Link>
			</td>
			<td>
				<Link to={`/problems/${id}`}>{title}</Link>
			</td>
			<td className={category}>{category}</td>
		</tr>
	);
};

export default Problem;
