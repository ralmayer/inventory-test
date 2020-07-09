import React, { useEffect } from 'react';
import './App.scss';
import { Property } from './Property'
import {BrowserRouter as Router} from 'react-router-dom'
import { Route } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        background: '#00766c;',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        width: 140,
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
      },
    },
  },
})

const GET_INVENTORY = gql`
{getInventories 
  {agreement 
    {id
      property 
      {city, streetAddress},
    tenant {
      firstName, lastName
    }
    }
  }  
}`;

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_INVENTORY)

  const goToPropertyDetails = (id) => history.push(`/${id}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return <>
  <div className="container">
    <div className="main">
        <div className="grid">
          {data?.getInventories.map(({ agreement: {id, property: {city, streetAddress: address}, tenant: {firstName, lastName}}}, index) => (
          <div key={id} className="card">

<Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          property #{`${id}`}
        </Typography>
        <Typography variant="h5" component="h2">
          {city}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {address}
        </Typography>
      </CardContent>
      <CardActions>
      <ThemeProvider theme={theme}>
        <Button size="small" onClick={() => goToPropertyDetails(id)}>Learn More</Button>
      </ThemeProvider>
      </CardActions>
    </Card>

          </div>))}
        </div>
    </div>
  </div>
  </>

}

const Nav = () => {
  
  const history = useHistory()
  const { id } = useParams()

  const goHome = () => history.push(`/`)

  useEffect(() => {console.log(history)}, [])

  return <>
          <div className="nav-top"></div>
          <div className="nav-body">
          <div className="nav-item">{history.location.pathname !== "/" ? <Button><ArrowBackIcon onClick={() => goHome()}/></Button> : ""}</div>
            <div className="nav-item">     
              <Typography variant="h3" gutterBottom>
                Properties
              </Typography>
            </div>
            <div className="nav-item"> </div>
        </div>
  </>
}

const routes = [
  {path: '/', name: 'home', Component: Home},
  {path: '/:id', name: 'property', Component: Property},
]

const App = () => {
  return <>
    <div className='App'>
   
      <Router>
        <Nav />
        {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              <Component />
            </Route>
          ))}
      </Router>
    </div>
  </>
}


export default App
