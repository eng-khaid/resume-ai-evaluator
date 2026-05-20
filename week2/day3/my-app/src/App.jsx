import Header from './components/Header';
import ApiCall from './components/ApiCall';
import PostList from './components/PostList';
import AxiosFilter from './components/AxiosFilter';
import EvaluatorPage from './pages/EvaluatorPage';
import TaskManager from './components/TaskManager'

function App() {
  return (
    <>
      <Header />
      <ApiCall />
      <EvaluatorPage />
      <PostList />
      <AxiosFilter />
        <TaskManager />
    </>
  );
}

export default App;