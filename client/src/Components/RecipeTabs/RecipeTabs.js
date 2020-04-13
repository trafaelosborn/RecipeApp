import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import API from '../../Utils/api';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  
});

const containerStyle = {
    marginTop: '5%'
}

export default function RecipeTabs(props) {
    
const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [recipe, setRecipe] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get recipe info using props.recipeId
  useEffect(() => {
	API.getRecipeById(props.recipeId)
		.then(recipe => {
			if (!recipe.data.isCustom) {
				setRecipe({
					recipeName: recipe.data.thirdPartyRecipe.label ? recipe.data.thirdPartyRecipe.label 
						: "Unnamed Recipe",
					image: recipe.data.thirdPartyRecipe.image ? recipe.data.thirdPartyRecipe.image 
						: "https://img1.looper.com/img/gallery/the-untold-truth-of-gremlins/intro-1537807042.jpg",
					// ingredientLines is an array of arrays. Use concat to flatten in to a single array
					ingredientLines: recipe.data.thirdPartyRecipe.ingredientLines ?
					[].concat(...recipe.data.thirdPartyRecipe.ingredientLines) : "No ingredients found",
					calories: recipe.data.thirdPartyRecipe.calories ? Math.floor(recipe.data.thirdPartyRecipe.calories) : null,
					totalNutrients: recipe.data.thirdPartyRecipe.totalNutrients ? recipe.data.thirdPartyRecipe.totalNutrients : null,
					totalDaily: recipe.data.thirdPartyRecipe.totalDaily ? recipe.data.thirdPartyRecipe.totalDaily : null
				})
			} else {
				setRecipe({
					recipeName: recipe.data.recipeName ? recipe.data.recipeName : "Unnamed Recipe",
					image: recipe.data.image ? recipe.data.image 
						: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
					ingredientLines: recipe.data.ingredientItems ?
					recipe.data.ingredientItems : "No ingredients found",
					directionLines: recipe.data.directionItems ? recipe.data.directionItems : "No directions found", 
					calories: recipe.data.calories ? recipe.data.calories : null,
					totalNutrients: recipe.data.totalNutrients ? recipe.data.totalNutrients : null,
					totalDaily: recipe.data.totalDaily ? recipe.data.totalDaily : null
				})
			}
			
		})
		.catch(err => console.log(err));
}, []);

  function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && <Box p={3}>{children}</Box>}
        </Typography>
      );
    }

    const handleChangeIndex = (index) => {
        setValue(index);
      };
    const headerStyle = {
      textAlign: 'center'
    }

    const imageStyle = {
      display: 'block',
      margin: '0 auto',
      width: '450px'
	}
	
  return (
    <div >
      <Container style = {containerStyle} ></Container>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          
          aria-label="full width tabs example"
        >
          <Tab label="Recipe" />
          <Tab label="Nutrition" />
        </Tabs>
      
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          
          <Container maxWidth="sm">
			<div ><img src={recipe.image} style={imageStyle}></img></div>
          <div style={headerStyle}>
            <h1>{recipe.recipeName}</h1>
          </div>
			<div>
				<h2>Ingredients</h2>           
			</div>
			<ul>
				{recipe.ingredientLines ? recipe.ingredientLines.map(item => {
					return (<li>{item}</li>)
				}) : null}
            </ul>
			  {recipe.directionLines ? 
				(<><div>
					<h2>Directions</h2>           
				</div>
				<ol>
				{recipe.directionLines.map(item => {
					return (<li>{item}</li>)
				})}
				</ol></>) : null}
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Container maxWidth="sm">
        <h1>Nutrition</h1>
        <TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				{recipe.totalNutrients ? Object.keys(recipe.totalNutrients).map(key => {
					if (recipe.totalNutrients[key].label === "Energy") {
						return (<TableRow>
							<TableCell align="left">Calories</TableCell>
							<TableCell  align="left">{Math.floor(recipe.totalNutrients[key].quantity)}&nbsp;{recipe.totalNutrients[key].unit}</TableCell>
						</TableRow>)
					} else {
						return (<TableRow>
								<TableCell align="left">{recipe.totalNutrients[key].label}</TableCell>
								<TableCell  align="left">{Math.floor(recipe.totalNutrients[key].quantity)}&nbsp;{recipe.totalNutrients[key].unit}</TableCell>
							</TableRow>)
					}
				}) : null}
			</Table>
		</TableContainer>
    </Container>
        </TabPanel>
        
      </SwipeableViews>
    </div>
  );
  }

  