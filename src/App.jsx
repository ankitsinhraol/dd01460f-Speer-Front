import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import { BrowserRouter ,Link,Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';
import ArchivedCallList from './ArchivedCallList.jsx';
import CallDetail from './CallDetail.jsx';

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className='container'>
          <Header />
          
          <Switch>
            <Route path="/" exact component={CallList} />
            <Route path="/ArchiveCall" component={ArchivedCallList} />
            <Route path="/Call/:id" component={CallDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
