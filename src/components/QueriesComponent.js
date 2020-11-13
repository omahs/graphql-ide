import React, { useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { TabsStore, QueriesStore } from '../store/queriesStore'
import { observer } from 'mobx-react-lite'
import QueriesControls from './QueriesControls'

const QueriesComponent = observer(({ queries }) => {
	const { url } = useRouteMatch()
	let history = useHistory()
	const [hoverElementIndex, setHoverElementIndex] = useState(false)
	const { switchTab, tabs } = TabsStore
	const { setQuery, query, currentQuery } = QueriesStore
	const showDescription = (i1, i2) => i1===i2 ? true : false
	const handleClick = (queryFromGallery) => {
		if (query.map(query => query.id).indexOf(queryFromGallery.id) === -1) {
			const params = {
				query: queryFromGallery.query,
				variables: queryFromGallery.arguments,
				url: queryFromGallery.url,
				name: queryFromGallery.name,
				description: queryFromGallery.description && queryFromGallery.description
			}
			setQuery(params, queryFromGallery.id)
		} else {
			let tabID = query.map(query => query.id).indexOf(queryFromGallery.id)
			switchTab(tabs[tabID].id)
		}
	}
	const queryIsOpen = (queryFromGallery) => 
		queryFromGallery.id === currentQuery.id ? true : false	
	const isSaved = baseQuery => {
		// (('saved' in query[i]) && query[i].saved) || !('saved' in query[i])
		for (let i =0; i<query.length; i++) {
			if (!((('saved' in query[i]) && query[i].saved) || !('saved' in query[i]))) {
				if (baseQuery.id === query[i].id) return false
			}
		}
		return true
	}	
	
	return (
		queries.queries.map((baseQuery, index) => (
			<li className="list-group-item" key={index}
				onMouseEnter={() => setHoverElementIndex(index)}
				onMouseLeave={() => setHoverElementIndex(-1)}
				onClick={()=>{history.push(`${url}/${baseQuery.url}`);handleClick(baseQuery)}}
			> 
				<div className="gallery__query__wrapper flex">
					<Link to={`${url}/${baseQuery.url}`} onClick={() => handleClick(baseQuery)}> 
						{isSaved(baseQuery) ? baseQuery.name : `*${baseQuery.name}`}
					</Link>
				</div>
				{ 
					(showDescription(hoverElementIndex, index) || queryIsOpen(baseQuery)) && 
						<>
							<label className="gallery__query__description" > 
								{baseQuery.description} 
							</label>
							<QueriesControls query={baseQuery} />
						</>
				}
			</li>
		))
	)
})

export default QueriesComponent
