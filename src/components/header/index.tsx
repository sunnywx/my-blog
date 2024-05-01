import { h } from 'preact';
import { Link } from 'preact-router/match';
import {route} from 'preact-router'
import {useContext, useState} from 'preact/hooks'
import cs from 'classnames'
import {AppCtx} from "../../store/app-state";
// import {effect} from '@preact/signals'
import {VscMenu, VscGithub, VscColorMode, VscFoldDown, VscFoldUp} from "react-icons/vsc";

import style from './style.scss';

function Header(){
	const {hideSider, hideTopNav}=useContext(AppCtx)
	// const [expandNav, toggleExpand]=useState(false)
	// const dispose=effect(()=> {console.log('menu toggled: ', hideSider.value)})

	function toggleTheme(){
		if(typeof window === 'undefined') return;

		const doc=document.documentElement;
		const mode=doc.getAttribute('data-theme') || 'light'
		const toMode=mode === 'light' ? 'dark' : 'light'
		doc.setAttribute('data-theme', toMode)
		localStorage.setItem('theme', toMode)
	}

	function toggleSide(){
		hideSider.value = !hideSider.value
		if(!hideTopNav.value){
			// hide top nav
			hideTopNav.value=true
		}
	}

	return (
		<header class={style.header}>
			<div>
				<span onClick={toggleSide} id='toggle-side-nav'>
					<VscMenu />
				</span>
				<h1 onClick={()=> route('/')}>sunny.w</h1>
			</div>

			<nav>
				<div className={cs({[style.expand]: !hideTopNav?.value})}>
					{/* <Link activeClassName={style.active} href="/ai">AI</Link> */}
					<Link activeClassName={style.active} href="/blogs">Blogs</Link>
					<Link activeClassName={style.active} href="/tags">Tags</Link>
					<Link activeClassName={style.active} href="/topics">Learning</Link>
					{/* <Link activeClassName={style.active} href="/projects">Projects</Link> */}
					{/* <Link activeClassName={style.active} href="/talks">Talks</Link> */}
					{/* <Link activeClassName={style.active} href="/videos">Video</Link> */}
					{/* <Link activeClassName={style.active} href="/books">Books</Link> */}
					<Link activeClassName={style.active} href="/about">About</Link>
				</div>
				<div>
					<span
						className={style.icon}
						onClick={()=> hideTopNav.value = !hideTopNav?.value}
					>
						{hideTopNav?.value ? <VscFoldDown /> : <VscFoldUp />}
					</span>
					<span className={style.icon} onClick={toggleTheme}><VscColorMode /></span>
					<a className={style.icon} href='https://github.com/sunnywx' target='_blank' rel="noreferrer noopener"><VscGithub /></a>
				</div>
			</nav>
		</header>
	)
}

export default Header;
