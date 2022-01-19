import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [], 
      possibleIngredients: ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
    };
  }

  handleIngredientChange = (event) => {
    event.preventDefault();
    const updatedIngredients = [...this.state.ingredients, event.target.name];
    this.setState({ ingredients: updatedIngredients });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.ingredients.length && this.state.name !== '') {
      const newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients
      };
      this.props.addOrder(newOrder);
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  createIngredientButtons = () => {
    const ingredientButtons = this.state.possibleIngredients.map(ingredient => {
      return (
        <button 
          className='ingredient-button'
          key={ingredient} 
          id={ingredient} 
          name={ingredient} 
          onClick={(event) => this.handleIngredientChange(event)}>
          {ingredient}
        </button>
      )
    });
    return ingredientButtons;
  }
    
  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Order Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />
        { this.createIngredientButtons() }
        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        <button 
          className='submit-order'
          onClick={(event) => this.handleSubmit(event)}>
          Submit Order
        </button>
      </form>
    );
  };
}

export default OrderForm;