import React, {useRef, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import API from '../../Utils/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "inline-block"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const classes = useStyles();

    const [recipeName, setRecipeName] = useState("");
    const [ingredientItems, setIngredientItems] = useState([]);
    const [directionItems, setDirectionItems] = useState([]);

    // testInput creates an input reference to use to catch 
    // the value of our input on submit
    const ingredientInput = useRef();
    const directionInput = useRef();
    const recipeInput = useRef();

    // Input handler for form submission
    const formSubmitted = (event) => {
        event.preventDefault();
        console.log(ingredientInput.current.value)
		setIngredientItems(prevState => [...prevState, ingredientInput.current.value]);		
		document.getElementById('ingredient').value = "";
        console.log(ingredientItems);
    }

    const directionSubmitted = (event) => {
        event.preventDefault();
		setDirectionItems(prevState => [...prevState, directionInput.current.value]);
		document.getElementById('direction').value = "";
        console.log(directionItems);
    }

    const nameChange = (event) => {
        event.preventDefault();
		setRecipeName(recipeInput.current.value);
        console.log(recipeName)
    }

    const formSubmit = (event) => {
        event.preventDefault();
        let recipeData = {
            recipeName,
            ingredientItems,
            directionItems
        }
        API.createRecipe(recipeData).then(result => {
			if ( !result.data.error ) {
				alert("Your recipe has been created!")
			} else {
				if ( result.data.error === 555 ) {
					alert("I couldn't find one of those ingredients. Please try again.");
				}
			}
		})
		// Clear form inputs
		clearForm();
    }

	const clearForm = () => {
		setRecipeName("");
		setIngredientItems([]);
		setDirectionItems([]);
		document.getElementById("create-recipe-form").reset();
	}

  
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div></div>
                <Typography  component="h1" variant="h3">
                Create a Recipe
                </Typography>
                <form className={classes.form} id="create-recipe-form" noValidate>
                <TextField onChange={(event) => { nameChange(event); }}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="recipeName"
                        label="Recipe Name"
                        name="inputTest"
                        inputRef={recipeInput}
                        autoFocus
                    />
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="ingredient"
                        label="Add Ingredient"
                        name="inputTest"
                        inputRef={ingredientInput}
                        autoFocus
                    />
                    {/* <input name={'inputTest'} placeholder="Type Input Item" ref={testInput} /> */}
                    <AddIcon color="primary" onClick={(event) => { formSubmitted(event); }} />
               {/*  </form>
                <form className={classes.form}> */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="direction"
                        label="Add Direction"
                        name="direction"
                        inputRef={directionInput}
                        autoFocus
                    />
                    <AddIcon color="primary" onClick={(event) => { directionSubmitted(event); }}/>
                </form>
    <h2>{recipeName}</h2>
                </div>
                <h3>Ingredients:</h3>
                <div >
                <ul>
                    {ingredientItems.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        );
                    })}
                </ul>
                </div>
                <Divider />
                <h3>Directions:</h3>
                <div >
                <ol>
                    {directionItems.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        );
                    })}
                </ol>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={formSubmit}
                >
                    Create Recipe!
                </Button>


            
            <Box mt={8}>

            </Box>
        </Container>
    );
}



