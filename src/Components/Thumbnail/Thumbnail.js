import React from 'react'
import classes from './Thumbnail.css'

const thumbnail = (props) => {

	const {
		image_url,
		name,
		tagline } = props.item,
		image = !(/keg\.png/i.test(image_url)),
		cover = image ? classes['bottle-cover'] : classes['keg-cover'],
		style = {
			width: '150px',
			height: image ? '190px' : '180px',
			backgroundImage: `url("${image_url}")`
		};
	return (
		<div className={classes.Thumbnail}>
				<div
					className={cover}
					style={style}
				>
				</div>
				<div className={classes.title}>{name}</div>
				<div className={classes.slogan}>{tagline}</div>
			</div>
	)
}

export default thumbnail

/*
const Thumbnail = (props) => {
	const dummy = {
		image_url: '',
		name: '',
		tagline: ''
	}
 
	const {
		image_url,
		name,
		tagline } = props.item,
		image = !(/keg\.png/i.test(image_url)),
		{ dummy_name,
			dummy_tagline } = dummy,
		cover = image ? classes['bottle-cover'] : classes['keg-cover'],
		style = {
			width: '150px',
			height: image ? '190px' : '180px',
			backgroundImage: `url("${image_url}")`
		};
	return (
		<div className={classes.Thumbnail}>
			<ThumbContext.Consumer>
				<div
					className={cover}
					style={style}
				>
				</div>
				<div className={classes.title}>{name}</div>
				<div className={classes.slogan}>{tagline}</div>
			</ThumbContext.Consumer>
		</div>
	)
}

export default Thumbnail */