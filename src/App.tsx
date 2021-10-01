import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CardManager from './features/Card/pages/CardManager'
import NavBarCustom from './components/NavBar'
import HistoryManager from './features/History/pages/HistoryManager'
function App() {
	return (
		<div>
			<BrowserRouter>
				<NavBarCustom />
				<Switch>
					<Route path="/card">
						<CardManager />
					</Route>
					<Route path="/history">
						<HistoryManager />
					</Route>
					<Route path="/">NotFound</Route>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
