import React, { useEffect } from 'react';
import './App.scss';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  title: {
    textAlign: "center",
    paddingBottom: 16,
  },
  pos: {
    marginBottom: 12,
  },
});



const GET_ITEM_INFO = gql`
query getInventory($id: ID!) {getInventory(id: $id)
    {
     wallsAndCeilings 
     windows 
     doors 
     lights 
     furniture 
     skirting
       agreement {
       signedDate
       contractStartDate
       contractEndDate
       deposit
       tenant {
         email 
         firstName
         lastName
       }
       property {
         streetAddress
         city
         county
         postcode
       }
     }
   }
}`;

   export const Property = () => {

    const { id } = useParams()
    const classes = useStyles();
    const { loading, error, data } = useQuery(GET_ITEM_INFO, {variables: { id }})

    const formatTitle = (title) => {

      let newTitle

      if (title === "wallsAndCeilings") {return newTitle = "Walls and ceilings"} 
      else if (title === "signedDate") {return newTitle = "Signed date"} 
      else if (title === "contractStartDate") {return newTitle = "Contract start date"} 
      else if (title === "contractEndDate") {newTitle = "Contract end date"} 
      else if (title === "firstName") {return newTitle = "First name"}
      else if (title === "lastName") {return newTitle = "Last name"}
      else {newTitle = title.charAt(0).toUpperCase() + title.slice(1)}
    
      return newTitle
    }

  
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    const {wallsAndCeilings, windows, doors, lights, furniture, skirting, agreement : {signedDate, contractStartDate, contractEndDate, deposit, tenant: {email, firstName, lastName}, property: {streetAddress: address, city, county, postcode}}} = data.getInventory
    const args = {wallsAndCeilings, windows, doors, lights, furniture, skirting, signedDate, contractStartDate, contractEndDate, deposit, email, firstName, lastName, address, city, county, postcode}

   return <div className="container">
     <div className="main">
       <div className="grid">
       <Card className={classes.root}>
         {console.log(Object.entries(args))}
          <CardContent>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  property #{`${id}`}
                </Typography>
              {Object.entries(args).map( item => <>
                <div className="grid-row">
                  <div className="grid-column"><Typography variant="body2" color="textSecondary" component="p">{`${formatTitle(item[0])}: `}</Typography></div>
                  <div className="grid-column"><Typography variant="body2" component="p">{item[1]}</Typography></div>
                </div>
                </>
              )}
          </CardContent>
          <div style={{height: "24px", background: "#00766c"}}></div>
        </Card>
       </div>
     </div>
   </div>
  }