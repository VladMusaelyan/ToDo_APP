import React, { Component } from 'react';
import Price from './Price';
import Name from './Name';
import Description from './Description';

class Product extends Component {
    render() {
        return (
            <div>
                <h1 className='header'>Understanding Class Components</h1>
                <Price price={this.props.price} />
                <Name name={this.props.name} />
                <Description description={this.props.description} />
            </div>
        );
    };
}

export default Product;