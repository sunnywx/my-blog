import { h } from 'preact';
import { Link } from 'preact-router/match';
import {route} from 'preact-router'
import {useContext} from 'preact/hooks'
import {AppCtx} from "../../store/app-state";
// import {effect} from '@preact/signals'
import {VscMenu, VscGithub, VscColorMode} from "react-icons/vsc";

import style from './style.scss';

function Header(){
	const {hideSider}=useContext(AppCtx)
	// const dispose=effect(()=> {console.log('menu toggled: ', hideSider.value)})

	function toggleTheme(){
		if(typeof window === 'undefined') return;

		const doc=document.documentElement;
		let mode=doc.getAttribute('data-theme') || 'light'
		if(mode === 'light'){
			doc.setAttribute('data-theme', 'dark')
		} else {
			doc.setAttribute('data-theme', 'light')
		}
	}

	return (
		<header class={style.header}>
			<div>
				<span onClick={()=> hideSider.value = !hideSider.value} id='toggle-side-nav'>
					<VscMenu />
				</span>
				<h1 onClick={()=> route('/')}>sunnywang</h1>
			</div>

			<nav>
				<div>
					<Link activeClassName={style.active} href="/blogs">Blogs</Link>
					<Link activeClassName={style.active} href="/tags">Tags</Link>
					<Link activeClassName={style.active} href="/projects">Projects</Link>
					<Link activeClassName={style.active} href="/about">About</Link>
				</div>
				<div>
					<span className={style.icon} onClick={toggleTheme}><VscColorMode /></span>
					<a className={style.icon} href='https://github.com/sunnywx' target='_blank' rel="noreferrer noopener"><VscGithub /></a>
				</div>
			</nav>
		</header>
	)
}

export default Header;
