import React, { Component } from 'react';
import axios from "axios";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.get('http://localhost:3001/events')
        .then(function (res) {
            let items: [] = res.data;
            items.map(item => (
                console.log(item.name)
            ));
            //console.log(items[0]);
        })
        .catch(function (err) {
            console.log(err);
        });

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

    }

    render() {
        return (
            <div className="Main">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Eventos:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label>
                    <p><input type="submit" value="Submit" /></p>
                </form>
            </div>
        );
    }

}
export default Main;