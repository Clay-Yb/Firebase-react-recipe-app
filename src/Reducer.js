export const Actions = {
	modalToggle: 'modal_toggle',
	onChange: 'on_change',
	readData: 'read',
	addIng: 'add_ingredents',
	ingChange: 'ing_change',
	addSteps: 'add_steps',
	stepsChange: 'steps_change',
	resetForm: 'reset_form',
	recipeShow: 'show',
	setUpEdit: 'setUpEdit',
	resetEdit: 'resetEdit',
	deleteIng: 'deleteIng',
	deleteSteps: 'deleteSteps',
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case Actions.modalToggle:
			let newModalState = action.payload === 'open' ? true : false;
			return {
				...state,
				isModal: newModalState,
				form: { title: '', des: '', ingredents: [], steps: [] },
				isEdit: false,
				editId: null,
			};

		case Actions.readData:
			return {
				...state,
				recipe: action.payload,
			};

		case Actions.onChange:
			return {
				...state,
				form: { ...state.form, [action.payload.type]: action.payload.value },
			};

		case Actions.addIng:
			return {
				...state,
				form: {
					...state.form,
					ingredents: [...state.form.ingredents, { name: '', id: Date.now().toString() }],
				},
			};

		case Actions.ingChange:
			const newStateIng = [...state.form.ingredents];
			newStateIng[action.payload.index].name = action.payload.value;
			return {
				...state,
				form: { ...state.form, ingredents: newStateIng },
			};

		case Actions.addSteps:
			return {
				...state,
				form: {
					...state.form,
					steps: [...state.form.steps, { name: '', id: Date.now().toString() }],
				},
			};

		case Actions.stepsChange:
			const newStateSteps = [...state.form.steps];
			newStateSteps[action.payload.index].name = action.payload.value;
			return {
				...state,
				form: { ...state.form, steps: newStateSteps },
			};

		case Actions.resetForm:
			return {
				...state,
				form: { title: '', des: '', ingredents: [], steps: [] },
				isModal: false,
			};

		case Actions.recipeShow:
			const recipeClone = state.recipe.map((item) => {
				if (item.id === action.payload) {
					return { ...item, view: !item.view };
				}
				return item;
			});
			return {
				...state,
				recipe: recipeClone,
			};

		case Actions.setUpEdit:
			return {
				...state,
				isModal: true,
				isEdit: true,
				editId: action.payload,
			};

		case Actions.resetEdit:
			return {
				...state,
				isModal: false,
				isEdit: false,
				editId: null,
				form: { title: '', des: '', ingredents: [], steps: [] },
			};

		case Actions.deleteIng:
			const newFormIng = {
				...state.form,
				ingredents: state.form.ingredents.filter((_, index) => index !== action.payload),
			};

			return {
				...state,
				form: newFormIng,
			};

		case Actions.deleteSteps:
			const newFormStpes = {
				...state.form,
				steps: state.form.steps.filter((_, index) => index !== action.payload),
			};

			return {
				...state,
				form: newFormStpes,
			};
		default:
			return state;
	}
};
