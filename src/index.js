import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Editor from './components/editor';
import {toBase64} from './utils';
import './index.scss';

class App extends Component {
	state = {
		size: '1200x630',
		postImage: null,
		imageX: 0,
		imageY: 0,
		rectColor: '#fa3b5a'
	};

	changeSizeHandler = (event) => {
		event.persist();

		this.setState({
			...this.state,
			size: event.target.value
		})
	};

	setImageHandlerFromFile = async (e) => {
		e.persist();
		const file = e.target.files[0];

		if (file && file.type.match('image.*')) {
			const image = new Image();
			image.src = await toBase64(file);
			image.onload = () => {
				const imageObj = {
					image: image,
					width: image.width,
					height: image.height,
				};
				this.setState({
					...this.state,
					imageX: 0,
					imageY: 0,
					postImage: imageObj
				});

			};

		} else {
			alert("File mast be image!");
		}

	};

	onDragEnd = (e)=>{
		this.setState({
			...this.state,
			imageX: e.target.x(),
			imageY: e.target.y(),
		})
	};

	setColor=(e)=>{
		e.persist();
		if(e.currentTarget.value.startsWith('#')){
			this.setState({
				...this.state,
				rectColor: e.currentTarget.value
			})
		}
	};

	render() {
		return (
			<div className="App">
				<Header
					changeSizeHandler={this.changeSizeHandler}
					setImageHandlerFromFile={this.setImageHandlerFromFile}
					setColor={this.setColor}
					rectColor={this.state.rectColor}
				/>

				<Editor
					size={this.state.size}
					rectColor={this.state.rectColor}
					postImage={this.state.postImage}
					imageX={this.state.imageX}
					imageY={this.state.imageY}
					onDragEnd={this.onDragEnd}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));

