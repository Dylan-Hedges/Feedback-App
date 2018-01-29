import axios from 'axios';
import { FETCH_USER } from './types';

//Requests user profile id - makes a request to our Express back end to retrive the cached profile.id for the user, if no id = not logged in
const fetchUser = () => {
	axios.get('/api/current_user');
};
