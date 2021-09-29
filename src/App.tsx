import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CardManager from './features/Card/pages/CardManager';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/about"></Route>
					<Route path="/card">
						<CardManager />
					</Route>
					<Route path="/">NotFound</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
