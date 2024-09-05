import LandingPage from './LandingPage';
import { AuthContext,  AuthProvider } from './Auth/AuthContext';
import { Route, Routes } from 'react-router-dom';
import LoginBuyer from './Auth/LoginBuyer';
import SignUpBuyer from './Auth/SignUpBuyer';
import LoginSeller from './Auth/LoginSeller';
import SignUpSeller from './Auth/SignUpSeller';
import ProtectedRoute from './ProtectedRoute';
import DashBoard from './SellerComponents/DashBoard';
import EditProduct from './SellerComponents/EditProduct';
import LogoutBuyer from './Auth/LogoutBuyer';
import Store       from  './BuyerComponents/Store';
import CreateProfile from './SellerComponents/CreateProfile';
import ViewProfile from './SellerComponents/ViewProfile';
import Product from './SellerComponents/Product';
import LogoutSeller from './Auth/LogoutSeller';
import ProductDetail from './BuyerComponents/ProductDetail';
import UserProfileAuth from './Auth/UserProfileAuth';
import UpdateUserProfile from './BuyerComponents/UpdateUserProfile';
import SellerProfile from './BuyerComponents/SellerProfile';
import BuyerTransaction from './BuyerComponents/BuyerTransaction';
import BuyerComments from './SellerComponents/BuyerComments';
import IndoxSeller from './BuyerComponents/IndoxSeller';
import Chatlist from './BuyerComponents/ChatList';
import Chat from './BuyerComponents/Chat';
import SellerChat from './SellerComponents/SellerChat';
import SellerChatlist from './SellerComponents/SellerChatList';
import './App.css';



function App() {
 

  return (
    <div className='app'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login_buyer' element={<LoginBuyer/>}/>
          <Route path='/logout_buyer' element={<LogoutBuyer/>}/>
          <Route path='/signup_buyer' element={<SignUpBuyer/>}/>
          <Route path='/logout_seller' element={<LogoutSeller/>}/>

          <Route path='/login_seller' element={<LoginSeller/>}/>
          <Route path='/signup_seller' element={<SignUpSeller/>}/>
          <Route path='/user_profile' element={<UserProfileAuth/>}/>
          <Route path='/view_product' element={<ProductDetail/>}/>
          <Route path='/view_seller_profile' element={<SellerProfile/>}/>

          <Route path='/dashboard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
          <Route path='/inbox' element={<ProtectedRoute><IndoxSeller/></ProtectedRoute>}/>
          <Route path='/store' element={<ProtectedRoute><Store/></ProtectedRoute>}/>
          <Route path='/update_user_profile' element={<ProtectedRoute><UpdateUserProfile/></ProtectedRoute>}/>
          <Route path='/update_product' element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>

          <Route path='/buyer_transaction' element={<ProtectedRoute><BuyerTransaction/></ProtectedRoute>}/>
          <Route path='/comments' element={<ProtectedRoute><BuyerComments/></ProtectedRoute>}/>
          <Route path='/chat_list' element={<ProtectedRoute><Chatlist/></ProtectedRoute>}/>
          <Route path='/chats' element={<ProtectedRoute><Chat/></ProtectedRoute>}/>

          <Route path='/sellerchat_list' element={<ProtectedRoute><SellerChatlist/></ProtectedRoute>}/>
          <Route path='/sellerchats' element={<ProtectedRoute><SellerChat/></ProtectedRoute>}/>
         
          
          
          <Route path='/create_profile' element={<ProtectedRoute><CreateProfile/></ProtectedRoute>}/>
          <Route path='/view_profile' element={<ProtectedRoute><ViewProfile/></ProtectedRoute>}/>
          <Route path='/create_product' element={<ProtectedRoute><Product/></ProtectedRoute>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
