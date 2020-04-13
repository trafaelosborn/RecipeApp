import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Axios from "axios";
import API from "../../Utils/api";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

const cardStyle = {
	margin: "15px",
	height: "505px",
	width: "345px",
};

export default function ImgMediaCard(props) {
	const classes = useStyles();
	const recipe = props.recipe.recipe;

	const addToFavorites = () => {
		console.log("card add to favorites");
		let recipeData = { thirdPartyRecipe: recipe };
		API.saveRecipe(recipeData);
	};

	return (
		<Card style={cardStyle} className={classes.root}>
			<CardActionArea onClick={() => window.open(recipe.url, "_blank")}>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					// height="140"
					image={recipe.image}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{recipe.label}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="h6">
						{recipe.source}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<IconButton onClick={addToFavorites} aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<Button size="small" color="primary">
					See Recipe
				</Button>
			</CardActions>
		</Card>
	);
}
