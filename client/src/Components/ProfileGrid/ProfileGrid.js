import React, { useEffect, useState } from 'react'
import api from '../../Utils/api'
import { Container } from '@material-ui/core';
import ProfileCard from '../ProfileCard/ProfileCard'
import Grid from '@material-ui/core/Grid';
import API from '../../Utils/api';

const gridStyle = {
    marginTop: '5%'
};

export default function ProfileGrid(props) {
	// use state so we can rerender the component on demand
	const [recipes, setRecipes] = useState({
		id: "",
		recipeName: "",
		image: "",
		dietLabels: []
	});

	const renderProfileGrid = () => {
		return (
			<Grid container spacing={4} >
				{props.recipes.length ? props.recipes.map((item, index) => {
					return (<Grid items >
						<ProfileCard 
							handleDelete={props.handleDelete}
							id={item.id}
							recipeName={item.recipeName}
							image={item.image}
							dietLabels={item.dietLabels}
						/>
					</Grid>)
				}) : null }
			</Grid>
		) 
	}

    return (
        <div className="Grid">
            <Container style={gridStyle}>
				{renderProfileGrid()}
            </Container>
        </div>
    );
}
