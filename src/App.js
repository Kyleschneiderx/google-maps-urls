import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import {FormElement, SearchSchema } from './utils/searchHelper'
import {connect} from 'react-redux';
import { search, clearSearch } from './store/actions/search_actions'


class App extends Component {
  state = {
    editorContentHtml:'',
    loading: false,
    results: this.props.search
  }

  onPostBook = (values) =>{
    this.props.dispatch(search(values))
    console.log(this.props)
    this.props.dispatch(clearSearch());
  }

  componentWillUnmount(){

  }

  makeStatesSelector=()=>{
    const US = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    const render_list= []
    for(let i=0; i<US.length; i++){
      render_list.push(<option value={US[i].toLowerCase()}>{US[i]}</option>)
    }
    return(
      render_list
    )
  }

  loading =()=>{
    console.log('In Loading')
    if(this.props.search.loaded == true){
      return(
        this.props.search.search.map((item, index) =>(
          <div key={index}>{item}</div>
        ))
      )
    }

    if(this.props.search.loaded === false){
      return(
        <div>
          This might take a few minutes
        </div>
      )
    }

    // if(!this.props.search.loading || this.props.search.loading === undefined){
    //   return(null)
    // }else if(this.props.search.loaded){
      
    //   return(
    //     console.log('in else if')

    //   )
    // }else{
    //   <div>
    //     this might take a minute
    //   </div>
    // }

  }

  render(){  
    console.log(this.props.search.loaded)
    return (
      <div className="App">
        <div>
          <Formik
            initialValues={{
            search:'',
            state:''

            }}
            validationSchema={SearchSchema}
            onSubmit={(values, {resetForm})=>{
              this.onPostBook({
                ...values
              });
              console.log(values)
              resetForm({});
            }}    
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit

                    })=>(
                        <form onSubmit={handleSubmit}>
                            <FormElement
                                elData={{element:'input', type:'text', value:values.search}}
                                placeholder="Keyword Search"
                                name='search'
                                onHandleChange={(e)=>handleChange(e)}
                                onHandleBlur={(e)=>handleBlur(e)}
                                errors={errors.search}
                                touched={touched.search}
                            
                            />
                            <FormElement
                                elData={{element:'select', value:values.state}}
                                placeholder="Choose state to Search"
                                name='state'
                                onHandleChange={(e)=>handleChange(e)}
                                onHandleBlur={(e)=>handleBlur(e)}
                                errors={errors.state}
                                touched={touched.state}
                            
                            >
                                    <option default>Select a rating</option>
                                    {this.makeStatesSelector()}
                            </FormElement>
                            
                            
                            <button type="submit">
                                Search
                            </button>
                            <br/>
                        </form>

                    )}

          </Formik>
        </div>
        
        <hr/>
        
        {this.loading()
        // this.props.search.search ?
        //   this.props.search.search.map((item, index) =>(
        //   <div key={index}>{item}</div>
        // ))
        //   :null
          }
      </div>
    );

  }

}

function mapStateToProps(state){
  return {
      search: state.search
  }
}

export default connect(mapStateToProps)(App);

