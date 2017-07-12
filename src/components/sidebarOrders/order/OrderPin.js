import React, { PropTypes } from 'react';

function pinImageName(order) {
    switch (order.orderStatus) {
        case 'assigned':
            return 'pickup';
        case 'pickedUp':
        case 'onWayToDelivery':
        case 'waitingForReturn':
            return 'succeeded';
        case 'new':
            return order.autoAssign ? 'unassigned' : 'failed';
        default:
            return 'delivery';
    }
}

export function OrderPin({ order }) {
    const name = pinImageName(order);
    return <img className='pin-icon' src={`./side_pin_${name}.svg`} />;
}