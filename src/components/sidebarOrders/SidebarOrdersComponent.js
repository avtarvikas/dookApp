import React, { PropTypes } from 'react';
import _ from 'lodash';
import OrdersGroup from './OrdersGroup';
import { gettext } from '../../i18n/service.js';
import { sameDay } from '../../utils/date';
import { arrayToDictionary } from '../../utils/array';
const newOrderStatuses = arrayToDictionary(['new']);
const inProgressOrderStatuses = arrayToDictionary(['assigned', 'onWayToDelivery', 'waitingForPickup', 'pickedUp', 'partlyPickedUp', 'waitingForReturn']);
const historyOrderStatuses = arrayToDictionary(['canceled', 'delivered', 'returned']);

function filterByStatus(orders, statuses) {
    return _(orders)
        .filter(order => statuses[order.orderStatus])
        .sortBy('createdAt', 'expectedPickUpTime')
        .reverse()
        .value();
}

export class SidebarOrdersComponent extends React.Component {
    render() {
        const { orders, actions, state } = this.props;
        const newOrders = filterByStatus(orders, newOrderStatuses);
        const inProgress = filterByStatus(orders, inProgressOrderStatuses);
        return (
            <div>
                <OrdersGroup title={gettext('ORDER.NEW-ORDERS')}
                    orderType="new"
                    orders={newOrders}
                    isOpen={state.newOrdersExpand.isOpen} toggle={actions.toggleNewOrders}
                    startDraggingOrder={this.props.startDraggingOrder}
                    draggingOrder={this.props.draggingOrder}>
                </OrdersGroup>
                <OrdersGroup orderType="inProgress" title={gettext('ORDER.IN-PROGRESS')} orders={inProgress}
                    isOpen={state.inProgressOrdersExpand.isOpen} toggle={actions.toggleInProgressOrders}>
                </OrdersGroup>
            </div>
        );
    }
}
SidebarOrdersComponent.propTypes = {
    orders: PropTypes.array
};
