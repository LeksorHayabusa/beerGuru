import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import * as BeerAPI from './../BeerAPI'
import SimilarList from './../SimilarList/SimilarList'
import classes from './Page.css'

class Page extends Component {
	state = {
    isContentLoading: false,
    isError: false,
    itemID: null,
    item: {},
  }

  checkItemError = (element) => {
    if(element instanceof Error || element === undefined) {
      console.log(element)
      if(element instanceof Error && element.statusCode === 429)
        alert('you have reached query limits. Try later in an hour');
      this.setState({
        isError: true,
				isContentLoading: false
      })
      return true
    }
  }

  downloadSingleItem = () => {
    const itemID = this.state.itemID;
    this.setState({
      isContentLoading: true,
      isError: false
    })
    BeerAPI.getSingleBeer(itemID)
      .then(item => {
        if(this.checkItemError(item)) return;
        this.setState({
          isContentLoading: false,
          item: item
        })
      })
  }
  
	item = (itemID) => {
		this.setState(
			{ itemID: itemID }, 
			() => this.downloadSingleItem()
		)
	}

	addressItemID = () => 
		window.location.pathname.match(/\d+/)[0]

	componentDidMount = () => {
		this.item(this.addressItemID())
		window.addEventListener('hashchange', ()=>console.log('hello hesh', false))
	}

	componentWillUnmount = () => {
		window.removeEventListener('hashchange')
	}
	

	render() {
		const {	
			image_url,
			name,
			tagline,
			ibu,
			abv,
			ebc,
			description,
			food_pairing } = this.state.item,
			image = !(/keg\.png/i .test(image_url));
		
		return (
			<div className={classes.top}>
				<div className={classes.overview}>
					<div 
						className={image ? classes.cover : classes.keg_cover}
						style={{
							width: '200px',
							height: image ? '450px' : '300px',
							backgroundImage: `url("${image_url}")`
						}} 
						>
					</div>
					<div className={classes['text-container']}>
						<h3 className={classes.title}>{ name }</h3>
						<div className={classes.slogan}>{ tagline }</div>
						<div className={classes['feature-container']}>
							<div className={classes['features-name']}><strong>IBU</strong>: {ibu}</div>
							<div className={classes['features-name']}><strong>ABV</strong>: {abv}%</div>
							<div className={classes['features-name']}><strong>EBC</strong>: {ebc}</div>
						</div>
						<div className={classes.description}>{ description }</div>
						<div className={classes['pairing-list']}>
							<p>Best served with:</p>
							<div className={classes["pairing-list"]}>
								{food_pairing ? food_pairing.map(el => 
									<div key={ el }>{ el }</div>
								) : 'no specified food'}
							</div>
						</div>
					</div>
				</div>
				<SimilarList 
					changedAdressItemID = { this.changedAdressItemID }
				/>
				<Link to='/' className={classes["back-to-list-button"]}><p>Return ot the List</p></Link>
			</div>
		)
	}
}

export default Page