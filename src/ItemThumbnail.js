import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ItemThumbnail extends Component {
	render() {
		const { image_url, name, tagline } = this.props.item
		return (
			<div className="item-top">
				<div 
					className="item-cover"
					style={{
						width: '128px',
						height: '190px',
						backgroundImage: `url("${image_url}")`
					}} 
					>
				</div>
				<div className='item-title'>{ name }</div>
				<div className='item-slogan'>{ tagline }</div>
			</div>
		)
	}
}

export default ItemThumbnail