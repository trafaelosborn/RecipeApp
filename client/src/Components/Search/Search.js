import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchGrid from '../SearchGrid/SearchGrid';
import API from '../../Utils/api';

export default class Search extends Component {
    
     state = {
        search: "",
        content: [],
    }
   
    handleSearch = (event) => {
        event.preventDefault();
        var self = this;
        API.getRecipe(this.state.search).then(function(data){
            self.setState({content: data.data});
            console.log(self.state.content);
        });
      }

      handleInput  = (event) => {
		  const {name, value} = event.target
          this.setState({
              [name]:value
          })
      }

    render() {
        return (
            <div>
                <Navbar search={this.state.search} handleInput={this.handleInput}  handleSearch={this.handleSearch} />
                <SearchGrid content={this.state.content} />
            </div>
        )
    }
}