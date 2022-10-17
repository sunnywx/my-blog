import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<div>
			<h1>Recent blogs</h1>
			<p>blog by card</p>
		</div>

		<div>
			<h1>Recent topics</h1>
			<ul>
				<li>react source code reading</li>
				<li>preact code reading</li>
				<li>svelte in action</li>
				<li>vue source code reading</li>
			</ul>
		</div>

		<div>
			<h1>Recent talks</h1>
			<div>Thinking in view</div>
			<div>WASM intro</div>
		</div>
	</div>
);

export default Home;
