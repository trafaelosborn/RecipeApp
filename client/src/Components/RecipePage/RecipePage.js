import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecipeForm from '../RecipeForm/RecipeForm'
import RecipeTabs from '../RecipeTabs/RecipeTabs'
export default function RecipePage() {
	const { id } = useParams();     
    return (
        <div>
            <Navbar />
            <RecipeTabs recipeId={id}/>
        </div>
    )
}
