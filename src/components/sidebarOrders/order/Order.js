import React, { PropTypes } from 'react';
import './orderIcons';
import './Order.scss';
import { Link } from 'react-router';
import * as orderFunctions from './orderFunctions';
import { OrderTimer } from './OrderTimer';
import { OrderPin } from './OrderPin';
import { OrderIdIcon } from './OrderIdIcon';

export class Order extends React.Component {
  render() {
    const order = this.props.order;
    return (
      <div className="sidebar-order" onDragLeave={() => {this.props.startDraggingOrder(order)}}>
        <div>
          <Link to={`/orderDetails/${order.id}`}><img src="./side_menu.svg" /></Link>
          &nbsp;
          <OrderIdIcon order={order} />
          &nbsp;
          <span>{orderFunctions.idDisplay(order)}</span>
          &nbsp;
          <img src='./side_watch.svg' />
          <OrderTimer order={order} />
          &nbsp;
          <img className='vehicle-icon' src={`./${orderFunctions.vehicleIcon(order)}.png`} />
          &nbsp;
          <img src='./side_list.svg' />
        </div>
        <div>
          <OrderPin order={order} />
          &nbsp;
          <span className="delivery-point">{order.deliveryPoint || '---'}</span>
        </div>
        <div>
          <img src={`side_${orderFunctions.deliveryIcon(order)}.svg`} />
          &nbsp;
          <span>{orderFunctions.deliveryTime(order)}</span>
          &nbsp;
          <span><img src={`./side_${orderFunctions.bagIcon(order)}.svg`} />{order.items.length}</span>
          {order.cacheOnDelivery && '&nbsp;'}
          {order.cacheOnDelivery && <img src="./side_cacheOnDelivery.svg" />}
          &nbsp;
          <img src="./side_info.svg" />
        </div>
      </div >
    );
  }
}
