import React, { Component } from 'react'
// import { ThumbContext } from './../Page/SimilarList/SimilarList'
import classes from './Thumbnail.css'

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
			{/* <ThumbContext.Consumer> */}
				<div
					className={cover}
					style={style}
				>
				</div>
				<div className={classes.title}>{name}</div>
				<div className={classes.slogan}>{tagline}</div>
				{/* </ThumbContext.Consumer> */}
			</div>
	)
}

export default Thumbnail

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