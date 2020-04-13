import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import API from '../../Utils/api'

const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({search, handleSearch, handleInput}) {

	const [ user, setUser ] = useState({firstName:"", lastName:"", id:"", email:""});

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

	useEffect(() => {
		getLoggedOnUserId();
	}, [])

  	const classes = useStyles();
	  const curr_user = {user};
	return (
    	<div className={classes.root}>
      		<AppBar position="fixed">
        		<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						{user.firstName} {user.lastName}
					</Typography>
					<div>
						<Typography className={classes.root}>
						</Typography>
					</div>
					<div>
						<Button href="/createrecipe"> Create a Recipe </Button>
						<Button href="/profile"> My Profile </Button>
						<Button onClick={handleSearch}>Get Recipes! </Button>
					</div>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							name="search"
							value={search}
							onChange={handleInput}
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
        		</Toolbar>
      		</AppBar>
		</div>
	);
}