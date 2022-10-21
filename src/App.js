import './App.scss';
import Modal from './components/Modal';
import Recipe from './components/Recipe';

import { useGlobalContext } from './ContextProvider';

function App() {
	const { isModal, handleModal, recipe } = useGlobalContext();
	return (
		<>
			<div className="App container">
				{isModal ? <Modal /> : null}
				<div className="app_header">
					<h1>My Recipes</h1>
					<button className="btn" onClick={() => handleModal('open')}>
						Add Recipe
					</button>
				</div>
				<div className="recipe_container ">
					{recipe?.map((item) => (
						<Recipe key={item.id} {...item} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
