import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Search from "./Components/Search/Search";
import Profile from "./Components/Profile/Profile";
import RecipePage from "./Components/RecipePage/RecipePage";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe";
import Test from "./Components/Test/index"
function App() {
	return (
		<Router>
			<div>
				<Switch>
					{/* <Route exact path="/" component={Signin} /> */}
					{/* <Route exact path="/signup" component={Signup} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/RecipePage/:id" component={RecipePage} />
					<Route exact path="/createrecipe" component={CreateRecipe} />  */}
					<Route exact path="/test" component={Test} />
				</Switch>
			</div>
		</Router> 
	);
}

export default App;
