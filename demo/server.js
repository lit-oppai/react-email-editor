const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// 允许所有来源的请求
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 处理 GET 请求，返回 dist 文件下的 index.html
app.get('/', (req, res) => {
	const indexPath = path.join(__dirname, 'dist', 'index.html');
	res.sendFile(indexPath);
});

// 处理 GET 请求，返回当前目录的文件列表
app.get('/files', (req, res) => {
	const workspacePath = path.join(__dirname, 'workspace');
	const files = fs.readdirSync(workspacePath);
	const fileNames = files.map((file) => path.parse(file).name);
	res.send(fileNames);
});

// 处理 GET 请求，读取指定文件的内容
app.get('/files/:filename', (req, res) => {
	const { filename } = req.params;
	const filePath = path.join(__dirname, 'workspace', filename);
	const content = fs.readFileSync(filePath + '.json', 'utf-8');
	res.send(content);
});

// 处理 POST 请求，保存文件到当前目录
app.post('/files/:filename', (req, res) => {
	const { filename } = req.params;
	const filePath = path.join(__dirname, 'workspace', filename + '.json');
	fs.writeFileSync(filePath, JSON.stringify(req.body.content));
	res.send('File saved successfully');
});

app.listen(3456, () => {
	console.log('Server listening on port 3456');
});