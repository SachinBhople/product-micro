// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.scss'
// import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
// import Product from './Prouduct'
// import ProductDetails from './ProductDetails'
// import { Provider } from 'react-redux'
// import reduxStore from './redux/store'

// const App = () => {
//   return <>
//     <Routes>
//       <Route path='/' element={<Outlet />}>
//         {/* <Route index element={<ProductForm />} /> */}
//         <Route index element={<Product />} />
//         {/* <Route path='/product-details/:productDetailId' element={<ProductFromDetails />} /> */}
//         <Route path='/product-details/:productDetailId' element={<ProductDetails />} />
//       </Route>
//     </Routes>
//   </>
// }

// export default App
// const rootElement = document.getElementById('app')
// if (!rootElement) throw new Error('Failed to find the root element')

// const root = ReactDOM.createRoot(rootElement as HTMLElement)

// root.render(<React.StrictMode>
//   <Provider store={reduxStore}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// </React.StrictMode>)



import React, { Suspense, lazy, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

// Lazy load the components
const Product = lazy(() => import('./Prouduct'));
const ProductDetails = lazy(() => import('./ProductDetails'));

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught in Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Product List...</div>}>
                <Product />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/product-details/:productDetailId"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Product Details...</div>}>
                <ProductDetails />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
