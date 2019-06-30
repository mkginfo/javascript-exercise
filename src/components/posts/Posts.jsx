import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getRogerFedererData } from "../../app-states/actions"

export function Post(props) {
	let { articlesRogerFederer, candidate, getRogerFedererData } = props

	// Fetch tweets when user clicks on candidate's button
	useEffect(() => {
		if (candidate === 'rogerfederer') {
			getRogerFedererData()
		}
	}, [candidate, getRogerFedererData])

	let cand = candidate === undefined ? 'Not set' : candidate

	return (
		<div>
			<p>@{cand}</p>

			{cand === 'rogerfederer' && (
				<div>
					<ul className="list-group list-group-flush">
						{articlesRogerFederer.map(el => (
							<li className="list-group-item" key={el.id_str}>
								<p>{el.created_at}</p>
								<p>{el.text}</p>
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}

function mapStateToProps(state) {
	return {
		articlesRogerFederer: state.remoteArticlesRogerFederer.slice(0, 10),
		candidate: state.candidate
	}
}

export default connect(
	mapStateToProps,
	{ getRogerFedererData: getRogerFedererData }
)(Post)
