import React from 'react'
import Form from './form/Form'
import Post from './posts/Posts'

export default function App() {
	return (
		<div className = 'row mt-5'>

			<div className = 'col-md-4 offset-md-1'>
				<h2>@RogerFederer Latest twitter posts</h2>
				<Form />
			</div>

			<div className="col-md-4 offset-md-1">
				<Post />
			</div>

		</div>
	)
}
