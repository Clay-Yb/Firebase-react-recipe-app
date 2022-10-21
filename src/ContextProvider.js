import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { db } from './Firebase';
import { Actions, Reducer } from './Reducer';

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const initialState = {
	isModal: false,
	recipe: [],
	form: {
		title: '',
		des: '',
		ingredents: [],
		steps: [],
	},
	isEdit: false,
	editId: null,
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	const collectionRef = collection(db, 'recipes');

	useEffect(() => {
		onSnapshot(collectionRef, (snipShot) => {
			const recipes = snipShot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				view: false,
			}));
			dispatch({ type: Actions.readData, payload: recipes });
		});
	}, []);

	const handleModal = (type) => {
		dispatch({ type: Actions.modalToggle, payload: type });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const emptyStringCheck = {
			...state.form,
			ingredents: state.form.ingredents.filter((item) => item.name !== ''),
			steps: state.form.steps.filter((item) => item.name !== ''),
		};

		state.form = emptyStringCheck;

		if (!state.form.title || !state.form.des) {
			return;
		}

		//Edit
		if (state.form.title && state.form.des && state.isEdit) {
			await updateDoc(doc(db, 'recipes', state.editId), {
				...state.form,
			});

			dispatch({ type: Actions.resetEdit });
			return;
		}

		await addDoc(collectionRef, {
			...state.form,
		});
		dispatch({ type: Actions.resetForm });
	};

	const handleRemove = async (id) => {
		await deleteDoc(doc(db, 'recipes', id));
	};

	const handleChange = (value, type) => {
		dispatch({ type: Actions.onChange, payload: { value, type } });
	};

	const addIng = () => {
		dispatch({ type: Actions.addIng });
	};

	const handleIng = (value, index) => {
		dispatch({ type: Actions.ingChange, payload: { value, index } });
	};

	const handleIngDelete = (index) => {
		dispatch({ type: Actions.deleteIng, payload: index });
	};

	const addSteps = () => {
		dispatch({ type: Actions.addSteps });
	};

	const handleSteps = (value, index) => {
		dispatch({ type: Actions.stepsChange, payload: { value, index } });
	};

	const handleStepsDelete = (index) => {
		dispatch({ type: Actions.deleteSteps, payload: index });
	};

	const handleRecipe = (id) => {
		dispatch({ type: Actions.recipeShow, payload: id });
	};

	const handleEdit = (id) => {
		const selectedRecipe = state.recipe.find((item) => item.id === id);
		state.form.title = selectedRecipe.title;
		state.form.des = selectedRecipe.des;
		state.form.ingredents = [...selectedRecipe.ingredents];
		state.form.steps = [...selectedRecipe.steps];
		dispatch({ type: Actions.setUpEdit, payload: id });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				handleModal,
				handleSubmit,
				handleChange,
				addIng,
				handleIng,
				handleIngDelete,
				addSteps,
				handleSteps,
				handleRemove,
				handleRecipe,
				handleEdit,
				handleStepsDelete,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default ContextProvider;
