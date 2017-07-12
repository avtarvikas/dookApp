import React, { PropTypes } from 'react';
import './OrdersExpander.scss';
import { Collapse } from 'react-collapse';
import { Order } from './order/Order';

import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants/actionTypes';
import { createDragPreview } from 'react-dnd-text-dragpreview';
import { Scrollbars } from 'react-custom-scrollbars';

var dragPreviewStyle = {
    backgroundColor: 'rgb(68, 67, 67)',
    color: 'white',
    fontSize: 15,
    paddingTop: 4,
    paddingRight: 7,
    paddingBottom: 6,
    paddingLeft: 7
}

const orderSource = {
    beginDrag(props) {
        return {
            f: '',
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

function formatDragMessage(numOrders) {
    const noun = numOrders === 1 ? 'order' : 'orders'
    return `Moving ${numOrders} ${noun}`
}

export class OrdersGroup extends React.Component {
    componentDidMount() {
        this.dragPreview = createDragPreview('Dragging', dragPreviewStyle)
        this.props.connectDragPreview(this.dragPreview);
    }

    componentDidUpdate(prevProps) {
        this.dragPreview = createDragPreview('Dragging', dragPreviewStyle, this.dragPreview)
    }

    render() {
        const groupHeight = 375;
        const { isOpen, orders, toggle, title, orderComponent } = this.props;
        const ordersCount = +orders.length;
        const text = ordersCount + ' ' + title;
        const icon = isOpen ? 'chevron-down' : 'menu-right';
        if(this.props.orderType==='new')
          return this.props.connectDragSource(
              <div className="sidebar-orders-expander">
                  <div className="expand-button" onClick={toggle}>
                      {text}
                      <span className={"glyphicon glyphicon-" + icon}></span>
                  </div>
                  {orders.length > 5 ? this.renderScrolled(orders, isOpen) : this.renderPlain(orders, isOpen)}
              </div>
          );
        else return (
            <div className="sidebar-orders-expander">
                <div className="expand-button" onClick={toggle}>
                    {text}
                    <span className={"glyphicon glyphicon-" + icon}></span>
                </div>
                {orders.length > 5 ? this.renderScrolled(orders, isOpen) : this.renderPlain(orders, isOpen)}
            </div>
        );
    }

    renderOrder(order) {
        return <Order order={order} key={order.id} startDraggingOrder={this.props.startDraggingOrder}></Order>;
    }

    renderPlain(orders, isOpen) {
        return (
            <Collapse isOpened={isOpen}>
                {orders.map(order => this.renderOrder(order))}
            </Collapse>
        );
    }

    renderScrolled(orders, isOpen) {
        return (
            <Collapse isOpened={isOpen} fixedHeight={375}>
                <Scrollbars style={{ height: (377) + 'px' }} trackHorizontal={false}>
                    {orders.map(order => this.renderOrder(order))}
                </Scrollbars>
            </Collapse>
        );
    }
}

OrdersGroup.propTypes = {
    title: PropTypes.string,
    orders: PropTypes.array
};

export default DragSource(ItemTypes.ORDER, orderSource, collect)(OrdersGroup);
