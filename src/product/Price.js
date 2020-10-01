/* eslint-disable eqeqeq */
import React, { Component } from 'react';

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            rate: 487
        };
    };

    sum = () => {
        const { price, rate } = this.state;
        const sign = price[price.length - 1];
        if (sign === '$') {
            const amd = parseFloat(price)
            this.setState({
                price: amd * rate + '֏'
            });

        } else if (sign === '֏') {
            const usd = parseFloat(price)
            this.setState({
                price: usd / rate + '$'
            });
        }

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