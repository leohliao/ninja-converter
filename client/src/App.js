import { Container  } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FileItemList from './components/FileItems/FileItemList'
import FileItem from './components/FileItems/FileItem'
import ConverterIndex from './components/Converters/ConverterIndex'
import LogIn from './components/Logins/LogIn'
import React from 'react'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={FileItemList} exact />
          <Route path="/file/:id" component={FileItem} />
          <Route path="/converter" component={ConverterIndex} />
          <Route path="/login" component={LogIn} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
