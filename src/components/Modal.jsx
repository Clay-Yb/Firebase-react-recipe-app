import React from 'react';
import { useGlobalContext } from '../ContextProvider';
import './Modal.scss';
const Modal = () => {
	const {
		handleModal,
		handleSubmit,
		handleChange,
		form,
		addIng,
		handleIng,
		addSteps,
		handleSteps,
		isEdit,
		handleIngDelete,
		handleStepsDelete,
	} = useGlobalContext();

	return (
		<div className="modal_container">
			<div className="modal">
				<h3>{isEdit ? 'Edit recipe' : 'Add a new recipe'}</h3>

				<form onSubmit={handleSubmit}>
					<div className="form_control">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							autoComplete="off"
							value={form.title}
							onChange={(e) => handleChange(e.target.value, 'title')}
						/>
					</div>

					<div className="form_control">
						<label htmlFor="des">Description</label>
						<textarea
							name="des"
							id="des"
							value={form.des}
							onChange={(e) => handleChange(e.target.value, 'des')}
						/>
					</div>

					<div className="ing_container">
						<label htmlFor="ing">Ingredents</label>
						{form.ingredents?.map((_, i) => (
							<div className="form_control" key={i}>
								<input
									type="text"
									id="ing"
									value={form.ingredents[i].name}
									onChange={(e) => handleIng(e.target.value, i)}
									autoComplete="off"
								/>
								<button type="button" onClick={() => handleIngDelete(i)}>
									&times;
								</button>
							</div>
						))}
						<button className="add btn" onClick={addIng} type="button">
							Add Ingredient
						</button>
					</div>

					<div className="step_container">
						<label htmlFor="steps">Steps</label>
						{form.steps?.map((_, i) => (
							<div className="form_control" key={i}>
								<input
									type="text"
									id="ing"
									value={form.steps[i].name}
									onChange={(e) => handleSteps(e.target.value, i)}
									autoComplete="off"
								/>
								<button type="button" onClick={() => handleStepsDelete(i)}>
									&times;
								</button>
							</div>
						))}
						<button className="add btn" onClick={addSteps} type="button">
							Add Step
						</button>
					</div>

					<div className="modal_btns">
						<button className="add btn">{isEdit ? 'Edit' : 'Submit'}</button>
						<button type="button" onClick={() => handleModal('close')} className="btn_danger">
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
