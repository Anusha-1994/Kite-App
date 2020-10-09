/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { observable, decorate } from 'mobx';
import Constant from '../Global/Constant';
import authService from '../Services/authService'



class AuthStore {
    
    error : string = '';
    currentUser : any | null = null;
    initialize(callback: any) {
      
    }
  
    async signIn(details : any, callback: any) {
      try {
        const response = await authService.SignIn(details);
        this.currentUser = response.data.result;
        sessionStorage.setItem('token', response.data.result);
        callback(null);
      } catch (err) {
        let errorMsg = Constant.defaultErrorMessage;
        if (err && err.response && err.response.data && err.response.data.message) {
          errorMsg = err.response.data.message;
        }
        callback(new Error(errorMsg));
      }
    }
    signOut() {
      this.currentUser = null;
      localStorage.removeItem("token");
    }
    async resetPassword(details : any, callback: any) {
      try {
        const response = await authService.resetPassword(details);
        const { result } = response.data;
        console.log(response.data)
        callback(null);
      } catch (err) {
        let errorMsg = Constant.defaultErrorMessage;
        if (err && err.response && err.response.data && err.response.data.message) {
          errorMsg = err.response.data.message;
        }
        callback(new Error(errorMsg));

      }
    }
    async createUser(details: any, callback: any) {
    try {
      const response = await authService.createUser(details);
      const { result } = response.data;
      callback(null);
    } catch (err) {
      let errorMsg = Constant.defaultErrorMessage;
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }
      callback(new Error(errorMsg));

    }
  }

}
decorate(AuthStore, {
  error: observable,
});
export default new AuthStore();