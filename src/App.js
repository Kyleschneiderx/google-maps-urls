import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import {FormElement, SearchSchema } from './utils/searchHelper'
import {connect} from 'react-redux';
import { search } from './store/actions/search_actions'


class App extends Component {
  state = {
    editorContentHtml:'',
    loading: false,
    results: []
  }


  render(){
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
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
                                    <option value="id">ID</option>
                                    <option value="pa">PA</option>
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
