import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredieents = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
    axios
      .get("https://react-my-burger-70237.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredieents(response.data))
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed())
      });
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}