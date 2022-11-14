import 'styles/Global.scss';
import { router, RouterProvider } from 'routes';

function App() {
  return (
    <div className="App" data-testid="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
