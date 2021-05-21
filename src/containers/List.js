import React from 'react';
import Card from '../components/Card/Card'

const API = process.env.API;

class List extends React.Component{

    constructor(){
        super();
        this.state={
            data: [],
            searchTerm: '',
            error: '', 
            loading: true
        }
    }
     async componentDidMount (){
        //const res = await fetch('../../assets/data.json');
        const res = await fetch(`${API}&s=batman`);
        const resJSON= await res.json();
        this.setState({data: resJSON.Search, loading : false})
    }

    async handleSubmit(e){
        e.preventDefault();
        if (!this.state.searchTerm){
            return this.setState({...this.state, error: 'Ingrese texto'})
        }
        const res = await fetch(`${API}&s=${this.state.searchTerm}`);
        const resJSON= await res.json();
        if(!resJSON.Search){
            return this.setState({...this.state, error: 'No hay concidencias', searchTerm: ''})
        }
        this.setState({...this.state, data: resJSON.Search, error: '', searchTerm: ''})
    }

    render(){

        const {loading} = this.state;
        if(loading){
            return (<>
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="text-light">Loading...</h3>
                            </div>
                        </div>
                    </>)
        }

        return (
            <>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={(e)=>this.handleSubmit(e)}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search"
                                value={this.state.searchTerm}
                                onChange={(e) => this.setState({...this.state,searchTerm: e.target.value })}
                                autoFocus
                            />
                        </form>
                     <p className='text-white'>{this.state.error? this.state.error:null}</p>
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.data.map(movie=>{
                        return  <Card movie={movie} key={movie.id}/>
                        })
                    }
                </div>
            </>
        );
    }
}
export default List;