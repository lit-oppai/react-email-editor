import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DesignList = () => {
	const [files, setFiles] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://127.0.0.1:3456/files')
		.then(response => {
			console.log(response.data);
			setFiles(response.data);
		})
		.catch(error => {
			console.error(error);
		});
	}, []);

	const openFile = (file) => {
		axios.get(`http://127.0.0.1:3456/files/${file}`)
		.then(response => {
			console.log(response.data);
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.text = response.data;
			console.log('获取文件内容：：', response.data);
			navigate(`/design/edit/${file}`);
		})
		.catch(error => {
			console.error(error);
		});
	};

	return (
	<div>
		<h1>My Designs</h1>
		<ul>
			{files.map(file => (
			<li key={file}>
				<a target='_blank' rel='noopener noreferrer' onClick={() => openFile(file)}>{file}</a>
				{/*<Link to="/">{file}</Link>*/}
			</li>
			))}
		</ul>
		<p>
			<Link to={`/design/new`}>New Design</Link>
		</p>
	</div>
	);
};

export default DesignList;
