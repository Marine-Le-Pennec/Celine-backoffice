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
import Modif from './Components/Modif';

// Icones
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faEye,
	faTrashAlt,
	faTimes,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faTrashAlt, faTimes, faCheckCircle);

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
					<Route path='/modif/:id'>
						<Modif />
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
