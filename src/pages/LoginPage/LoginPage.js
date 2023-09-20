import { useState } from 'react';
import './LoginPage.css';
import Banner from '../../components/Banner';
import LoginForm from '../../components/LoginForm';

function LoginPage() {

  return (
    <div className='LoginPage'>
      <Banner />
      <LoginForm />
    </div>
  );
}

export default LoginPage;