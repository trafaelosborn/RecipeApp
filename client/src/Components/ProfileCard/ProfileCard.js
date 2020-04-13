import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import API from '../../Utils/api';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 160,
    },
  });

  const cardStyle = {
    margin: '15px',
    height: '505px',
    width: '345px'
  };

export default function ProfileCard(props) {
	const classes = useStyles();
  
    return (
      <Card style={cardStyle} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.recipeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.dietLabels}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        
       {/*  <DeleteIcon onClick={() => {props.handleDelete(props.id)}} /> */}
        <DeleteIcon onClick={() => {props.handleDelete(props.id)}} />
        <Button size="small" color="primary" href={'/recipepage/'+props.id}>
					See Recipe
				</Button>
        </CardActions>
      </Card>
    );
  }


