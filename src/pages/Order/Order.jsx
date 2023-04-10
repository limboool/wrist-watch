import React from "react";
import "./index.scss"
import { Link } from "react-router-dom";
import Maps from "../../components/Map/map";

function Order() {
    return (
        <div className="order">
            <div className="block-contacts">
                <h1>1. Контактные данные</h1>
                <div className="contacts">
                    <div className="user-info">
                        <label>*Имя</label>
                        <input type="text"></input>
                    </div>

                    <div className="user-info">
                        <label>*Телефон</label>
                        <input type="text"></input>
                    </div>

                    <div className="user-info">
                        <label>Почта</label>
                        <input type="text"></input>
                    </div>
                </div>
            </div>

            <div className="map">
                <h1>2. Доставка</h1>
                <Maps></Maps>
            </div>

            <div>
                <Link to="/creditcard">
                    <button className="pay">Оплатить</button>
                </Link>
            </div>
        </div>



    )
}



export default Order;