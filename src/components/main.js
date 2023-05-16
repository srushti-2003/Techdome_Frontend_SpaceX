import { Component } from "react";
import { List } from "./list";
import {Routes,Route} from 'react-router-dom';
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
export class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            year:null,
            launch:null,
            landed:null,
        }
        this.updateYear=this.updateYear.bind(this);
        this.updateLanding=this.updateLanding.bind(this);
        this.updateLaunch=this.updateLaunch.bind(this);
    }
    async updateLanding(e){
        this.state.landed=e.target.id;
        await this.execute();
    }
    async updateLaunch(e){
        var bool=e.target.id;
        this.state.launch=bool;
        await this.execute();
    }
    async updateYear(e){
        console.log(e.target.getAttribute("year"));
        this.state.year=e.target.getAttribute("year");
        await this.execute();
    }
    async execute(){
        var data=this.state.data;
        var val=this.state.launch;
        var value=this.state.landed;
        var year=this.state.year;
        if(this.state.launch===null){
            this.props.navigate("/",{
                state:data
            });
        }
        else if(this.state.landed===null){
            data=await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_success='+this.state.launch)
            .then((data)=>data.json());
            console.log(this.state.launch);
            this.props.navigate('/launch-success='+{val}.val,{
                state:data
            });
        }
        else if(this.state.year===null){
            data=await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_success='+this.state.launch+'&land_success='+this.state.landed)
            .then((data)=>data.json());
            this.props.navigate('/launch-success='+{val}.val+'&land-success='+{value}.value,{
                state:data
            });
        }
        else{
            data=await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_success='+this.state.launch+'&land_success='+this.state.landed+'&launch_year='+this.state.year)
            .then((data)=>data.json());
            this.props.navigate('/launch-success='+{val}.val+'&land-success='+{value}.value+'&land_year='+{year}.year,{
                state:data
            });
        }
        if(this.state.launch===null && this.state.year!=null){
            data=await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_year='+this.state.year)
            .then((data)=>data.json());
            this.props.navigate('/launch-year='+{year}.year,{
                state:data
            });
        }
        else if(this.state.launch!==null && this.state.year!=null){
            data=await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_year='+this.state.year+'&launch_success='+this.state.launch)
            .then((data)=>data.json());
            this.props.navigate('/launch-year='+{year}.year+'&launch_success='+{val}.val,{
                state:data
            });
        }
        this.state.data=data;
    }
    async componentDidMount(){
        var data=await fetch('https://api.spacexdata.com/v3/launches?limit=100')
        .then((data)=>data.json());
        this.setState({
            data:data
        });
    }
    render(){
        const Filters=[];
        const years=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];
        Filters.push(<hr></hr>);
        years.forEach((year)=>{
            console.log(this.state.year+" "+year+(this.state.year===year).valueOf());
            Filters.push(<div className="col-6"><button className="btn btn-primary year" year={year} id={year} style={{backgroundColor:this.state.year===year.valueOf()?"#006400":"green"}} onClick={this.updateYear}>{year}</button></div>);
        });
        Filters.push(<div><br></br></div>);
        Filters.push(<h5 className="text-center">Successful Launch</h5>);
        Filters.push(<div className="col-6"><button className="btn btn-primary" id='true' style={{backgroundColor:this.state.launch==='true'?"#006400":"green"}} onClick={this.updateLaunch}>True</button></div>);
        Filters.push(<div className="col-6"><button className="btn btn-primary" id='false' style={{backgroundColor:this.state.launch==='false'?"#006400":"green"}} onClick={this.updateLaunch}>False</button></div>);
        Filters.push(<div><br></br></div>);
        Filters.push(<h5 className="text-center">Successful Landing</h5>);
        Filters.push(<hr></hr>)
        Filters.push(<div className="col-6"><button className="btn btn-primary" id='true' style={{backgroundColor:this.state.landed==='true'?"#006400":"green"}} onClick={this.updateLanding}>True</button></div>);
        Filters.push(<div className="col-6"><button className="btn btn-primary" id='false' style={{backgroundColor:this.state.landed==='false'?"#006400":"green"}} onClick={this.updateLanding}>False</button></div>);
        return(
            <div className="main">
                <h1>SpaceX Launch Programs</h1>
                <div className="row filters">
                <h3>Filters</h3>
                <br></br><br></br>
                <h5 className="text-center">Launch Year</h5>
                {Filters}
                </div>
                {this.state.data!=null?
                <>
                <Routes>
                    <Route path="/" element={<List data={this.state.data} location={this.props.location} />}/>
                    <Route path="/launch-success=:val" element={<List location={this.props.location} />}/>
                    <Route path="/launch-year=:year" element={<List location={this.props.location} />}/>
                    <Route path='/launch-success=:val&land-success=:value' element={<List location={this.props.location} />}/>
                    <Route path='/launch-year=:year&launch-success=:val' element={<List location={this.props.location} />}/>
                    <Route path="/launch-success=&land-success=&land_year=:year" element={<List location={this.props.location} />}/>
                </Routes>
                </>:<div></div>
            }
            </div>
        )
    }
}