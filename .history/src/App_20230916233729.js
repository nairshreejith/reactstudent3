import React, { useState, useEffect } from 'react';
import './App.css';
import './custom.css';
import axios from 'axios';

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
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Track whether to display the create user form

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get(`/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    api.get(`/api/users/search/${searchTerm}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleCreateUser = () => {
    api.post('/api/users', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({
          firstname: '',
          lastname: '',
          email: '',
          status: '',
          phonenumber: '',
          dob: '',
          address: '',
        });
        setShowCreateForm(false);
      })
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

  const handleDeleteUser = (id) => {
    api.delete(`/api/users/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">User Management Portal</h1>
      <div className="border bg-secondary text-white p-3 mb-4">
        <h2>User List</h2>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <input type="text" className="form-control" placeholder="Search by Name or Email of User" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="col-md-3">
              <button className="btn btn-info text-white" onClick={handleSearch}>Search User</button>
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
                    <button className="btn btn-success" onClick={() => handleModifyUser(user.id)}>Save User</button>
                  ) : (
                    <>
                      <button className="btn btn-warning" onClick={() => setEditingUser(user.id)}>Edit User</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn bg-danger text-white" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create User"}
        </button>
        {showCreateForm && (
          <div>
            <h2>Create New User</h2>
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" className="form-control" placeholder="First Name" value={newUser.firstname} onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" className="form-control" placeholder="Last Name" value={newUser.lastname} onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="form-control" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label htmlFor="status">Status</label>
                <input type="text" id="status" className="form-control" placeholder="Status" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <label htmlFor="phonenumber">Phone Number</label>
                <input type="text" id="phonenumber" className="form-control" placeholder="Phone Number" value={newUser.phonenumber} onChange={(e) => setNewUser({ ...newUser, phonenumber: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label htmlFor="dob">Date of Birth</label>
                <input type="text" id="dob" className="form-control" placeholder="Date of Birth" value={newUser.dob} onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className="form-control" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
              </div>
              <div className="mb-4 p-3">
                <button className="btn bg-success text-white" onClick={handleCreateUser}>Create User</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
