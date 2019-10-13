import React from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
// import Avatar from '@material-ui/core/Avatar'
// import { makeStyles } from '@material-ui/core/styles';
import strings from '../Helpers/Strings';

// import Image from 'material-ui-image'

import CartLogo from '../cart.svg'

// import data from '../data-samples/carts.json'

// const useStyles = makeStyles({
//   avatar: {
//     margin: 10,
//   },
//   bigAvatar: {
//     margin: 10,
//     width: 60,
//     height: 60,
//   },
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//     margin: 10,
//     backgroundSize: 'cover'
//   },
// });

export default function CartVisualizer(props) {

  const { cart } = props

  // const classes = useStyles();

  return (
    <div>
      {cart ? (
        <Card>
          <CardMedia
            style={{
              height: 0,
              paddingTop: '30.25%',
              // paddingBottom: '30.25%',
              // height: '100%',
              margin: '1%',
              // backgroundSize: 'cover',
              // borderBottom: 1
            }}
            // className={classes.media}
            image={cart.driver.profilePictureURL ? cart.driver.profilePictureURL : CartLogo}
            title={cart.driver.firstName ? cart.driver.firstName : strings.noFirstName}
          >
            {/* <Image src={CartLogo}/> */}
            {/* <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src={CartLogo} className={classes.bigAvatar} />
            </Grid> */}
          </CardMedia>
          <CardContent>
            <Typography variant="h5">
              {}
              {cart.driver.firstName ? cart.driver.firstName : strings.noFirstName} {cart.driver.lastName ? cart.driver.lastName : strings.noLastName}
            </Typography>
            <Typography variant="body1">
              {cart.description ? cart.description : null}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href={cart.url} target="_blank">
              {strings.formatString(strings.viewCart)} 🔗
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}

/* <div>
<h1>Carts</h1>
<div>
  {data.map((cart, index) =>
  <div key={index}>
    <h3>Cart: {index}</h3>
    <p>{cart.driver.firstName} {cart.driver.lastName}</p>
  </div>
)}
</div>
</div> */