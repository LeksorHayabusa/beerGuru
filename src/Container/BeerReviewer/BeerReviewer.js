import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Page from './Page/Page';
import List from './List/List';
import Modal from '../../Components/UI/Modal/Modal';

class BeerReviewer extends Component {
	state = {
		isPageOpened: false
	}

	pageOpenHandler = () => {
		this.setState({
			isPageOpened: true
			// wasModalOpened: true
		})
	}

	pageCloseHandler = (backdrop) => {
		this.setState(() => {
			// if (backdrop) return {
			// 	wasModalOpened: false,
			// 	isPageOpened: false
			// }
			return { isPageOpened: false }
		})
		this.redirectHandler()

	}

	redirectHandler = () => {
		return 
	}

	render() {
		const { isPageOpened, isDetailsDownloaded } = this.state;
		return (
			<Fragment>
				<Modal
					isModalOpened={isPageOpened}
					closeModal={this.pageCloseHandler}
					redirectHandler={this.redirectHandler}
				>
					<Route
						path='/details/'
						render={(props) => (
							<Page
								isModalOpened={isPageOpened}
								closeModal={this.pageCloseHandler}
								openInModal={this.pageOpenHandler}
							/>)}
					/>
				</Modal>
				<Route
					path='/'
					render={props => (<List
						openInModal={this.pageOpenHandler}
					/>)}
				/>
			</Fragment>
		)
	}
}

export default BeerReviewer