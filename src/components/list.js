import { Component } from "react";
import {Card} from 'react-bootstrap';
export class List extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }
    }
    
    render(){
        var missions=[];
        if(this.props.location.state!==null)this.state.data=this.props.location.state;
        if(this.state.data!=null)this.state.data.forEach((mission)=>{
            missions.push(
                <div className="col-md-3 col-sm-6 col-12">
                <Card style={{padding:"10px"}}>
                    <Card.Img src={mission.links.mission_patch} style={{backgroundColor:"grey"}}/>
                    <Card.Body>
                        <Card.Title><i className="title">{mission.mission_name}#{mission.flight_number}</i></Card.Title>
                        <Card.Text>
                            <b>Mission ID</b>:{mission.mission_id}<br></br>
                            <b>Launch Year</b>:{mission.launch_year}<br></br>
                            {mission.launch_success!==null?<><b>Succesful Launch</b>:{mission.launch_success.toString()}<br></br></>:<p></p>}
                            {mission.rocket.first_stage.cores[0].land_success!==null?<><b>Successful Landing </b>:{mission.rocket.first_stage.cores[0].land_success.toString()}</>:<p></p>}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                )
        });
        return(
            this.state.data.length!==0?<>
            <div className="row missions">
                {missions}
            </div>
            </>:<div className="empty text-center">No  Matches</div>
        )
    }
}