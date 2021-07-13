import React, { Component } from 'react'

export class Breack extends Component {

    constructor(props){
        super(props)
        this.up = this.up.bind(this);
        this.down = this.down.bind(this); 
    }
    
    up(e){
        e.preventDefault();
        this.props.change_time(60,this.props.type)
        
    }

    down(e){
        e.preventDefault();
        this.props.change_time(-60,this.props.type)
        
    }

    render() {
        return (
            <div>
                <button id="break-decrement" onClick = {(e)=> this.down(e)}>down</button>
                <p id="break-length"> {this.props.format_time(this.props.time)} </p>
                <button id="break-increment" onClick= {(e)=>this.up(e)}>up</button>
            </div>
        )
    }
}

export default Breack
