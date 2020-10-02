/* eslint-disable no-unused-expressions */
import React from 'react';

class Link extends React.Component {

    changeLocation = () => {
        window.location.href = 'https://www.youtube.com/watch?v=UGapN-hrekw&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=2&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD'
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.changeLocation}
                >
                    Link
                </button>
            </div>
        );
    };
};
export default Link;
