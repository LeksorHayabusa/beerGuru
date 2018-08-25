import React, { Component} from 'react'
import classes from './Thumbnail.css'

class Thumbnail extends Component {

	checkProperImage = () => {
		const { image_url } = this.props.item;
		return !(/keg\.png/i .test(image_url))
	}

	render() {
		const { image_url, name, tagline } = this.props.item,
			cover = this.checkProperImage() ? classes.cover : classes['keg-cover'],
			style = {
				width: '150px',
				height: this.checkProperImage() ? '190px' : '180px',
				backgroundImage: `url("${image_url}")`
			}
		return (
			<div className={classes.top}>
				<div 
					className={cover}
					style={style} 
					>
				</div>
				<div className={classes.title}>{ name }</div>
				<div className={classes.slogan}>{ tagline }</div>
			</div>
		)

	}
}

export default Thumbnail