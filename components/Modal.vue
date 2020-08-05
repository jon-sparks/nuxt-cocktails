<template>
  <div>
      <h3>modal</h3>
      
            <!-- <form>
                <input type="text" placeholder="email" v-model="username"/>
                <input type="text" placeholder="email" v-model="password" />
                <button @click="signUp">Sign up</button>
            </form>

            <form>
                <input type="text" placeholder="email" v-model="username"/>
                <input type="text" placeholder="email" v-model="password" />
                <button @click="signIn">Sign in</button>
            </form> -->
      
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {
    data () {
        return {
            username: '',
            password: '',
            isSignedIn: false
        }
    },
    methods: {
        // signUp: function(e) {
        //     e.preventDefault()
        //     db.auth().createUserWithEmailAndPassword(this.username, this.password).catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ...
        //     })
        // },
        // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
//   var errorCode = error.code;
// var errorMessage = error.message;   
//   // ...
// });
    }
}
</script>

<style>

</style>