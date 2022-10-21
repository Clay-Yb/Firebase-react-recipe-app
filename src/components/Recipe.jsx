import { useGlobalContext } from '../ContextProvider';
import './Recipe.scss';
const Recipe = ({ id, des, ingredents, steps, title, view }) => {
	const { handleRemove, handleRecipe, handleEdit } = useGlobalContext();

	return (
		<div className="recipe">
			<div className="recipe_title">
				<h3>{title}</h3>
				<p>{des}</p>
			</div>

			{view ? (
				<>
					<div className="recipe_ing">
						{ingredents.length ? <h3>Ingredents</h3> : null}
						{ingredents?.map((item, i) => (
							<p key={i}>{item.name}</p>
						))}
					</div>
					<div className="recipe_steps">
						{steps.length ? <h3>Steps</h3> : null}
						{steps?.map((item, i) => (
							<p key={i}>{item.name}</p>
						))}
					</div>
				</>
			) : null}

			<div className="recipe_btns">
				<button className="btn" onClick={() => handleRecipe(id)}>
					{view ? 'Show Less' : 'View More'}
				</button>
				<button className="btn_danger" onClick={() => handleRemove(id)}>
					Remove Recipe
				</button>
				<button className="btn" type="button" onClick={() => handleEdit(id)}>
					Edit Recipe
				</button>
			</div>
		</div>
	);
};

export default Recipe;
