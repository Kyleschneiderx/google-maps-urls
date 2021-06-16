import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse'
import {connect} from 'react-redux'
import { csvUpload } from '../../../store/actions/search_actions'



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
      }

      sendData(urls){
        console.log(urls)
        this.props.dispatch(csvUpload(urls))
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

