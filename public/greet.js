import React,{Component} from 'react';
import './css/main.css';
class Greet extends Component{
    render(){
        return(
            <div className="div">
                <img src={require('./img/333333.jpg')} alt=""/>
                <p>我是p标签</p>
            </div>
        )
    }
}
export default Greet;