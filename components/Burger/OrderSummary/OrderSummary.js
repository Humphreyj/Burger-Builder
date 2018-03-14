import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return  (<li>
      <span style={{textTransfrom:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
      </li>)
    });

    return(
    <Auxi>
      <h3>Order:</h3>
      <p>A delicious burger with:</p>
      <ul>

        {ingredientSummary}

      </ul>
      <p><strong>Total:{props.price.toFixed(2)}</strong></p>

      <p>Checkout?</p>
      <Button btnType= "Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType= "Success" clicked={props.purchaseConfirmed}>CONFIRM</Button>
    </Auxi>


)
}

export default orderSummary;
