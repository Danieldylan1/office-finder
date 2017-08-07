import React, { Component } from 'react';
import SearchBar from './search_bar';
import OfficeList from './office_list';
import OfficeDetail from './office_detail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      offices:[]
    };
  }
  onSearchTermChange(term) {
    console.log('search term change:', term);
    const offices = term.split('').map( (item, index) => {
      return {
        id:'item_' + index + '_' + item,
        name:'office_' + item
      }
    });
    this.setState({ offices });
  }
  render() {
    return (
      <div>
        <div className="row search-header">
          <h4>办公室查询</h4>
          <SearchBar onSearchTermChange={ this.onSearchTermChange.bind(this) } />
        </div>
        <div className="row content-body">
          <div className="col-md-8">
            <OfficeDetail office={ this.state.activeOffice } />
          </div>
          <div className="col-md-4">
            <OfficeList offices={ this.state.offices } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;