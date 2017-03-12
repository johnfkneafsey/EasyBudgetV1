import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import DisplayTransactions from './display-transactions';
import ExpenseSummary from './expense-summary';
import ExpenseChart from './expense-chart';
import DailyExpensesChart from './daily-expenses-chart';
import Landing from './landing';
import Title from './title';
import LoginPage from './login-page';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import {SERVER_ROOT} from '../config';
import * as Cookies from 'js-cookie';

// import Login from './sign-in';

export class Layout extends React.Component {
	constructor(props) {
    	super(props);
    }

	render() { 

		if (this.props.renderPage === 0) {
			return (
			<div>
				< Title /> 
				< Landing  />
			</div>
			)
		}
		if (this.props.renderPage === 1) {
			return (
			< ExpenseCategoryList  />
			)
		}
		if (this.props.renderPage === 2) {
			return (
			< CategoryGoals />
			)
		}
		if (this.props.renderPage === 3) {
			return (
			< ExpenseInput />
			)
		}
		if (this.props.renderPage === 4) {
			return (
			< ExpenseSummary />
			)
		}
		if (this.props.renderPage === 5) {
			return (
			< DisplayTransactions />
			)
		}
		if (this.props.renderPage === 6) {
			return (
			< ExpenseChart /> 
			)
		}
		if (this.props.renderPage === 7) {
			return (
			< DailyExpensesChart /> 
			)
		}

	
		
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory,
	renderPage: state.renderPage
});

export default connect(mapStateToProps)(Layout);


