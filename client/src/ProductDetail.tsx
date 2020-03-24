import React, {useState, MouseEvent} from 'react'
import ProductTile from './ProductTile'
import {Button, Grid} from '@material-ui/core'
import {createStyles, makeStyles, withStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {ProductInformation} from './dec'
import {Decoded} from './App'
import {Redirect} from 'react-router-dom'
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

export interface ProductProps {
  user: Decoded | null,
  updateUser: (newToken: string | null) => void,
  currentProduct: ProductInformation
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase)

const useStyles = makeStyles(theme => ({
  buttonRoot: {
    borderRadius: 3,
    border: '2px solid black',
    height: 60,
    width: 250,
    fontSize: 20,
    display: 'block',
    margin: '10px auto'
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PosterDetail: React.FC<ProductProps> = (props) => {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState('1');
    const [goCheckout, setGoCheckout] = React.useState(false)
    const [addedToCart, setAddedToCart] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const position: SnackbarOrigin = {
      vertical: 'top',
      horizontal: 'center'
    }

    const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
      setQuantity(event.target.value as string)
    }

    const handleOpen = ():void => {
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpen(false);
    }    
    const handlePurchase = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(props.user) {

        for(let i: number = 1; i <= parseInt(quantity); i++) {
          let email: string = props.user.email
          let item: string = props.currentProduct.title
          let price: string = props.currentProduct.price
          let imgUrl: string = props.currentProduct.imagePath
          let imageID: string = props.currentProduct.imageID
          let sourceID: string = props.currentProduct.sourceID
          let data: object = {
            email,
            item,
            price,
            imgUrl,
            imageID,
            sourceID
          }
          fetch(`/cart`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then((response: Response) => {
            response.json().then(result => {
              if(response.ok) {
                props.updateUser(result.token)
                setGoCheckout(true)
              } else {
                console.log(`${response.status} ${response.statusText}: ${result.message}`)
              }
            }).catch((err: Error) => console.log(err))
          }).catch((err: Error) => {
            console.log(`Error: ${err.toString()}`)
          })
        }
      }
    }

    const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(props.user) {

        for(let i: number = 1; i <= parseInt(quantity); i++) {
          let email: string = props.user.email
          let item: string = props.currentProduct.title
          let price: string = props.currentProduct.price
          let imgUrl: string = props.currentProduct.imagePath
          let imageID: string = props.currentProduct.imageID
          let sourceID: string = props.currentProduct.sourceID
          let data: object = {
            email,
            item,
            price,
            imgUrl,
            imageID,
            sourceID
          }
          fetch(`/cart`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then((response: Response) => {
            response.json().then(result => {
              if(response.ok) {
                props.updateUser(result.token)
                handleOpen()
                setAddedToCart(true)
              } else {
                console.log(`${response.status} ${response.statusText}: ${result.message}`)
              }
            }).catch((err: Error) => console.log(err))
          }).catch((err: Error) => {
            console.log(`Error: ${err.toString()}`)
          })
        }
      }
    }
    const purchaseButton = (!addedToCart)? (
      <Button classes={{root: classes.buttonRoot}} onClick={(e: MouseEvent<HTMLButtonElement>) => handlePurchase(e)} className="posterDetailBuyBtn material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">Buy</Button>
    ) :
    (
      <Button classes={{root: classes.buttonRoot}} onClick={() => setGoCheckout(true)} className="posterDetailBuyBtn material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">Go to Checkout</Button>
    )

    if(goCheckout) {
      return <Redirect to="cart/payment" />
    }
    return(  
        <div className="posterDetail">
          <Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Added to cart!
            </Alert>
          </Snackbar>
          <Grid container
                justify="space-around"
                alignItems="center"
                spacing={1}
          >
            <Grid item md={6} xs={12}>
                <ProductTile imageURL={props.currentProduct.imagePath} />
              </Grid>
          </Grid>
          <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
                className="posterDetailGrid"
            >
            <Grid item md={6} xs={12}>
                <h1>{props.currentProduct.title}</h1>
                  <div className="priceDiv">
                      <h4 className="posterDetailPrice">${props.currentProduct.price}</h4>
                      <FormControl className={classes.margin}>
                          <InputLabel id="demo-customized-select-label">Qty</InputLabel>
                          <Select
                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              value={quantity}
                              onChange={handleChange}
                              input={<BootstrapInput />}
                          >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                          </Select>
                      </FormControl>
                  </div>
                  <div>
                  <Button classes={{root: classes.buttonRoot}} className="posterDetailBuyBtn material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => handleAddToCart(e)}>Add to cart</Button>
                  {purchaseButton}
                  </div>
                  <h2>Description</h2>
                  <p>This poster is 1 foot by 3 feet</p>
            </Grid>
          </Grid>
        </div>
    )
}

export default PosterDetail