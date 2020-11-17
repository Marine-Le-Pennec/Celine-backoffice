import './assets/css/App.css';
// css
import './assets/css/App.css';
import './assets/css/reset.css';
// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Containers
import Homepage from './Containers/Homepage';
import All from './Containers/All';
import New from './Containers/New';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/annonces'>
						<All />
					</Route>
					<Route path='/new'>
						<New />
					</Route>
					<Route exact path='/'>
						<Homepage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
