import React, {Component} from 'react'
import { Container } from '@material-ui/core';
import Card from '../Card/Card'
import Grid from '@material-ui/core/Grid';

const gridStyle = {
    color: 'blue',
    marginTop: '5%'
  };

export default function SearchGrid(props) {
    return (
        <div classname="Grid">
            <Container style={gridStyle}>
            <Grid container spacing={4} >
                { props.content.map(function(recipe, index){
                       return(
                        <Grid items >
                        <Card recipe={recipe} content={props.content}/>
                        </Grid>
                    );
                })}
            
            </Grid>
            </Container>
        </div>
    );
}
