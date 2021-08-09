import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from "./styles";
import { Link } from "react-router-dom";
import CartItem from './CartItem/CartItem';


const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no item in your shopping cart,
            <Link to='/' className={classes.link}>Start shopping</Link>!
        </Typography>
    )
    
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={ item } onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: { cart.subtotal.formatted_with_symbol }
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' variant='contained' type='button' color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={ Link } to='/checkout' className={classes.checkoutButton} size='large' variant='contained' type='button' color='primary'>Checkout</Button>
                </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading....';

    return (
        <Container>
           <div className={classes.toolbar} />
           <Typography className={classes.title} gutterBottom variant='h3'>Your Shopping Cart</Typography>
           { cart.line_items.length === 0 ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart