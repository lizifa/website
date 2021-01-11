import React from 'react';
import Head from 'next/head';
import { CursorSpecialEffects } from '../utils/cursorSpecialEffects';
class Home extends React.Component {
	static async getInitialProps() {
		return {};
	}
	componentDidMount() {
		const cursorSpecialEffects = new CursorSpecialEffects();
		cursorSpecialEffects.init();
	}
	render() {
		return <div>sssssssss</div>;
	}
}
export default Home;
