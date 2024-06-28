import { Provider } from 'react-redux';
import store from './store/store';
import DynamicTable from './components/DynamicTable';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: 30 }}>
        <h1>Dynamic Table</h1>
        <DynamicTable />
      </div>
    </Provider>
  );
};

export default App;
