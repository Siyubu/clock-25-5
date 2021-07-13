import React, { Component } from 'react'

export class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 25
        }
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
    }
    
    up(){
        this.props.change_time(60,this.props.type)
    }

    down(){
        this.props.change_time(-60,this.props.type)
        
    }

    render() {
        return (
            <div>
                <button id="session-decrement" onClick={this.down}>down</button>
                <p id="session-length"> {this.props.format_time(this.props.time)}</p>
                <button id="session-increment" onClick = {this.up}>up</button>
            </div>
        )
    }
}

export default Session
