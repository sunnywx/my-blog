import { h } from 'preact';
import { Link } from 'preact-router/match';
import {route} from 'preact-router'
import {useContext} from 'preact/hooks'
import {AppCtx} from "../../store/app-state";
// import {effect} from '@preact/signals'
import {VscMenu, VscGithub, VscColorMode} from "react-icons/vsc";

import style from './style.scss';

function Header(){
	const {sideMenu}=useContext(AppCtx)
	// const dispose=effect(()=> {console.log('menu toggled: ', sideMenu.value)})

	return (
		<header class={style.header}>
			<div>
				<span onClick={()=> sideMenu.value = !sideMenu.value} id='toggle-side-nav'>
					<VscMenu />
				</span>
				<h1 onClick={()=> route('/')}>Thinking in X</h1>
			</div>

			<nav>
				<div>
					<Link activeClassName={style.active} href="/blog">Blogs</Link>
					<Link activeClassName={style.active} href="/tags">Tags</Link>
					<Link activeClassName={style.active} href="/about">About</Link>
				</div>
				<div>
					<span className={style.icon}><VscColorMode /></span>
					<a className={style.icon} href='https://github.com/sunnywx' target='_blank' rel="noreferrer"><VscGithub /></a>
				</div>
			</nav>
		</header>
	)
}

export default Header;
