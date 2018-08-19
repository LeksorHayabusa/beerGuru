import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ItemThumbnail extends Component {

	checkProperImage = () => {
		const { image_url } = this.props.item;
		return !(/keg\.png/i .test(image_url))
	}

	render() {
		const { image_url, name, tagline } = this.props.item
		return (
			<div className="preview-top">
				<div 
					className={this.checkProperImage() ? "preview-cover" : "preview-improper-cover"}
					style={{
						width: '150px',
						height: this.checkProperImage() ? '190px' : '150px',
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