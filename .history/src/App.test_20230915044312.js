import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios-mock-adapter'; // Import axios-mock-adapterimport App from './App';


describe('App component', () => {
  beforeEach(() => {
    // Clear any mock data between tests
    axios.get.mockClear();
    axios.post.mockClear();
    axios.put.mockClear();
    axios.delete.mockClear();
  });

  it('fetches and displays a list of users', async () => {
    // Mock Axios GET request for fetching user data
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          status: 'Active',
          phonenumber: '1234567890',
          dob: '1990-01-15',
          address: '123 Main St',
        },
      ],
    });

    render(<App />);
    expect(screen.getByText('User Management')).toBeInTheDocument();

    // Wait for user data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    });
  });

  it('creates a new user', async () => {
    // Mock Axios POST request for user creation
    axios.post.mockResolvedValue({
      data: {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'janedoe@example.com',
        status: 'Active',
        phonenumber: '9876543210',
        dob: '1995-02-15',
        address: '456 Elm St',
      },
    });

    render(<App />);
    expect(screen.getByText('User Management')).toBeInTheDocument();

    // Fill out the user creation form
    userEvent.type(screen.getByPlaceholderText('First Name'), 'Jane');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'janedoe@example.com');
    userEvent.type(screen.getByPlaceholderText('Status'), 'Active');
    userEvent.type(screen.getByPlaceholderText('Phone Number'), '9876543210');
    userEvent.type(screen.getByPlaceholderText('Date of Birth'), '1995-02-15');
    userEvent.type(screen.getByPlaceholderText('Address'), '456 Elm St');

    // Click the "Create User" button
    userEvent.click(screen.getByText('Create User'));

    // Wait for the user to be created and displayed in the list
    await waitFor(() => screen.getByText('Jane'));

    // Assert that the new user is displayed
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('janedoe@example.com')).toBeInTheDocument();
    // Add more assertions for other user data fields
  });

  it('modifies an existing user', async () => {
    // Mock Axios PUT request for user modification
    axios.put.mockResolvedValue({});

    render(<App />);
    expect(screen.getByText('User Management')).toBeInTheDocument();

    // Click the "Edit" button for an existing user
    userEvent.click(screen.getByText('Edit'));

    // Modify the user's data
    userEvent.clear(screen.getByDisplayValue('John')); // Clear the first name
    userEvent.type(screen.getByDisplayValue('John'), 'Updated'); // Update the first name

    // Click the "Save" button to save the changes
    userEvent.click(screen.getByText('Save'));

    // Wait for the changes to be saved
    await waitFor(() => screen.getByText('John Updated'));

    // Assert that the modified user data is displayed
    expect(screen.getByText('John Updated')).toBeInTheDocument();
    // Add more assertions for other user data fields
  });

  it('deletes an existing user', async () => {
    // Mock Axios DELETE request for user deletion
    axios.delete.mockResolvedValue({});

    render(<App />);
    expect(screen.getByText('User Management')).toBeInTheDocument();

    // Click the "Delete" button for an existing user
    userEvent.click(screen.getByText('Delete'));

    // Confirm the deletion
    const confirmButton = screen.getByText('Delete');
    userEvent.click(confirmButton);

    // Wait for the user to be deleted
    await waitFor(() => expect(screen.queryByText('John')).not.toBeInTheDocument());
  });

  // ...
});
