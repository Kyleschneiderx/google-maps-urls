import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse'
import {connect} from 'react-redux'
import { csvUpload, emptyUrl } from '../../../store/actions/search_actions'



class csvLoading extends Component {

    constructor() {
        super();
        this.state = {
          csvfile: undefined
        };
        this.updateData = this.updateData.bind(this);
      }
    
      handleChange = event => {
        this.setState({
          csvfile: event.target.files[0]
        });
      };
    
      importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
          complete: this.updateData,
          header: true
        });
      };
    
      updateData(result) {
        var urls = result.data;
        console.log(urls);
        this.sendData(urls)
        this.props.dispatch(emptyUrl())
      }

      sendData(urls){
        console.log(urls)
        this.props.dispatch(csvUpload(urls))
      }

      loading =()=>{
        console.log('In Loading')
        if(this.props.urls.finished == true){
          return(
            this.props.urls.urls.map((item, index) =>(
              <div key={index}>{item}</div>
            ))
          )
        }
    
        if(this.props.urls.finished === false){
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
    
      render() {
        console.log(this.props.urls.finished)
        console.log(this.state.csvfile);
        return (
          <div className="App">
            <h2>Import CSV File!</h2>
            <input
              className="csv-input"
              type="file"
              ref={input => {
                this.filesInput = input;
              }}
              name="file"
              placeholder={null}
              onChange={this.handleChange}
            />
            <p />
            <button onClick={this.importCSV}> Upload now!</button>
            <hr/>
            {this.loading()}
          </div>
        );
      }
    
}


function mapStateToProps(state){
    return {
        urls: state.search
    }
  }
  
export default connect(mapStateToProps)(csvLoading);

