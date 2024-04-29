import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NoMatch from '../components/NoMatch';
import Events from './Events';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './Home/Home';
import Layout from '../components/Layout';
import Support from './Support';
import SupportSection from '../components/Support/SupportSection';
import Event from './OneEvent/Event';
import GetTicketsPage from './GetTickets/GetTicketsPage';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderComplete from './OrderComplete';
import Login from './Login';
import Register from './Register';
import EventsByCategory from './EventCategory/EventsByCategory';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoutes';
import Favorites from './Favorites';
import MyTickets from './MyAllTickets/MyTickets';
import PreviousOrders from './PreviousOrders';
import TransactionInfo from './TransactionInfo';
import CreateEvent from './CreateEvent';
import ShowMyEvent from './ShowMyEvent/ShowMyEvent';
import MyEventPage from './MyEventPage/MyEventPage';
import MyOneTicket from './MyOneTicket/MyOneTicket';
import TicketVerification from './TicketVerification/TicketVerification';
import TicketsMarket from './TicketsMarket/TicketsMarket';

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/events" element={<Events />} />
              <Route path="/events/:category" element={<EventsByCategory />} />
              <Route path="/event/:eventId" element={<Event />} />

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/:section" element={<SupportSection />} />
              <Route path="/verification" element={<TicketVerification />} />
              <Route
                path="/ticketsmarket"
                element={
                  <ProtectedRoute>
                    <TicketsMarket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/getTickets/:eventId"
                element={
                  <ProtectedRoute>
                    <GetTicketsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mytickets"
                element={
                  <ProtectedRoute>
                    <MyTickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/previousorders"
                element={
                  <ProtectedRoute>
                    <PreviousOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ordercomplete"
                element={
                  <ProtectedRoute>
                    <OrderComplete />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myticket/:ticketID"
                element={
                  <ProtectedRoute>
                    <MyOneTicket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactionInfo/:transactionID"
                element={
                  <ProtectedRoute>
                    <TransactionInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createevent"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/showmyevents"
                element={
                  <ProtectedRoute>
                    <ShowMyEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myeventpage/:eventID"
                element={
                  <ProtectedRoute>
                    <MyEventPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
