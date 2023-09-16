import React, { useState, useEffect } from 'react';
import './App.css';
import './custom.css';
import axios from 'axios';

// Create an instance of Axios with your server's base URL
const api = axios.create({
  baseURL: 'http://localhost:8091', // Replace with your server's URL
});

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    status: '',
    phonenumber: '',
    dob: '',
    address: '',
  });
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited

  useEffect(() => {
    // Fetch user data from the backend API on component mount
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get(`/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    // Make a GET request to search users by name or email
    api.get(`/api/users/search/${searchTerm}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleModifyUser = (id) => {
    // Implement the logic to modify a user's data
    const modifiedUserData = users.find((user) => user.id === id);

    api.put(`/api/users/${id}`, modifiedUserData)
      .then(() => {
        // Refresh user list after modification
        fetchUsers();
        setEditingUser(null); // Clear the editing state
      })
      .catch((error) => console.error(error));
  };

  const handleCreateUser = () => {
    // Make a POST request to create a new user
    api.post('/api/users', newUser)
      .then(() => {
        // Refresh user list after creation
        fetchUsers();
        setNewUser({
          firstname: '',
          lastname: '',
          email: '',
          status: '',
          phonenumber: '',
          dob: '',
          address: '',
        }); // Clear the input fields
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteUser = (id) => {
    // Make a DELETE request to delete a user by ID
    api.delete(`/api/users/${id}`)
      .then(() => {
        // Refresh user list after deletion
        fetchUsers();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">User Management</h1>
      <div className="border bg-dark text-white p-3 mb-4">
        <h2>Create New User</h2>
        <div className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="First Name" value={newUser.firstname} onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Last Name" value={newUser.lastname} onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Status" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Phone Number" value={newUser.phonenumber} onChange={(e) => setNewUser({ ...newUser, phonenumber: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Date of Birth" value={newUser.dob} onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
          </div>
          <div className="mb-4 p-3">
            <button className="btn btn-primary" onClick={handleCreateUser}>Create User</button>
          </div>
        </div>
      </div>
      <div className="border bg-dark text-white p-3 mb-4">
        <h2>User List</h2>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <input type="text" className="form-control" placeholder="Search by Name or Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="col-md-3">
              <button className="btn btn-info" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.firstname}
                      onChange={(e) => {
                        const updatedUser = { ...user, firstname: e.target.value };
                        const updatedUsers = [...users];
                        updatedUsers[updatedUsers.findIndex((u) => u.id === user.id)] = updatedUser;
                        setUsers(updatedUsers);
                      }}
                    />
                  ) : (
                    user.firstname
                  )}
                </td>
                {/* Render other user attributes */}
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.phonenumber}</td>
                <td>{user.dob}</td>
                <td>{user.address}</td>
                <td>
                  {editingUser === user.id ? (
                    <button className="btn btn-success" onClick={() => handleModifyUser(user.id)}>Save</button>
                  ) : (
                    <>
                      <button className="btn btn-warning" onClick={() => setEditingUser(user.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
