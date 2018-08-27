import React, { Component} from 'react'
import classes from './Thumbnail.css'

const Thumbnail = (props) => {
	const { 
		image_url, 
		name, 
		tagline 
			} = props.item,
		image = !(/keg\.png/i .test(image_url)),
		cover = image ? classes.cover : classes['keg-cover'],
		style = {
			width: '150px',
			height:  image ? '190px' : '180px',
			backgroundImage: `url("${image_url}")`
		};
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

export default Thumbnail