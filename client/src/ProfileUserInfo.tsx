import React, {useState} from 'react'
import {Button, Grid, Checkbox, Box} from '@material-ui/core'
import ProfileAddressForm from './ProfileAddressForm'
import {Decoded} from './App'
import {User} from './dec' 
import {Redirect} from 'react-router-dom' 
export interface ProfileUserInfoProps {
    user: Decoded,
    updateUser: (newToken: string | null) => void
}

const ProfileUserInfo: React.FC<ProfileUserInfoProps> = (props) => {
	const [billingAddressForm, setBillingAddressForm] = useState<boolean>(false)
	const [shippingAddressForm, setShippingAddressForm] = useState<boolean>(false)
	const [billingOrShipping, setBillingOrShipping] = useState<boolean>(false) //false indicated billing and true is shipping
	const [sameAddress, setSameAddress] = useState<boolean>(false)

	const handleBillingButtonClick = () : void => {
		if (!billingAddressForm) {
			setBillingAddressForm(true)
		} else {
			setBillingAddressForm(false)
		}
		setBillingOrShipping(false)
	}
	const handleShippingButtonClick = () : void => {
		if(!shippingAddressForm) {
			setShippingAddressForm(true)

		} else {
			setShippingAddressForm(false)
		}
		setBillingOrShipping(true)
	}
	const handleCheckboxClick = (): void => {
		if(!sameAddress && props.user.billingAddress) {
			setSameAddress(true)
			console.log(props.user.billingAddress._id)
			let data: object = {
				addressType: 'shipping',
				email: props.user.email,
				userId: props.user._id,
				_id: props.user.billingAddress._id,
				streetOne: props.user.billingAddress.streetOne,
				streetTwo: props.user.billingAddress.streetTwo,
				city: props.user.billingAddress.city,
				state: props.user.billingAddress.state,
				zipcode: props.user.billingAddress.zipcode
			}

			fetch(`/auth/profile/sameshipping`, {
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
					} else {
						console.log(`${response.status} ${response.statusText}: ${result.message}`)
					}	
				}).catch((err: Error) => console.log(err))
			}).catch((err: Error) => {
				console.log(`Error: ${err.toString()}`)
			})

		}
	}

	if(!props.user) {
		return <Redirect to="/posters" />
	}

	return (

		<Grid
			container
			// spacing={1}
			direction="column"
			justify="space-evenly"
		>
			<div className="userInfo">
				<Grid item xs={12}>
					<h1>{props.user.firstname}  {props.user.lastname}</h1>
				</Grid>
				<Grid item xs={12}>
					<h3>{props.user.email}</h3>
				</Grid>
				{props.user.billingAddress && <Grid item xs={12}><h3>Billing Address</h3></Grid>}
				{props.user.billingAddress && <Grid item xs={12}><span>{props.user.billingAddress.streetOne}</span></Grid>}
							{(props.user.billingAddress && props.user.billingAddress.streetTwo) && <Grid item xs={12}><span>{props.user.billingAddress.streetTwo}</span></Grid>}
							{props.user.billingAddress && 
								<Grid item xs={12}>
									<span>{props.user.billingAddress.city}  </span>
									<span>{props.user.billingAddress.state}  </span>
									<span>{props.user.billingAddress.zipcode}</span>
								</Grid>
							}
							{props.user.billingAddress &&
								<Grid item xs={12}>
									{props.user.billingAddress && 
										<Box>
										{billingAddressForm ? <ProfileAddressForm display={billingAddressForm} onSubmit={handleBillingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} /> : <Button style={{margin: "15px"}} variant="contained" color="primary" onClick={handleBillingButtonClick}>Edit billing address</Button>}
										</Box>
									}
								</Grid>             
							}
							{!props.user.billingAddress && 
							<Grid item xs={12}>
								{!props.user.billingAddress && 
									<Box>
									{billingAddressForm ? <ProfileAddressForm display={billingAddressForm} onSubmit={handleBillingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} /> : <Button style={{margin: "15px"}} variant="contained" color="primary" onClick={handleBillingButtonClick}>Add billing address</Button>}
									</Box>
								}
							</Grid>
						}
						{(props.user.billingAddress && !props.user.shippingAddress) && 
					<Grid item xs={12}>
						{!sameAddress &&
						<Box>
											Use billing address for shipping?<Checkbox value="sameAsBilling" inputProps={{ 'aria-label': 'Use billing address for shipping?'}} onClick={handleCheckboxClick}/>
									</Box>
									}
								</Grid>
						}
						{props.user.shippingAddress && <Grid item xs={12}><h3>Shipping Address</h3></Grid>}
				{props.user.shippingAddress && <Grid item xs={12}><span>{props.user.shippingAddress.streetOne}</span></Grid>}
							{(props.user.shippingAddress && props.user.shippingAddress.streetTwo) && <Grid item xs={12}><span>{props.user.shippingAddress.streetTwo}</span></Grid>}
							{props.user.shippingAddress && 
								<Grid item xs={12}>
									<span>{props.user.shippingAddress.city}  </span>
									<span>{props.user.shippingAddress.state}  </span>
									<span>{props.user.shippingAddress.zipcode}</span>
								</Grid>
							}
							{props.user.shippingAddress &&
								<Grid item xs={12}>
								<Box>
										{shippingAddressForm ? 
											<ProfileAddressForm display={shippingAddressForm} onSubmit={handleShippingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} /> : 
											<Button variant="contained" color="primary" style={{margin: "15px", marginBottom: "20px"}} onClick={handleShippingButtonClick}>Edit shipping address</Button>
										}
									</Box>
							</Grid>
							}
						{!props.user.shippingAddress && 
							<Grid item xs={12}>
								<Box>
										{shippingAddressForm ? 
											<ProfileAddressForm display={shippingAddressForm} onSubmit={handleShippingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} /> : 
											<Button variant="contained" color="primary" style={{margin: "15px", marginBottom: "20px"}} onClick={handleShippingButtonClick}>Add shipping address</Button>
										}
									</Box>
							</Grid>
						}
					</div>
        </Grid>
		)
	}
export default ProfileUserInfo