import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { EditorRef } from '../../../src/types';
import EmailEditor from '../../../src';
import axios from 'axios';

const localhost = window.location.hostname;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }

  a {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: 0px;
    cursor: pointer;
    text-align: right;
    text-decoration: none;
    line-height: 160%;
  }
`;

const DesignEdit = () => {
	const params = useParams();
	let filename = params?.filename || null;
	console.log('测试 filename：：', filename);
	const emailEditorRef = useRef<EditorRef | null>(null);

	const saveDesign = () => {
		emailEditorRef.current?.saveDesign((design) => {
			console.log('saveDesign', design);
			filename = window.prompt('名字重复将会被覆盖\n请输入文件名字：：', filename || 'undefined');
			axios.post(`http://${localhost}:3456/files/${filename}`, { content: design })
			.then(response => {
				console.log('保存结果', response.data);
			})
			.catch(err => {
				console.error(err);
			});
		});
	};

	const exportHtml = () => {
		emailEditorRef.current?.exportHtml((data) => {
			const { html } = data;
			console.log('exportHtml', html);
			// 下载到本地
			const blob = new Blob([html], { type: 'text/html' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${filename}.html`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		});
	};

	const onload = () => {
		console.log('edit onload');

		if (filename) {
			axios.get(`http://${localhost}:3456/files/${filename}`)
			.then(response => {
				console.log('获取文件内容：：', response.data);
				// let json = JSON.parse(response.data);
				emailEditorRef.current?.loadDesign(response.data);
			})
			.catch(error => {
				console.error(error);
			});
		}
	};

	return (
	<Container>
		<Bar>
			<h1>React Email Editor (iceWhale)</h1>

			<Link to={`/`}>Dashboard</Link>
			<button onClick={saveDesign}>Save Design</button>
			<button onClick={exportHtml}>Export HTML</button>
		</Bar>

		<EmailEditor ref={emailEditorRef} onLoad={onload} />
	</Container>
	);
};

export default DesignEdit;
