import {
    OrdreModel
} from "../models/orderModel.js";
import {
    OrderListView
} from "../views/orderListView.js";
import {
    OrderPageView
} from "../views/orderPageView.js"

export const OrderController = {

    async showOrders() {
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = "";

        const pageView = OrderPageView.render();
        appDiv.appendChild(pageView);

        const listView = OrderListView.render();
        appDiv.appendChild(listView);

    }

}