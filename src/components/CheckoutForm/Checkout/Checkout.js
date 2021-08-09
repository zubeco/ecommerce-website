import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from "../../../lib/commerce";
import { Link, useHistory } from "react-router-dom";


const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckOut, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    const [isFinished, setIsFinished] = useState(false)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})


    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                setCheckoutToken(token)
            } catch (error) {
                history.push('/');
            }
        }

        generateToken();
    }, [cart, history])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );


    const test = (data) => {
        setShippingData(data);

        nextStep();
    }

    const Form = () => activeStep === 0 
        ?<AddressForm 
            checkoutToken={checkoutToken} 
            test={test} 
        /> : 
        <PaymentForm 
            checkoutToken={checkoutToken} 
            nextStep={nextStep} 
            backStep={backStep} 
            shippingData={shippingData}
            onCaptureCheckOut={onCaptureCheckOut} 
            timeout={timeout}
        /> 


    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 5000);
    }    

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider classes={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={ Link } variant='outlined' type='button'>Back to Home</Button>
        </>
    ): isFinished ? (
        <>
        <div>
            <Typography variant='h5'>Thank you for your purchase</Typography>
            <Divider classes={classes.divider}/>
        </div>
        <br/>
        <Button component={ Link } variant='outlined' type='button'>Back to Home</Button>
    </>
    ): (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ); 

    if (error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={ Link } variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                   { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
