import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from "./styles";


const Product = ({ product, onAddToCart }) => {

    const classes = useStyles();
    let description = product.description.length > 15 ? product.description.slice(0, 55) + '...' : product.description;
    let productName = product.name.length > 30 ? product.name.slice(0, 20) + '...' : product.name;

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant='h6' gutterBottom>
                        {productName}
                    </Typography>
                    <Typography variant='h6'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: description }} variant='body2' color='textSecondary' />
                    <CardActions disableSpacing className={classes.CardActions}>
                        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                            <AddShoppingCart />
                        </IconButton>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    )
}

export default Product
