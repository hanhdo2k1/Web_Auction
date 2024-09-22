import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import '../style/category.scss';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({
    id: null,
    username: '',
    password: '',
    roleCode: '',
    email: '',
    phoneNumber: '',
    status: '',
    fullname: ''
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8111/user/admin/all');
      setAccounts(response.data.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccount({ ...currentAccount, [name]: value });
  };

  const handleInputPassWordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddClick = () => {
    setCurrentAccount({
      id: null,
      username: '',
      password: '',
      roleCode: '',
      email: '',
      phoneNumber: '',
      status: '',
      fullname: ''
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (account) => {
    setCurrentAccount(account);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = (account) => {
    setCurrentAccount(account);
    setShowDeleteModal(true);
  };

  const handleLockClick = async (account) => {
    const lockuser = account.username
    console.log(lockuser)
    try {
      await axios.patch('http://localhost:8111/user/auth/status', { username: lockuser });
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const handleSave = async () => {
    if (isEditing) {
      try {
        await axios.put('http://localhost:8111/user/admin/update', currentAccount);
        fetchAccounts();
      } catch (error) {
        console.error('Error updating account:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:8111/user/admin/add', currentAccount);
        fetchAccounts();
      } catch (error) {
        console.error('Error adding account:', error);
      }
    }
    setShowModal(false);
  };

  const handleDeleteConfirm = async (account) => {
    const userChangePasss = account;
    try {
      await axios.patch('http://localhost:8111/user/admin/resetpassword', { password: password, username: userChangePasss });
      setShowDeleteModal(false); // Close the modal after successful operation
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="category">
      <h2>Accounts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.id}>
              <td>{index + 1}</td>
              <td>{account.username}</td>
              <td>{account.fullname}</td>
              <td>{account.email}</td>
              <td>{account.roleCode}</td>
              <td>{account.phoneNumber}</td>
              <td>{account.status === 1 ? "Đang hoạt động" : "Đã khóa"}</td>
              <td>
                <Button variant="success" className="edit-btn" onClick={() => handleEditClick(account)}>
                  Sửa
                </Button>
                <Button variant="danger" style={{ width: "60px" }} className="delete-btn" onClick={() => handleLockClick(account)}>
                  {account.status === 1 ? "Khóa" : "Mở"}
                </Button>
                <Button variant="danger" className="delete-btn" onClick={() => handleDeleteClick(account)}>
                  Reset MK
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="add-btn" onClick={handleAddClick}>
        Add Account
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Account' : 'Add Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={currentAccount.username}
                onChange={handleInputChange}
                disabled={isEditing ? "disabled" : ""}
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullname"
                value={currentAccount.fullname}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>ROLE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vài trò"
                name="roleCode"
                value={currentAccount.roleCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            {isEditing ? "" : <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={currentAccount.password}
                onChange={handleInputChange}
              />
            </Form.Group>}

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={currentAccount.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={currentAccount.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                name="status"
                value={currentAccount.status}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>passwordr</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhap pass"
              name="password"
              onChange={handleInputPassWordChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleDeleteConfirm(currentAccount.username)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Account;
