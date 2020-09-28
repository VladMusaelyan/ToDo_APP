/* eslint-disable no-undef */
import { render } from '@testing-library/react';
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';


// class Product extends Component {
//     render() {
//         return (
//             <>
//                 <div>Price: {this.props.price}</div>
//                 <div>Name: {this.props.name}</div>
//                 <div>Description: {this.props.descraption}</div>
//             </>
//         );
//     };
// }

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            name: props.name,
            description: props.description
        };
    }
    render() {
        class Price extends Component {
            render() {
                return (
                    <div>Price: {this.props.price}</div>
                );
            }
        };
        class Name extends Product {
            render() {
                return (
                    <div>Name: {this.props.name}</div>
                );
            }
        };
        class Description extends Product {
            render() {
                return (
                    <div>Description: {this.props.description}</div>
                );
            }
        };
        return (
            <div>
                <Price price={this.state.price} />
                <Name name={this.state.name} />
                <Description description={this.state.description} />
            </div>
        );
    }
}


export default Product;

