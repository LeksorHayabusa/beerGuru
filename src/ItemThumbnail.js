import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ItemThumbnail extends Component {
	render() {
		const { image_url, name, tagline } = this.props.item
		return (
			<div className="preview-top">
				<div 
					className="preview-cover"
					style={{
						width: '128px',
						height: '190px',
						backgroundImage: `url("${image_url}")`
					}} 
					>
				</div>
				<div className='preview-title'>{ name }</div>
				<div className='preview-slogan'>{ tagline }</div>
			</div>
		)
	}
}

export default ItemThumbnail