import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BookRoundedIcon from "@material-ui/icons/BookRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ProfileGrid from "../ProfileGrid/ProfileGrid";
import SearchGrid from "../SearchGrid/SearchGrid";
import API from "../../Utils/api";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	input: {
		marginLeft: "90%",
		color: "pink",
	},
	search: {
		position: "relative",

		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [recipes, setRecipes] = React.useState([]);
	const [category, setCategory] = React.useState("");
	const [ user, setUser ] = React.useState({firstName:"", lastName:"", id:"", email:""});

	const getLoggedOnUserId = () => {
		API.getUserId().then(result => {
			setUser({
				firstName: result.data.firstName,
				lastName: result.data.lastName,
				id: result.data._id,
				email: result.data.email
			})
		})
	}

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleDelete = (id) => {
		// Delete the selected recipe and reload the current category 
		API.deleteRecipe(id);
		// For some reason getting the category state here results in an object with 
		// an extra "category" key. I changed loadRecipes to expect a string so we can sanitize
		// input wherever it's called. 
		const cat = {category};
		loadRecipes(cat.category.category);
	}

	const loadRecipes = (category) => {
		API.getRecipes(category).then((results) => {
			const newArr = results.data.map((item, index) => {
				if (item.isCustom) {
					return {
						id: item._id,
						recipeName: item.recipeName,
						dietLabels: "Custom Recipe",
						image: item.image,
					};
				} else {
					return {
						id: item._id,
						recipeName: item.thirdPartyRecipe.label
							? item.thirdPartyRecipe.label
							: "Recipe Name",
						dietLabels: item.thirdPartyRecipe.dietLabels
							? item.thirdPartyRecipe.dietLabels.join(", ")
							: null,
						image: item.thirdPartyRecipe.image,
					};
				}
			});
			setRecipes(newArr);
		});
	}

	const handleClick = (e, category) => {
		// Set category and get recipes
		setCategory({category});
		const cat = {category};
		loadRecipes(cat.category);
	};

	useEffect(() => {
		getLoggedOnUserId();
		// Show allrecipes when Profile loads
		loadRecipes("allrecipes");
	}, [])

	const drawer = (
		<div>
			<div className={classes.toolbar} />

			<List>
				{[
					{ text: "My Recipes", category: "myrecipes" },
					{ text: "Saved Recipes", category: "savedrecipes" },
					{ text: "All Recipes", category: "allrecipes" },
				].map((item, index) => (
					<ListItem button key={item.text}>
						<ListItemIcon>
							{index % 1 === 0 ? (
								<FavoriteRoundedIcon color="secondary" />
							) : (
								<MailIcon />
							)}
						</ListItemIcon>
						<ListItemText
							primary={item.text}
							onClick={(e) => {
								handleClick(e, item.category);
							}}
						/>
					</ListItem>
				))}
			</List>

			<Divider />

			<List>
				{["My Cookbooks"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 1 === 0 ? <BookRoundedIcon color="primary" /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{user.firstName} {user.lastName}
					</Typography>

					<div>
						<Button href="/createrecipe/"> Create a Recipe </Button>
						<Button href="/profile/"> My Profile </Button>
						<Button href="/search/"> Find Recipes! </Button>
					</div>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				{<ProfileGrid recipes={recipes} handleDelete={handleDelete} />}
				{/* <ProfileGrid category={category} /> */}
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	container: PropTypes.any,
};

export default ResponsiveDrawer;
