import { Reader } from './reader.js';
import { FILE_FORMAT } from './parser.js';

window.addEventListener("load", () => {
	document.querySelector("#file-input").addEventListener('change', async (event) => {
		const blob = event.target.files[0];
		const buffer = await new Response(blob).arrayBuffer();

		const reader = new Reader(buffer);
		console.log(reader.readObject(FILE_FORMAT))
	});
});