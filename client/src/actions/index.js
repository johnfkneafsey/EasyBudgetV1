/* eslint-disable */
import store from '../store'


// export const asyncAddExpenseCategory = (category) => dispatch => {
// 	return fetch('/category', {
// 		method: 'post',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({name: category})
// 	})
// 	.then(res => {
// 		if (!res.ok) {
// 				throw new Error(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(_res => {
// 		return dispatch(addExpenseCategory(_res.name))
// 	})
// 	.catch(error => {
// 		return error;
// 	})
// }


// export const asyncAddExpense = (dollars, category, description, date) => dispatch => {
// 	return fetch('/expense', {
// 		method: 'post',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({category: category,
// 							  cost: dollars,
// 							  description: description,
// 							  date: date})
// 	})
// 	.then(res => {
// 		if (!res.ok) {
// 			throw new Error(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(_res => {
// 		return dispatch(addExpense(_res.cost, _res.category, _res.description, _res.date))
// 	})
// 	.catch(error => {
// 		return error;
// 	})
// }


// export const asyncAddCategoryGoal = (category, dollars) => dispatch => {
// 	return fetch('/goal', {
// 		method: 'post',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({category: category,
// 							  goal: dollars})
// 	})
// 	.then(res => {
// 		if (!res.ok) {
// 			throw new Error(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(_res => {
// 		return dispatch(addCategoryGoal(_res.category, _res.goal))
// 	})
// 	.catch(error => {
// 		return error;
// 	})
// }

export const asyncFetchAllCategories = () => dispatch => {
  	return fetch('/category')
  	.then(res => {
		if (!res.ok) {
			throw new Error(res.statusText);
    	}
    	return res.json();
  	})
  	.then(_res => {
     	dispatch(fetchAllCategories(_res))
	})
  	.catch(error => {
  		return error;
	});
};

export const asyncFetchAllGoals = () => dispatch => {
  	return fetch('/goal')
  	.then(res => {
		if (!res.ok) {
			throw new Error(res.statusText);
    	}
    	return res.json();
  	})
  	.then(_res => {
     	dispatch(fetchAllGoals(_res))
	})
  	.catch(error => {
  		return error;
	});
};

export const asyncFetchAllTransactions = (category='All') => dispatch => {
  	return fetch(`/expense?category=${category}`)
  	.then(res => {
		if (!res.ok) {
			throw new Error(res.statusText);
    	}
    	return res.json();
  	})
  	.then(_res => {
     	dispatch(fetchAllTransactions(_res))
	})
  	.catch(error => {
  		return error;
	});
};


// export const asyncGetCategoryTotals = () => dispatch => {
//   	return fetch('/total')
//   	.then(res => {
// 		if (!res.ok) {
// 			throw new Error(res.statusText);
//     	}
//     	return res.json();
//   	})
// 	.then(res => {
// 		if (!res.ok) {
// 			throw new Error(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(_res => {
// 		return dispatch(getCategoryTotals(_res))
// 	})
// 	.catch(error => {
// 		return error;
// 	})
// }

//
// export const asyncDeleteExpense = (expenseId) => dispatch => {
// 	return fetch('/expense', {
// 		method: 'delete',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({expenseId: expenseId})
//
// 	})
// 	.then(res => {
// 		if (!res.ok) {
// 			throw new Error(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(_res => {
// 		console.log(_res, "THIS IS THE RESPONSE FOR DELETE")
// 		return dispatch(deleteExpense(_res.expenseId))
// 	})
// 	.catch(error => {
// 		return error;
// 	})
// }


export const MAP_USER_TO_STORE = 'MAP_USER_TO_STORE';
export const mapUserToStore = (userData) => ({
	type: MAP_USER_TO_STORE,
	userData: userData
})


export const ADD_EXPENSE_CATEGORY = 'ADD_EXPENSE_CATEGORY';
export const addExpenseCategory = (category) => ({
	type: ADD_EXPENSE_CATEGORY,
	category: category
})


export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (dollars, category, description, date) => ({
	type: ADD_EXPENSE,
	dollars: dollars,
	category: category,
	description: description,
	date: date
})

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (expenseId) => ({
	type: DELETE_EXPENSE,
	expenseId: expenseId
})


export const ADD_CATEGORY_GOAL = 'ADD_CATEGORY_GOAL';
export const addCategoryGoal = (category, dollars) => ({
	type: ADD_CATEGORY_GOAL,
	category: category,
	dollars: dollars
})


export const FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES';
export const fetchAllCategories = (categories) => ({
	type: FETCH_ALL_CATEGORIES,
	categories: categories
})

export const FETCH_ALL_GOALS = 'FETCH_ALL_GOALS';
export const fetchAllGoals = (goals) => ({
	type: FETCH_ALL_GOALS,
	goals: goals
})

export const FETCH_ALL_TRANSACTIONS = 'FETCH_ALL_TRANSACTIONS';
export const fetchAllTransactions = (transactions) => ({
	type: FETCH_ALL_TRANSACTIONS,
	transactions: transactions
})

export const CHANGE_CURRENT_CATEGORY = 'CHANGE_CURRENT_CATEGORY';
export const changeCurrentCategory = (tempCategory) => ({
	type: CHANGE_CURRENT_CATEGORY,
	tempCategory: tempCategory
})

export const GET_CATEGORY_TOTALS = 'GET_CATEGORY_TOTALS';
export const getCategoryTotals = (categoryTotals) => ({
	type: GET_CATEGORY_TOTALS,
	categoryTotals: categoryTotals
})


export const FETCH_CALENDAR = 'FETCH_CALENDAR';
export const asyncFetchCalendar = (calendar) => ({
	type: FETCH_CALENDAR,
	calendar: calendar
})

export const DISPLAY_TRANSACTION_START_DATE = 'DISPLAY_TRANSACTION_START_DATE';
export const displayTransactionStartDate = (startDate) => ({
	type: DISPLAY_TRANSACTION_START_DATE,
	startDate: startDate
})

export const DISPLAY_TRANSACTION_END_DATE = 'DISPLAY_TRANSACTION_END_DATE';
export const displayTransactionEndDate = (endDate) => ({
	type: DISPLAY_TRANSACTION_END_DATE,
	endDate: endDate
})

export const DECREMENT_RENDER_VIEW = 'DECREMENT_RENDER_VIEW';
export const decrementRenderView = () => ({
	type: DECREMENT_RENDER_VIEW,
})

export const INCREMENT_RENDER_VIEW = 'INCREMENT_RENDER_VIEW';
export const incrementRenderView = () => ({
	type: INCREMENT_RENDER_VIEW,
})


export const updateUserInDatabase = (userData) => dispatch => {
	console.log('JSON STRINGIFY' , JSON.stringify(userData));
	return fetch('http://localhost:8080/api/logout', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	})
	.then(res => {
		if (!res.ok) {
				throw new Error(res.statusText);
		}
		console.log('THIS IS BEING SENT TO LOG OUT ENDPOINT ', res);
		return res.json();
	})
	.catch(error => {
		return error;
	})
}
