import { client } from '../client/client';

const url = '/users';

const user = {
  state: {
    users: [],
    user: {},
    loading: false,
    errors: {},
    redirect: false
  },
  
  reducers: {
    cancelForm: (state) =>{
      return{
        ...state,
        redirect: true
      }
    },

    fetchUsersFulfiled: (state, payload) => {
      return { 
        ...state,
        users: payload.data || payload,
        redirect: false
      };
    },

    newUser: (state) =>{
      return {
        ...state,
        user: {}
      };
    },

    saveUserFulfilled: (state, payload) =>{
      return {
        ...state,
        users: [...state.users, payload],
        errors:{},
        loading: false,
        redirect: true
      };
    },

    saveUserPending: (state) => {
      return {
        ...state,
        loading: true
      };
    },

    saveUserRejected: (state, payload) => {
      // convert feathers error formatting to match client-side error formatting
      const { email } = payload.errors;
      const errors = { global: payload.message, email };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    },

    fetchUserFulfiled: (state, payload) => {
      return {
        ...state,
        user: payload,
        errors: {},
        loading: false,
        redirect: false
      };
    },

    updateUserFulfiled: (state, payload) => {
      const user = payload;
      return {
        ...state,
        users: state.users.map(item => item._id === user._id ? user : item),
        errors: {},
        loading: false,
        redirect: true
      };
    },

    updateUserRejected: (state, payload) => {
      const { email } = payload.errors;
      const errors = { global: payload.message, email };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    },

    updateUserPending: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    
    fetchUserPending: (state) => {
      return {
        ...state,
        loading: true,
        user: {}
      };
    },

    deleteUserFulfiled: (state, payload) => {
      const _id = payload._id;
      return {
        ...state,
        users: state.users.filter(item => item._id !== _id)
      };
    }

  },



  effects: (dispatch) => ({
    fetchUsers() {
      return client.get(url)
        .then(res => {
          dispatch.user.fetchUsersFulfiled(res.data);
        })

    },

    fetchUser(_id){
      dispatch.user.fetchUserPending();
      return client.get(`${url}/${_id}`)
        .then(res => {
          dispatch.user.fetchUserFulfiled(res.data);
        });
    },

    updateUser(user){
      dispatch.user.updateUserPending();
      return client.put(`${url}/${user._id}`, user)
        .then(res =>{
          dispatch.user.updateUserFulfiled(res.data);
        })
        .catch(err =>{
          dispatch.user.updateUserRejected(err.response.data);
        });
    },

    saveUser(user){
      dispatch.user.saveUserPending();
      return client.post(url, user)
        .then(res =>{
          dispatch.user.saveUserFulfilled(res.data);
        })
        .catch(err => {
          dispatch.user.saveUserRejected(err.response.data);
        });
    },

    deleteUser(_id){
      return client.delete(`${url}/${_id}`)
        .then(res => {
          dispatch.user.deleteUserFulfiled(res.data);
        })
    }
  })
};

export default user;