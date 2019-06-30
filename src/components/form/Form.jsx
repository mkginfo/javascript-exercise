// MARK: Definitions
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { addArticle } from "../../app-states/actions"
import { setCandidate } from "../../app-states/actions"
import './Form.css'

export function ConnectedForm(props) {
	// MARK: State
	let [selected, setSelected] = useState('')
	let { candidate, setCandidate } = props

	// MARK: Effects
	// MARK: - Set Clinton as initial candidate
	useEffect(() => {
		setCandidate('rogerfederer')
		setSelected('rogerfederer')
	}, [setCandidate])

	// MARK: - Set candidate when user clicks on button
	useEffect(() => {
		setCandidate(selected)
	})

	// MARK: Actions
	let clickRogerFederer = () => {
		setSelected('rogerfederer')
	}

	// MARK: Return
	return (
		<div className='form'>
			<button
				className={selected === 'rogerfederer' ? 'clicked' : null}
				onClick={clickRogerFederer}>
				Roger Federer
			</button>

			<p>{candidate}</p>
		</div>
	)
}

// MARK: Redux
function mapDispatchToProps(dispatch) {
  return {
		addArticle: article => dispatch(addArticle(article)),
		setCandidate: candidate => dispatch(setCandidate(candidate))
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form
