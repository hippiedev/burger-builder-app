import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)  
        }, []);
        if(transformedngredients.length === 0){
            transformedngredients = <p style={{
             color: 'rgb(255, 75, 55)',
             textAlign: 'center'
            }}>Please start adding ingredients</p>
        }
        console.log(transformedngredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger
