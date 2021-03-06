import React , { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';



const INGREDIENT_PRICES = {
  salad: .75,
  cheese: .50,
  meat: 1.5,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  updatePurchaseState (ingredients) {


    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
        .reduce((sum, el)=>{
          return sum + el;
        },0)

        this.setState({purchaseable : sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice +priceAddition;
    this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler =  ()  => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseConfirmHandler = () => {
    alert('You did it!');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
      return(
        <Auxi>

          <Modal show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            <OrderSummary ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseConfirmed={this.purchaseConfirmHandler}
              price={this.state.totalPrice}
              />
          </Modal>

          <Burger ingredients ={this.state.ingredients}/>

          <BuildControls
          ingredientadded={this.addIngredientHandler}
          ingredientremoved={this.removeIngredientHandler}
          disabled = {disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}/>


        </Auxi>
      );
    }
  }


export default BurgerBuilder;
