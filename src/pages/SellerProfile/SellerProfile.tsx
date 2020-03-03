import './SellerProfile.scss'
import React, {Component} from 'react';
import {SellerStore} from "../../stores/SellerStore";

class SellerProfile extends Component {
    store = new SellerStore();

    render() {
        return(
            <div>
                <form onSubmit={this.store.createGood} >
                    <input
                        className = ''
                        type='text'
                        name="name"
                        onChange={this.store.handleInputChange}
                        placeholder='name'
                    />
                    <textarea
                        className = ''
                        name="description"
                        onChange={this.store.handleInputChange}
                        placeholder='description'
                    />
                    <input
                        className = ''
                        type='text'
                        name="price"
                        onChange={this.store.handleInputChange}
                        placeholder='price'
                    />
                    <input type="submit" value="create good"/>

                </form>
            </div>
        )
    }
}

export default SellerProfile;