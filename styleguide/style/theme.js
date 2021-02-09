//组件文档展示样子
const spaceFactor = 8;
const space = [
	spaceFactor / 2, // 4
	spaceFactor, // 8
	spaceFactor * 2, // 16
	spaceFactor * 3, // 24
	spaceFactor * 4, // 32
	spaceFactor * 5, // 40
	spaceFactor * 6, // 48
];

const color = {
	base: '#2c3e50',
	light: '#767676',
	lightest: '#ccc',
	link: '#2c3e50',
	linkHover: '#3eaf7c',
	focus: '#2c3e50',
	border: '#e8e8e8',
	name: '#690',
	type: '#905',
	error: '#c00',
	baseBackground: '#fff',
	codeBackground: '#f5f5f5',
	sidebarBackground: '#fff',
	ribbonBackground: '#e90',
	ribbonText: '#fff',
	// Based on default Prism theme
	codeBase: '#333',
	codeComment: '#6d6d6d',
	codePunctuation: '#999',
	codeProperty: '#905',
	codeDeleted: '#905',
	codeString: '#690',
	codeInserted: '#690',
	codeOperator: '#9a6e3a',
	codeKeyword: '#1673b1',
	codeFunction: '#DD4A68',
	codeVariable: '#e90',
};

const fontFamily = {
	base: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'"Roboto"',
		'"Oxygen"',
		'"Ubuntu"',
		'"Cantarell"',
		'"Fira Sans"',
		'"Droid Sans"',
		'"Helvetica Neue"',
		'sans-serif',
	],
	monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
};

const fontSize = {
	base: 14,
	text: 16,
	small: 12,
	h1: 48,
	h2: 36,
	h3: 24,
	h4: 18,
	h5: 16,
	h6: 16,
};

const mq = {
	small: '@media (max-width: 600px)',
};

const borderRadius = 3;
const maxWidth = 1300;
const sidebarWidth = 250;

const buttonTextTransform = 'uppercase';

const  themeObj = {
	sidebarWidth:sidebarWidth,
	buttonTextTransform:buttonTextTransform,
	maxWidth:maxWidth,
	borderRadius:borderRadius,
	mq:mq,
	fontSize:fontSize,
	fontFamily:fontFamily,
	space:space,
	spaceFactor:spaceFactor,
	color:color,
}
module.exports = themeObj
