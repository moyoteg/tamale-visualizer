import React from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ProviderLogo from '@material-ui/icons/AccessAlarm'
// import Grid from '@material-ui/core/Grid'
// import Avatar from '@material-ui/core/Avatar'
// import { makeStyles } from '@material-ui/core/styles';
import LocalizedStrings from '../Strings';

// import Image from 'material-ui-image'

// import data from '../data-samples/providers.json'

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

export default function ProviderVisualizer(props) {

  const { provider } = props

  // const classes = useStyles();

  return (
    <div>
      {provider ? (
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
            image={provider.logoURL ? provider.logoURL : ProviderLogo}
            title={provider.name ? provider.name : LocalizedStrings.noName}
          >
            {/* <Image src={ProviderLogo}/> */}
            {/* <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src={ProviderLogo} className={classes.bigAvatar} />
            </Grid> */}
          </CardMedia>
          <CardContent>
            <Typography variant="h5">
              {}
              {provider.name ? provider.name : LocalizedStrings.noName}
            </Typography>
            <Typography variant="body1">
              {provider.description ? provider.description : null}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href={provider.url} target="_blank">
              {LocalizedStrings.viewProvider} 🔗
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}

/* <div>
<h1>Providers</h1>
<div>
  {data.map((provider, index) =>
  <div key={index}>
    <h3>Provider: {index}</h3>
    <p>{provider.driver.firstName} {provider.driver.lastName}</p>
  </div>
)}
</div>
</div> */