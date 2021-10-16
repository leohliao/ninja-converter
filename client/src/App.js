import { Container  } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import FileItemList from './components/FileItemList'
import FileItem from './components/FileItem'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={FileItemList} exact />
          <Route path="/file/:id" component={FileItem} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
