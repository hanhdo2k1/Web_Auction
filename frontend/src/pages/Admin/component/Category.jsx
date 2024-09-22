import React, { useEffect, useState } from 'react'
import '../style/category.scss'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, categoryCode: '', categoryName: '' });
  const [deleteCategory, setDeleteCategory] = useState(null);

  //lấy danh mục
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8111/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleAddClick = () => {
    setCurrentCategory({ id: null, name: '' });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = (category) => {
    setDeleteCategory(category);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:8111/category/update`, currentCategory);
        fetchCategories();
      } catch (error) {
        console.error('Error updating category:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:8111/category/save', currentCategory);
        fetchCategories();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8111/category/delete/${deleteCategory.id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="category">
      <h2>Category</h2>
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Category Name</th>
            <th>Category Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.categoryName}</td>
              <td>{category.categoryCode}</td>
              <td>
                <Button variant="success" className="edit-btn" onClick={() => handleEditClick(category)}>
                  Edit
                </Button>
                <Button variant="danger" className="delete-btn" onClick={() => handleDeleteClick(category)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" className="add-btn" onClick={handleAddClick}>
        Add Category
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category code"
                name="categoryCode"
                value={currentCategory.categoryCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="categoryName"
                value={currentCategory.categoryName}
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
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Category