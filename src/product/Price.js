/* eslint-disable eqeqeq */
import React, { Component } from 'react';

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            rate: 487,
            amd: '֏',
            usd: '$'
        };
    };

    sum = () => {
        const { price, rate, amd, usd } = this.state;
        const sign = price[price.length - 1];
        const value = parseFloat(price);
        sign === usd
            ? this.setState({
                price: value * rate + amd
            })
            : this.setState({
                price: value / rate + usd
            });

    }



    render() {

        return (
            <div>
                <div>Price: {this.state.price}</div>
                <button
                    onClick={this.sum}
                >Change the currency
                </button>
            </div>
        );
    };
}

export default Price;