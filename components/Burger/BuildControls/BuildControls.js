import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from'./BuildControls.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const buildControls = (props)=> (


      <div className={classes.BuildControls}>
      <p>Current Price: {props.price}</p>
        {controls.map(ctrl =>(
          <BuildControl
            key={ctrl.label}
            label ={ctrl.label}
            added={() => props.ingredientadded(ctrl.type)}
            removed={() => props.ingredientremoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        )
      )}

        <button className={classes.OrderButton}
          disabled={!props.purchaseable}
          onClick={props.ordered}>Order That Burger!
          </button>
      </div>


);


export default buildControls;
